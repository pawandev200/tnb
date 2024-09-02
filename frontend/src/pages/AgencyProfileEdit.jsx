// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { createOrUpdateAgencyProfile, getAgencyProfile } from "../store/slices/agencyProfileSlice";

// const AgencyProfileEdit = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.user || {});
//   const { agencyProfile = {} } = useSelector((state) => state.agencyProfile || {});

//   const [formData, setFormData] = useState({
//     agencyName: agencyProfile?.agencyName || "",
//     description: agencyProfile?.description || "",
//     address: agencyProfile?.address || "",
//     agencyLogo: null, // Handle the logo as a file input
//   });

//   useEffect(() => {
//     if (user) {
//       dispatch(getAgencyProfile(user._id));
//       setFormData({...formData,user:user._id});
//     }
//   }, [dispatch, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, agencyLogo: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updatedData = new FormData();

//     for (const key in formData) {
//       if (key === "agencyLogo" && formData[key]) {
//         updatedData.append("agencyLogo", formData[key]);
//       } else {
//         updatedData.append(key, formData[key]);
//       }
//     }

//     dispatch(createOrUpdateAgencyProfile(updatedData, navigate));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Edit Agency Profile</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Form fields */}
//         <div className="mb-3">
//           <label htmlFor="agencyName" className="form-label">Agency Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="agencyName"
//             name="agencyName"
//             value={formData.agencyName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">Description</label>
//           <textarea
//             className="form-control"
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="address" className="form-label">Address</label>
//           <input
//             type="text"
//             className="form-control"
//             id="address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="agencyLogo" className="form-label">Agency Logo</label>
//           <input
//             type="file"
//             className="form-control"
//             id="agencyLogo"
//             name="agencyLogo"
//             onChange={handleFileChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">Save Changes</button>
//       </form>
//     </div>
//   );
// };

// export default AgencyProfileEdit;


// // this is all except for the image and logo

// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createOrUpdateAgencyProfile, getAgencyProfile } from '../store/slices/agencyProfileSlice';
// import './AgencyProfileEdit.css';


// const AgencyProfileEdit = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const { user } = useSelector((state) => state.user || {});
//     const { agencyProfile = {} } = useSelector((state) => state.agencyProfile || {});

//     const [formData, setFormData] = useState({
//         agencyName: agencyProfile?.agencyName || '',
//         slogan: agencyProfile?.slogan || '',
//         location: agencyProfile?.location || '',
//         agencyOverview: agencyProfile?.agencyOverview || '',
//         numberOfEmployees: agencyProfile?.numberOfEmployees || '',
//         minBudget: agencyProfile?.budgetRange?.minBudget || '',
//         maxBudget: agencyProfile?.budgetRange?.maxBudget || '',
//         servicesOffered: agencyProfile?.servicesOffered?.join(', ') || '',
//         expertise: agencyProfile?.expertise?.join(', ') || '',
//         industries: agencyProfile?.industries?.join(', ') || '',
//         pastClients: agencyProfile?.pastClients?.join(', ') || '',
//         yearFounded: agencyProfile?.yearFounded || '',
//         awards: agencyProfile?.awards || [],
//         portfolio: agencyProfile?.portfolio || [],
//     });

//     useEffect(() => {
//         if (user) {
//             dispatch(getAgencyProfile(user._id));
//             setFormData((prevData) => ({...prevData, user: user._id,}));
//         }
//     }, [dispatch, user]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleAwardChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedAwards = formData.awards.map((award, i) =>
//             i === index ? { ...award, [name]: value } : award
//         );
//         setFormData({ ...formData, awards: updatedAwards });
//     };

//     const handlePortfolioChange = (index, e) => {
//         const { name, value } = e.target;
//         const updatedPortfolio = formData.portfolio.map((item, i) =>
//             i === index ? { ...item, [name]: value } : item
//         );
//         setFormData({ ...formData, portfolio: updatedPortfolio });
//     };

//     const addAward = () => {
//         setFormData({ ...formData, awards: [...formData.awards, { awardName: '', link: '' }] });
//     };

//     const addPortfolioItem = () => {
//         setFormData({
//             ...formData,
//             portfolio: [...formData.portfolio, { challenge: '', plan: '', result: '', link: '' }],
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const formattedData = {
//             ...formData,
//             servicesOffered: formData.servicesOffered.split(',').map((service) => service.trim()),
//             expertise: formData.expertise.split(',').map((item) => item.trim()),
//             industries: formData.industries.split(',').map((industry) => industry.trim()),
//             pastClients: formData.pastClients.split(',').map((client) => client.trim()),
//         };

//         dispatch(createOrUpdateAgencyProfile(formattedData, navigate));
//     };

//     return (
//         <div className="container mt-4">
//             <h2>Edit Agency Profile</h2>
//             <form onSubmit={handleSubmit}>
//                 {/* Agency Name */}
//                 <div className="mb-3">
//                     <label htmlFor="agencyName" className="form-label">Agency Name</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="agencyName"
//                         name="agencyName"
//                         value={formData.agencyName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Slogan */}
//                 <div className="mb-3">
//                     <label htmlFor="slogan" className="form-label">Slogan</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="slogan"
//                         name="slogan"
//                         value={formData.slogan}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Location */}
//                 <div className="mb-3">
//                     <label htmlFor="location" className="form-label">Location</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="location"
//                         name="location"
//                         value={formData.location}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Agency Overview */}
//                 <div className="mb-3">
//                     <label htmlFor="agencyOverview" className="form-label">Agency Overview</label>
//                     <textarea
//                         className="form-control"
//                         id="agencyOverview"
//                         name="agencyOverview"
//                         value={formData.agencyOverview}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>

//                 {/* Number of Employees */}
//                 <div className="mb-3">
//                     <label htmlFor="numberOfEmployees" className="form-label">Number of Employees</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="numberOfEmployees"
//                         name="numberOfEmployees"
//                         value={formData.numberOfEmployees}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Budget Range */}
//                 <div className="mb-3">
//                     <label htmlFor="minBudget" className="form-label">Minimum Budget</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="minBudget"
//                         name="minBudget"
//                         value={formData.minBudget}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="maxBudget" className="form-label">Maximum Budget</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="maxBudget"
//                         name="maxBudget"
//                         value={formData.maxBudget}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Services Offered */}
//                 <div className="mb-3">
//                     <label htmlFor="servicesOffered" className="form-label">Services Offered</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="servicesOffered"
//                         name="servicesOffered"
//                         value={formData.servicesOffered}
//                         onChange={handleChange}
//                         required
//                     />
//                     <small className="form-text text-muted">Separate services with commas.</small>
//                 </div>

//                 {/* Expertise */}
//                 <div className="mb-3">
//                     <label htmlFor="expertise" className="form-label">Expertise</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="expertise"
//                         name="expertise"
//                         value={formData.expertise}
//                         onChange={handleChange}
//                         required
//                     />
//                     <small className="form-text text-muted">Separate expertise areas with commas.</small>
//                 </div>

//                 {/* Industries */}
//                 <div className="mb-3">
//                     <label htmlFor="industries" className="form-label">Industries</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="industries"
//                         name="industries"
//                         value={formData.industries}
//                         onChange={handleChange}
//                         required
//                     />
//                     <small className="form-text text-muted">Separate industries with commas.</small>
//                 </div>

//                 {/* Past Clients */}
//                 <div className="mb-3">
//                     <label htmlFor="pastClients" className="form-label">Past Clients</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="pastClients"
//                         name="pastClients"
//                         value={formData.pastClients}
//                         onChange={handleChange}
//                         required
//                     />
//                     <small className="form-text text-muted">Separate past clients with commas.</small>
//                 </div>

//                 {/* Year Founded */}
//                 <div className="mb-3">
//                     <label htmlFor="yearFounded" className="form-label">Year Founded</label>
//                     <input
//                         type="number"
//                         className="form-control"
//                         id="yearFounded"
//                         name="yearFounded"
//                         value={formData.yearFounded}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 {/* Awards Section */}
//                 <div className="mb-3">
//                     <h4>Awards</h4>
//                     {formData.awards.map((award, index) => (
//                         <div key={index} className="award-item">
//                             <div className="mb-2">
//                                 <label htmlFor={`awardName-${index}`} className="form-label">Award Name</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     id={`awardName-${index}`}
//                                     name="awardName"
//                                     value={award.awardName}
//                                     onChange={(e) => handleAwardChange(index, e)}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor={`awardLink-${index}`} className="form-label">Award Link</label>
//                                 <input
//                                     type="url"
//                                     className="form-control"
//                                     id={`awardLink-${index}`}
//                                     name="link"
//                                     value={award.link}
//                                     onChange={(e) => handleAwardChange(index, e)}
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <button type="button" className="btn btn-primary" onClick={addAward}>Add Award</button>
//                 </div>

//                 {/* Portfolio Section */}
//                 <div className="mb-3">
//                     <h4>Portfolio</h4>
//                     {formData.portfolio.map((item, index) => (
//                         <div key={index} className="portfolio-item">
//                             <div className="mb-2">
//                                 <label htmlFor={`challenge-${index}`} className="form-label">Challenge</label>
//                                 <textarea
//                                     className="form-control"
//                                     id={`challenge-${index}`}
//                                     name="challenge"
//                                     value={item.challenge}
//                                     onChange={(e) => handlePortfolioChange(index, e)}
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor={`plan-${index}`} className="form-label">Plan</label>
//                                 <textarea
//                                     className="form-control"
//                                     id={`plan-${index}`}
//                                     name="plan"
//                                     value={item.plan}
//                                     onChange={(e) => handlePortfolioChange(index, e)}
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor={`result-${index}`} className="form-label">Result</label>
//                                 <textarea
//                                     className="form-control"
//                                     id={`result-${index}`}
//                                     name="result"
//                                     value={item.result}
//                                     onChange={(e) => handlePortfolioChange(index, e)}
//                                     required
//                                 ></textarea>
//                             </div>
//                             <div className="mb-2">
//                                 <label htmlFor={`portfolioLink-${index}`} className="form-label">Link</label>
//                                 <input
//                                     type="url"
//                                     className="form-control"
//                                     id={`portfolioLink-${index}`}
//                                     name="link"
//                                     value={item.link}
//                                     onChange={(e) => handlePortfolioChange(index, e)}
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <button type="button" className="btn btn-primary" onClick={addPortfolioItem}>Add Portfolio Item</button>
//                 </div>

//                 <button type="submit" className="btn btn-success">Save Changes</button>
//             </form>
//         </div>
//     );
// };

// export default AgencyProfileEdit;

// this is all except for the image and logo and the css 
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrUpdateAgencyProfile, getAgencyProfile } from '../store/slices/agencyProfileSlice';
import styles from './AgencyProfileEdit.module.css'; // Import the CSS module

const AgencyProfileEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.user || {});
    const { agencyProfile = {} } = useSelector((state) => state.agencyProfile || {});

    const [formData, setFormData] = useState({
        agencyName: agencyProfile?.agencyName || '',
        slogan: agencyProfile?.slogan || '',
        location: agencyProfile?.location || '',
        agencyOverview: agencyProfile?.agencyOverview || '',
        numberOfEmployees: agencyProfile?.numberOfEmployees || '',
        minBudget: agencyProfile?.budgetRange?.minBudget || '',
        maxBudget: agencyProfile?.budgetRange?.maxBudget || '',
        servicesOffered: agencyProfile?.servicesOffered?.join(', ') || '',
        expertise: agencyProfile?.expertise?.join(', ') || '',
        industries: agencyProfile?.industries?.join(', ') || '',
        pastClients: agencyProfile?.pastClients?.join(', ') || '',
        yearFounded: agencyProfile?.yearFounded || '',
        awards: agencyProfile?.awards || [],
        portfolio: agencyProfile?.portfolio || [],
    });

    useEffect(() => {
        if (user) {
            dispatch(getAgencyProfile(user._id));
            setFormData((prevData) => ({...prevData, user: user._id,}));
        }
    }, [dispatch, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAwardChange = (index, e) => {
        const { name, value } = e.target;
        const updatedAwards = formData.awards.map((award, i) =>
            i === index ? { ...award, [name]: value } : award
        );
        setFormData({ ...formData, awards: updatedAwards });
    };

    const handlePortfolioChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPortfolio = formData.portfolio.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setFormData({ ...formData, portfolio: updatedPortfolio });
    };

    const addAward = () => {
        setFormData({ ...formData, awards: [...formData.awards, { awardName: '', link: '' }] });
    };

    const addPortfolioItem = () => {
        setFormData({
            ...formData,
            portfolio: [...formData.portfolio, { challenge: '', plan: '', result: '', link: '' }],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            servicesOffered: formData.servicesOffered.split(',').map((service) => service.trim()),
            expertise: formData.expertise.split(',').map((item) => item.trim()),
            industries: formData.industries.split(',').map((industry) => industry.trim()),
            pastClients: formData.pastClients.split(',').map((client) => client.trim()),
        };

        dispatch(createOrUpdateAgencyProfile(formattedData, navigate))
        .then(() => {
            toast.success('Agency profile updated successfully!', {
                autoClose: 3000, // 3 seconds
            });
        })
        .catch((error) => {
            toast.error('Failed to save changes. Please try again.', {
                autoClose: 3000, // 3 seconds
            });
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Edit Agency Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Agency Name */}
                <div className={styles.mb3}>
                    <label htmlFor="agencyName" className={styles.formLabel}>Agency Name</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="agencyName"
                        name="agencyName"
                        value={formData.agencyName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Slogan */}
                <div className={styles.mb3}>
                    <label htmlFor="slogan" className={styles.formLabel}>Slogan</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="slogan"
                        name="slogan"
                        value={formData.slogan}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Location */}
                <div className={styles.mb3}>
                    <label htmlFor="location" className={styles.formLabel}>Location</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Overview */}
                <div className={styles.mb3}>
                    <label htmlFor="agencyOverview" className={styles.formLabel}>Overview</label>
                    <textarea
                        className={styles.formControl}
                        id="agencyOverview"
                        name="agencyOverview"
                        value={formData.agencyOverview}
                        onChange={handleChange}
                        rows="4"
                        required
                    />
                </div>

                {/* Number of Employees */}
                <div className={styles.mb3}>
                    <label htmlFor="numberOfEmployees" className={styles.formLabel}>Number of Employees</label>
                    <input
                        type="number"
                        className={styles.formControl}
                        id="numberOfEmployees"
                        name="numberOfEmployees"
                        value={formData.numberOfEmployees}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Budget Range */}
                <div className={styles.mb3}>
                    <label className={styles.formLabel}>Budget Range</label>
                    <div>
                        <label htmlFor="minBudget" className={styles.formText}>Min Budget</label>
                        <input
                            type="number"
                            className={styles.formControl}
                            id="minBudget"
                            name="minBudget"
                            value={formData.minBudget}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="maxBudget" className={styles.formText}>Max Budget</label>
                        <input
                            type="number"
                            className={styles.formControl}
                            id="maxBudget"
                            name="maxBudget"
                            value={formData.maxBudget}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                {/* Services Offered */}
                <div className={styles.mb3}>
                    <label htmlFor="servicesOffered" className={styles.formLabel}>Services Offered</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="servicesOffered"
                        name="servicesOffered"
                        value={formData.servicesOffered}
                        onChange={handleChange}
                        required
                    />
                    <p className={styles.formText}>Comma-separated list of services.</p>
                </div>

                {/* Expertise */}
                <div className={styles.mb3}>
                    <label htmlFor="expertise" className={styles.formLabel}>Expertise</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="expertise"
                        name="expertise"
                        value={formData.expertise}
                        onChange={handleChange}
                        required
                    />
                    <p className={styles.formText}>Comma-separated list of expertise areas.</p>
                </div>

                {/* Industries */}
                <div className={styles.mb3}>
                    <label htmlFor="industries" className={styles.formLabel}>Industries</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="industries"
                        name="industries"
                        value={formData.industries}
                        onChange={handleChange}
                        required
                    />
                    <p className={styles.formText}>Comma-separated list of industries.</p>
                </div>

                {/* Past Clients */}
                <div className={styles.mb3}>
                    <label htmlFor="pastClients" className={styles.formLabel}>Past Clients</label>
                    <input
                        type="text"
                        className={styles.formControl}
                        id="pastClients"
                        name="pastClients"
                        value={formData.pastClients}
                        onChange={handleChange}
                        required
                    />
                    <p className={styles.formText}>Comma-separated list of past clients.</p>
                </div>

                {/* Year Founded */}
                <div className={styles.mb3}>
                    <label htmlFor="yearFounded" className={styles.formLabel}>Year Founded</label>
                    <input
                        type="number"
                        className={styles.formControl}
                        id="yearFounded"
                        name="yearFounded"
                        value={formData.yearFounded}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Awards */}
                <div className={styles.mb3}>
                    <label className={styles.formLabel}>Awards</label>
                    {formData.awards.map((award, index) => (
                        <div key={index} className={styles.awardItem}>
                            <label htmlFor={`awardName_${index}`} className={styles.formLabel}>Award Name</label>
                            <input
                                type="text"
                                id={`awardName_${index}`}
                                name="awardName"
                                className={styles.formControl}
                                value={award.awardName}
                                onChange={(e) => handleAwardChange(index, e)}
                                required
                            />
                            <label htmlFor={`awardLink_${index}`} className={styles.formLabel}>Link</label>
                            <input
                                type="url"
                                id={`awardLink_${index}`}
                                name="link"
                                className={styles.formControl}
                                value={award.link}
                                onChange={(e) => handleAwardChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className={styles.btnPrimary} onClick={addAward}>Add Award</button>
                </div>

                {/* Portfolio */}
                <div className={styles.mb3}>
                    <label className={styles.formLabel}>Portfolio</label>
                    {formData.portfolio.map((item, index) => (
                        <div key={index} className={styles.portfolioItem}>
                            <label htmlFor={`challenge_${index}`} className={styles.formLabel}>Challenge</label>
                            <textarea
                                id={`challenge_${index}`}
                                name="challenge"
                                className={styles.formControl}
                                value={item.challenge}
                                onChange={(e) => handlePortfolioChange(index, e)}
                                rows="3"
                                required
                            />
                            <label htmlFor={`plan_${index}`} className={styles.formLabel}>Plan</label>
                            <textarea
                                id={`plan_${index}`}
                                name="plan"
                                className={styles.formControl}
                                value={item.plan}
                                onChange={(e) => handlePortfolioChange(index, e)}
                                rows="3"
                                required
                            />
                            <label htmlFor={`result_${index}`} className={styles.formLabel}>Result</label>
                            <textarea
                                id={`result_${index}`}
                                name="result"
                                className={styles.formControl}
                                value={item.result}
                                onChange={(e) => handlePortfolioChange(index, e)}
                                rows="3"
                                required
                            />
                            <label htmlFor={`portfolioLink_${index}`} className={styles.formLabel}>Link</label>
                            <input
                                type="url"
                                id={`portfolioLink_${index}`}
                                name="link"
                                className={styles.formControl}
                                value={item.link}
                                onChange={(e) => handlePortfolioChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" className={styles.btnPrimary} onClick={addPortfolioItem}>Add Portfolio Item</button>
                </div>

                {/* Save Changes Button */}
                <div className={styles.saveChangesBtnContainer}>
                    <button type="submit" className={styles.saveChangesBtn}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AgencyProfileEdit;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { createOrUpdateAgencyProfile, getAgencyProfile } from '../store/slices/agencyProfileSlice';

// const AgencyProfileEdit = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user } = useSelector((state) => state.user || {});
//   const { agencyProfile = {} } = useSelector((state) => state.agencyProfile || {});

//   const [formData, setFormData] = useState({
//     agencyName: agencyProfile?.agencyName || '',
//     slogan: agencyProfile?.slogan || '',
//     location: agencyProfile?.location || '',
//     agencyOverview: agencyProfile?.agencyOverview || '',
//     numberOfEmployees: agencyProfile?.numberOfEmployees || '',
//     minBudget: agencyProfile?.budgetRange?.minBudget || '',
//     maxBudget: agencyProfile?.budgetRange?.maxBudget || '',
//     servicesOffered: agencyProfile?.servicesOffered?.join(', ') || '',
//     expertise: agencyProfile?.expertise?.join(', ') || '',
//     industries: agencyProfile?.industries?.join(', ') || '',
//     pastClients: agencyProfile?.pastClients?.join(', ') || '',
//     yearFounded: agencyProfile?.yearFounded || '',
//     awards: agencyProfile?.awards || [],
//     portfolio: agencyProfile?.portfolio || [],
//     logoFile: null,
//     imageFiles: [],
//   });

//   useEffect(() => {
//     if (user) {
//       dispatch(getAgencyProfile(user._id));
//       setFormData((prevData) => ({ ...prevData, user: user._id }));
//     }
//   }, [dispatch, user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Convert numeric fields to numbers
//     const newValue = (name === 'minBudget' || name === 'maxBudget') ? Number(value) : value;

//     setFormData({ ...formData, [name]: newValue });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === 'logoFile') {
//       setFormData({ ...formData, logoFile: files[0] });
//     } else if (name === 'imageFiles') {
//       setFormData({ ...formData, imageFiles: Array.from(files) });
//     }
//   };

//   const handleAwardChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedAwards = formData.awards.map((award, i) =>
//       i === index ? { ...award, [name]: value } : award
//     );
//     setFormData({ ...formData, awards: updatedAwards });
//   };

//   const handlePortfolioChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedPortfolio = formData.portfolio.map((item, i) =>
//       i === index ? { ...item, [name]: value } : item
//     );
//     setFormData({ ...formData, portfolio: updatedPortfolio });
//   };

//   const addAward = () => {
//     setFormData({ ...formData, awards: [...formData.awards, { awardName: '', link: '' }] });
//   };

//   const addPortfolioItem = () => {
//     setFormData({
//       ...formData,
//       portfolio: [...formData.portfolio, { challenge: '', plan: '', result: '', link: '' }],
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Ensure numeric fields are valid
//     if (isNaN(formData.minBudget) || isNaN(formData.maxBudget)) {
//       console.error('Budget values must be valid numbers');
//       return;
//     }

//     const formattedData = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === 'logoFile') {
//         if (formData[key]) formattedData.append('logo', formData[key]);
//       } else if (key === 'imageFiles') {
//         formData[key].forEach((file, index) => {
//           formattedData.append(`portfolioImages[${index}]`, file);
//         });
//       } else {
//         formattedData.append(key, String(formData[key]));
//       }
//     });

//     dispatch(createOrUpdateAgencyProfile(formattedData, navigate));
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Edit Agency Profile</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Agency Name */}
//         <div className="mb-3">
//           <label htmlFor="agencyName" className="form-label">Agency Name</label>
//           <input
//             type="text"
//             className="form-control"
//             id="agencyName"
//             name="agencyName"
//             value={formData.agencyName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Slogan */}
//         <div className="mb-3">
//           <label htmlFor="slogan" className="form-label">Slogan</label>
//           <input
//             type="text"
//             className="form-control"
//             id="slogan"
//             name="slogan"
//             value={formData.slogan}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Location */}
//         <div className="mb-3">
//           <label htmlFor="location" className="form-label">Location</label>
//           <input
//             type="text"
//             className="form-control"
//             id="location"
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Agency Overview */}
//         <div className="mb-3">
//           <label htmlFor="agencyOverview" className="form-label">Agency Overview</label>
//           <textarea
//             className="form-control"
//             id="agencyOverview"
//             name="agencyOverview"
//             value={formData.agencyOverview}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>

//         {/* Number of Employees */}
//         <div className="mb-3">
//           <label htmlFor="numberOfEmployees" className="form-label">Number of Employees</label>
//           <input
//             type="number"
//             className="form-control"
//             id="numberOfEmployees"
//             name="numberOfEmployees"
//             value={formData.numberOfEmployees}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Budget Range */}
//         <div className="mb-3">
//           <label htmlFor="minBudget" className="form-label">Minimum Budget</label>
//           <input
//             type="number"
//             className="form-control"
//             id="minBudget"
//             name="minBudget"
//             value={formData.minBudget}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="maxBudget" className="form-label">Maximum Budget</label>
//           <input
//             type="number"
//             className="form-control"
//             id="maxBudget"
//             name="maxBudget"
//             value={formData.maxBudget}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Services Offered */}
//         <div className="mb-3">
//           <label htmlFor="servicesOffered" className="form-label">Services Offered</label>
//           <input
//             type="text"
//             className="form-control"
//             id="servicesOffered"
//             name="servicesOffered"
//             value={formData.servicesOffered}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Expertise */}
//         <div className="mb-3">
//           <label htmlFor="expertise" className="form-label">Expertise</label>
//           <input
//             type="text"
//             className="form-control"
//             id="expertise"
//             name="expertise"
//             value={formData.expertise}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Industries */}
//         <div className="mb-3">
//           <label htmlFor="industries" className="form-label">Industries</label>
//           <input
//             type="text"
//             className="form-control"
//             id="industries"
//             name="industries"
//             value={formData.industries}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Past Clients */}
//         <div className="mb-3">
//           <label htmlFor="pastClients" className="form-label">Past Clients</label>
//           <input
//             type="text"
//             className="form-control"
//             id="pastClients"
//             name="pastClients"
//             value={formData.pastClients}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Year Founded */}
//         <div className="mb-3">
//           <label htmlFor="yearFounded" className="form-label">Year Founded</label>
//           <input
//             type="number"
//             className="form-control"
//             id="yearFounded"
//             name="yearFounded"
//             value={formData.yearFounded}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Awards */}
//         <div className="mb-3">
//           <label className="form-label">Awards</label>
//           {formData.awards.map((award, index) => (
//             <div key={index} className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Award Name"
//                 name="awardName"
//                 value={award.awardName}
//                 onChange={(e) => handleAwardChange(index, e)}
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Link"
//                 name="link"
//                 value={award.link}
//                 onChange={(e) => handleAwardChange(index, e)}
//               />
//             </div>
//           ))}
//           <button type="button" className="btn btn-secondary" onClick={addAward}>
//             Add Award
//           </button>
//         </div>

//         {/* Portfolio */}
//         <div className="mb-3">
//           <label className="form-label">Portfolio</label>
//           {formData.portfolio.map((item, index) => (
//             <div key={index} className="mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Challenge"
//                 name="challenge"
//                 value={item.challenge}
//                 onChange={(e) => handlePortfolioChange(index, e)}
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Plan"
//                 name="plan"
//                 value={item.plan}
//                 onChange={(e) => handlePortfolioChange(index, e)}
//               />
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Result"
//                 name="result"
//                 value={item.result}
//                 onChange={(e) => handlePortfolioChange(index, e)}
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Link"
//                 name="link"
//                 value={item.link}
//                 onChange={(e) => handlePortfolioChange(index, e)}
//               />
//             </div>
//           ))}
//           <button type="button" className="btn btn-secondary" onClick={addPortfolioItem}>
//             Add Portfolio Item
//           </button>
//         </div>

//         {/* Logo Upload */}
//         <div className="mb-3">
//           <label htmlFor="logoFile" className="form-label">Logo</label>
//           <input
//             type="file"
//             className="form-control"
//             id="logoFile"
//             name="logoFile"
//             onChange={handleFileChange}
//           />
//         </div>

//         {/* Portfolio Images Upload */}
//         <div className="mb-3">
//           <label htmlFor="imageFiles" className="form-label">Portfolio Images</label>
//           <input
//             type="file"
//             className="form-control"
//             id="imageFiles"
//             name="imageFiles"
//             multiple
//             onChange={handleFileChange}
//           />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AgencyProfileEdit;



