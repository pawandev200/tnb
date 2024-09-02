// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   clearAllApplicationErrors,
//   resetApplicationSlice,
//   deleteApplication,
//   fetchJobSeekerApplications,
// } from "../store/slices/applicationSlice";
// import Spinner from "../components/Spinner";

// const MyApplications = () => {
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const { loading, error, applications, message } = useSelector(
//     (state) => state.applications
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchJobSeekerApplications());
//   }, []);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllApplicationErrors());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetApplicationSlice());
//       dispatch(fetchJobSeekerApplications());
//     }
//   }, [dispatch, error, message]);

//   const handleDeleteApplication = (id) => {
//     dispatch(deleteApplication(id));
//   };

//   return (
//     <>
//       {loading ? (
//         <Spinner />
//       ) : applications && applications.length <= 0 ? (
//         <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
//           You have not applied for any job.
//         </h1>
//       ) : (
//         <>
//           <div className="account_components">
//             <h3>My Application For Jobs</h3>
//             <div className="applications_container">
//               {applications.map((element) => {
//                 return (
//                   <div className="card" key={element._id}>
//                     <p className="sub-sec">
//                       <span>Job Title: </span> {element.jobInfo.jobTitle}
//                     </p>
//                     <p className="sub-sec">
//                       <span>Name</span> {element.jobSeekerInfo.name}
//                     </p>
//                     <p className="sub-sec">
//                       <span>Email</span> {element.jobSeekerInfo.email}
//                     </p>
//                     <p className="sub-sec">
//                       <span>Phone: </span> {element.jobSeekerInfo.phone}
//                     </p>
//                     <p className="sub-sec">
//                       <span>Address: </span> {element.jobSeekerInfo.address}
//                     </p>
//                     <p className="sub-sec">
//                       <span>Coverletter: </span>
//                       <textarea
//                         value={element.jobSeekerInfo.coverLetter}
//                         rows={5}
//                         disabled
//                       ></textarea>
//                     </p>
//                     <div className="btn-wrapper">
//                       <button
//                         className="outline_btn"
//                         onClick={() => handleDeleteApplication(element._id)}
//                       >
//                         Delete Application
//                       </button>
//                       <Link
//                         to={
//                           element.jobSeekerInfo &&
//                           element.jobSeekerInfo.resume.url
//                         }
//                         className="btn"
//                         target="_blank"
//                       >
//                         View Resume
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default MyApplications;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAgencies } from '../store/slices/agencyProfileSlice'; // Import the action

const AllAgenciesView = () => {
  const dispatch = useDispatch();
  const { agencies = [], loading, error } = useSelector((state) => state.agencyProfile);

  useEffect(() => {
    console.log("Dispatching getAllAgencies action...");
    dispatch(getAllAgencies());
  }, [dispatch]);

  useEffect(() => {
    console.log("Agencies data:", agencies);
    console.log("Loading state:", loading);
    console.log("Error state:", error);
  }, [agencies, loading, error]);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>All Agencies</h1>
      <ul style={styles.agencyList}>
        {agencies.length > 0 ? (
          agencies.map((agency) => (
            <li key={agency.user} style={styles.agencyItem}>
              <h2 style={styles.agencyName}>{agency.agencyName}</h2>
              <Link to={`/agency/profile/view/${agency.user}`} style={styles.viewProfileLink}>
                View Profile
              </Link>
            </li>
          ))
        ) : (
          <p style={styles.noAgenciesText}>No agencies available</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  agencyList: {
    listStyleType: 'none',
    padding: 0,
  },
  agencyItem: {
    backgroundColor: '#fff',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agencyName: {
    fontSize: '1.5rem',
    color: '#007bff',
  },
  viewProfileLink: {
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '8px 12px',
    borderRadius: '4px',
    textDecoration: 'none',
  },
  viewProfileLinkHover: {
    textDecoration: 'underline',
  },
  noAgenciesText: {
    fontSize: '1.2rem',
    color: '#666',
    textAlign: 'center',
    marginTop: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#007bff',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: 'red',
  },
};

export default AllAgenciesView;

