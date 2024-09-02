from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Initialize the browser driver
driver = webdriver.Chrome()

# Log in to LinkedIn
driver.get('https://www.linkedin.com/login')

# Replace with your actual credentials
driver.find_element(By.ID, 'username').send_keys('your_email')
driver.find_element(By.ID, 'password').send_keys('your_password')
driver.find_element(By.XPATH, '//button[text()="Sign in"]').click()

# Wait for the login to complete
time.sleep(3)  # Adjust sleep time based on your internet speed

# Navigate to the LinkedIn profile (Replace the URL with the profile you want to scrape)
profile_url = 'https://www.linkedin.com/in/kislay-rai/'
driver.get(profile_url)

# Wait for the profile page to load
time.sleep(3)

# Click on the "Contact info" button to open the contact information modal
contact_info_button = driver.find_element(By.XPATH, '//a[@data-control-name="contact_see_more"]')
contact_info_button.click()

# Wait for the contact info modal to load
time.sleep(2)

# Attempt to extract the email address from the contact info modal
try:
    email = driver.find_element(By.XPATH, '//section[contains(@class, "ci-email")]//a').text
    print(f'Email: {email}')
except Exception as e:
    print('Email not found or not available on this profile')

# Close the browser
driver.quit()
