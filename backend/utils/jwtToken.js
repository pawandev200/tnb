export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7; // Default to 7 days if not set

  const options = {
    expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure cookies are secure in production
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
