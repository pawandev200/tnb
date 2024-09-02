// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getAllAgencies } from '../store/slices/agencyProfileSlice'; // Import the action

// const AllAgenciesView = () => {
//   const dispatch = useDispatch();
//   const { agencies = [], loading, error } = useSelector((state) => state.agencyProfile);

//   useEffect(() => {
//     console.log("Dispatching getAllAgencies action...");
//     dispatch(getAllAgencies());
//   }, [dispatch]);

//   useEffect(() => {
//     console.log("Agencies data:", agencies);
//     console.log("Loading state:", loading);
//     console.log("Error state:", error);
//   }, [agencies, loading, error]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>All Agencies</h1>
//       <ul>
//         {agencies.length > 0 ? (
//           agencies.map((agency) => (
//             <li key={agency.user}>
//               <h2>{agency.agencyName}</h2>
//               <Link to={`/agency/profile/view/${agency.user}`}>View Profile</Link>
//             </li>
//           ))
//         ) : (
//           <p>No agencies available</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default AllAgenciesView;


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

