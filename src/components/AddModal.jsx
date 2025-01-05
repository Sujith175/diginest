import React, { useContext, useState } from "react";
import { MediaContext } from "../Context/MediaContext";

const AddModal = ({ handleModalToggle }) => {
  const { dispatch } = useContext(MediaContext);
  const [formData, setFormData] = useState({
    title: "",
    subheading: "",
    mediatype: "",
    link: "",
    section: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.subheading.trim()) {
      newErrors.subheading = "Subheading is required.";
    }
    if (!formData.mediatype) {
      newErrors.mediatype = "Please select a media type.";
    }
    if (formData.mediatype === "Video" && !/^https?:\/\//.test(formData.link)) {
      newErrors.link =
        "Please enter a valid video URL starting with http/https.";
    }
    if (formData.mediatype === "Image" && !formData.link) {
      newErrors.link = "Please upload an image.";
    }
    if (!formData.section) {
      newErrors.section = "Please select a section.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          link: file.name,
        });
        setImagePreview(URL.createObjectURL(file)); // Set image preview
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const { title, subheading, mediatype, link, section } = formData;
    dispatch({
      type: "ADD_ITEM",
      media: { title, subheading, mediatype, link, section },
    });

    setFormData({
      title: "",
      subheading: "",
      mediatype: "",
      link: "",
      section: "",
    });

    setImagePreview(null); // Clear preview
    setErrors({});
    setIsSubmitting(false);
    handleModalToggle();
  };

  return (
    <div className="modal-overlay" onClick={handleModalToggle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleModalToggle}>
          &times;
        </button>
        <h2>Add Media</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label>Sub Heading</label>
            <input
              type="text"
              placeholder="Enter subheading"
              name="subheading"
              value={formData.subheading}
              onChange={handleChange}
            />
            {errors.subheading && (
              <span className="error">{errors.subheading}</span>
            )}
          </div>
          <div className="form-group">
            <label>Media Type</label>
            <select
              name="mediatype"
              value={formData.mediatype}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select media type
              </option>
              <option>Image</option>
              <option>Video</option>
            </select>
            {errors.mediatype && (
              <span className="error">{errors.mediatype}</span>
            )}
          </div>

          {formData.mediatype === "Image" && (
            <div className="form-group">
              <label>Image</label>
              <input type="file" name="link" onChange={handleChange} />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
              {errors.link && <span className="error">{errors.link}</span>}
            </div>
          )}
          {formData.mediatype === "Video" && (
            <div className="form-group">
              <label>Video URL</label>
              <input
                type="text"
                placeholder="Enter video URL"
                name="link"
                value={formData.link}
                onChange={handleChange}
              />
              {errors.link && <span className="error">{errors.link}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Section</label>
            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Section
              </option>
              <option>Gallery</option>
              <option>News</option>
            </select>
            {errors.section && <span className="error">{errors.section}</span>}
          </div>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || Object.keys(errors).length > 0}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
