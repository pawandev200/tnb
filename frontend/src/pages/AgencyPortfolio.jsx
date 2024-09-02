import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../store/slices/portfolioSlice";
import { toast } from "react-toastify";
import "./AgencyPortfolio.css"; 

const AgencyPortfolio = () => {
  const { portfolios } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    projectLink: "",
    projectDate: "",
    skills: "",
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getPortfolio());
  }, [dispatch]);

  // AgencyPortfolio.js

  const handleCreatePortfolio = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("projectTitle", formData.projectTitle);
    formDataToSend.append("projectDescription", formData.projectDescription);
    formDataToSend.append("projectLink", formData.projectLink);
    formDataToSend.append("projectDate", formData.projectDate);
    formDataToSend.append("skills", formData.skills);

    images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
    });

    console.log("Form Data:", formDataToSend);

    for (let pair of formDataToSend.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    dispatch(createPortfolio(formDataToSend))
        .then((response) => {
            console.log("Portfolio creation response:", response);
        })
        .catch((error) => {
            console.error("Error creating portfolio:", error);
        });

    resetForm();
    setShowCreateModal(false);
};



  const handleUpdatePortfolio = (portfolioId) => {
    const formDataToSend = new FormData();
    formDataToSend.append("projectTitle", formData.projectTitle);
    formDataToSend.append("projectDescription", formData.projectDescription);
    formDataToSend.append("projectLink", formData.projectLink);
    formDataToSend.append("projectDate", formData.projectDate);
    formDataToSend.append("skills", formData.skills);

    images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    dispatch(updatePortfolio({ id: portfolioId, data: formDataToSend }));
    toast.success("Portfolio updated successfully.");
    resetForm();
    setEditingPortfolio(null);
  };

  const handleDeletePortfolio = (portfolioId) => {
    dispatch(deletePortfolio(portfolioId));
    toast.success("Portfolio deleted successfully.");
  };

  const resetForm = () => {
    setFormData({
      projectTitle: "",
      projectDescription: "",
      projectLink: "",
      projectDate: "",
      skills: "",
    });
    setImages([]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const openEditModal = (portfolio) => {
    setEditingPortfolio(portfolio);
    setFormData({
      projectTitle: portfolio.projectTitle,
      projectDescription: portfolio.projectDescription,
      projectLink: portfolio.projectLink || "",
      projectDate: portfolio.projectDate.split("T")[0],
      skills: portfolio.skills.join(", "),
    });
  };

  return (
    <div className="portfolio_section">
      <h3>Agency Portfolio</h3>
      <button onClick={() => setShowCreateModal(true)}>Add New Project</button>

      {showCreateModal && (
        <div className="modal">
          <button onClick={() => setShowCreateModal(false)}>Close</button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreatePortfolio();
            }}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={formData.projectTitle}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="projectDescription"
              placeholder="Project Description"
              value={formData.projectDescription}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="url"
              name="projectLink"
              placeholder="Project Link"
              value={formData.projectLink}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              required
            />
            <button type="submit">Create Portfolio</button>
          </form>
        </div>
      )}

      {editingPortfolio && (
        <div className="modal">
          <button onClick={() => setEditingPortfolio(null)}>Close</button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdatePortfolio(editingPortfolio._id);
            }}
            encType="multipart/form-data"
          >
            <input
              type="text"
              name="projectTitle"
              placeholder="Project Title"
              value={formData.projectTitle}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="projectDescription"
              placeholder="Project Description"
              value={formData.projectDescription}
              onChange={handleInputChange}
              required
            ></textarea>
            <input
              type="url"
              name="projectLink"
              placeholder="Project Link"
              value={formData.projectLink}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="skills"
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={handleInputChange}
              required
            />
            <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
            />
            <button type="submit">Update Portfolio</button>
          </form>
        </div>
      )}

      <div className="portfolio_list">
        {portfolios && portfolios.length > 0 ? (
          portfolios.map((portfolio) => (
            <div key={portfolio._id} className="portfolio_item">
              <h4>{portfolio.projectTitle}</h4>
              <p>{portfolio.projectDescription}</p>
              <p>{portfolio.skills.join(", ")}</p>
              {portfolio.projectLink && (
                <a
                  href={portfolio.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
              <button onClick={() => openEditModal(portfolio)}>Edit</button>
              <button onClick={() => handleDeletePortfolio(portfolio._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No portfolio found.</p>
        )}
      </div>
    </div>
  );
};

export default AgencyPortfolio;
