import React, { useContext, useState } from "react";
import { MediaContext } from "../Context/MediaContext";

const EditModal = ({ handleEditModalToggle, selectedItem }) => {
  const { dispatch } = useContext(MediaContext);

  const [formData, setFormData] = useState({
    id: selectedItem.id,
    title: selectedItem.title || "",
    subheading: selectedItem.subheading || "",
    mediatype: selectedItem.mediatype || "",
    link: selectedItem.link || "",
    section: selectedItem.section || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.subheading.trim()) {
      newErrors.subheading = "Subheading is required.";
    }

    if (!formData.mediatype) {
      newErrors.mediatype = "Media type is required.";
    }

    if (formData.mediatype === "Video" && !isValidURL(formData.link)) {
      newErrors.link = "Please provide a valid video URL.";
    }

    if (formData.mediatype === "Image" && !formData.link) {
      newErrors.link = "Please upload an image file.";
    }

    if (!formData.section) {
      newErrors.section = "Section is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0].name });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(formData);

    const { id, title, subheading, mediatype, link, section } = formData;

    dispatch({
      type: "EDIT_MEDIA",
      media: { id, title, subheading, mediatype, link, section },
    });

    handleEditModalToggle();
  };

  return (
    <div className="modal-overlay" onClick={handleEditModalToggle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleEditModalToggle}>
          &times;
        </button>
        <h2>Edit Media</h2>
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
            {errors.title && <p className="error">{errors.title}</p>}
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
            {errors.subheading && <p className="error">{errors.subheading}</p>}
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
            {errors.mediatype && <p className="error">{errors.mediatype}</p>}
          </div>
          {formData.mediatype === "Image" && (
            <div className="form-group">
              <label>Image</label>
              <input type="file" name="link" onChange={handleChange} />
              {errors.link && <p className="error">{errors.link}</p>}
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
              {errors.link && <p className="error">{errors.link}</p>}
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
            {errors.section && <p className="error">{errors.section}</p>}
          </div>
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
