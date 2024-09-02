// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAgencyProfile } from '../store/slices/agencyProfileSlice';
// import { useParams } from 'react-router-dom';

// const AgencyProfileView = () => {
//   const { userId } = useParams(); // Get user ID from URL params
//   const dispatch = useDispatch();
//   const { agencyProfile, loading, error } = useSelector((state) => state.agencyProfile);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getAgencyProfile(userId)); // Fetch the agency profile by user ID
//     }
//   }, [dispatch, userId]);

//   console.log('userId:', userId); // Debugging to ensure userId is defined

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!agencyProfile) {
//     return <div>No Profile Found</div>;
//   }

//   return (
//     <div>
//       <h1>AgencyName: {agencyProfile.agencyName}</h1>
//       <p>Description: {agencyProfile.description}</p>
//       <p>Address: {agencyProfile.address}</p>
//       {/* Render other profile details here */}
//     </div>
//   );
// };

// export default AgencyProfileView;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAgencyProfile } from '../store/slices/agencyProfileSlice';
import { useParams } from 'react-router-dom';
import './AgencyProfileView.css';

const AgencyProfileView = () => {
  const { userId } = useParams(); // Get user ID from URL params
  const dispatch = useDispatch();
  const { agencyProfile, loading, error } = useSelector((state) => state.agencyProfile);

  useEffect(() => {
    if (userId) {
      dispatch(getAgencyProfile(userId)); // Fetch the agency profile by user ID
    }
  }, [dispatch, userId]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!agencyProfile) {
    return <div className="no-profile">No Profile Found</div>;
  }

  return (
    <div className="agency-profile-container">
      <div className="header">
        <h1 className="agency-name">{agencyProfile.agencyName}</h1>
        <p className="slogan">{agencyProfile.slogan}</p>
      </div>

      <div className="overview-section">
        <h2>Overview</h2>
        <p>{agencyProfile.agencyOverview}</p>
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <h3>Location</h3>
          <p>{agencyProfile.location}</p>
        </div>
        <div className="detail-item">
          <h3>Employees</h3>
          <p>{agencyProfile.numberOfEmployees}</p>
        </div>
        <div className="detail-item">
          <h3>Year Founded</h3>
          <p>{agencyProfile.yearFounded}</p>
        </div>
        <div className="detail-item">
          <h3>Budget Range</h3>
          <p>${agencyProfile.budgetRange.minBudget} - ${agencyProfile.budgetRange.maxBudget}</p>
        </div>
      </div>

      <div className="section">
        <h2>Services Offered</h2>
        <ul className="services-list">
          {agencyProfile.servicesOffered.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Expertise</h2>
        <ul className="expertise-list">
          {agencyProfile.expertise.map((expertise, index) => (
            <li key={index}>{expertise}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Industries Served</h2>
        <ul className="industries-list">
          {agencyProfile.industries.map((industry, index) => (
            <li key={index}>{industry}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Past Clients</h2>
        <ul className="clients-list">
          {agencyProfile.pastClients.map((client, index) => (
            <li key={index}>{client}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Awards</h2>
        <ul className="awards-list">
          {agencyProfile.awards.map((award, index) => (
            <li key={index}>
              {award.awardName} - <a href={award.link} target="_blank" rel="noopener noreferrer">View</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Portfolio</h2>
        <ul className="portfolio-list">
          {agencyProfile.portfolio.map((item, index) => (
            <li key={index}>
              <strong>Challenge:</strong> {item.challenge}<br />
              <strong>Plan:</strong> {item.plan}<br />
              <strong>Result:</strong> {item.result}<br />
              {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer">View</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgencyProfileView;
