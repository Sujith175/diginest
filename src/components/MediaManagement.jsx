import React, { useContext, useState } from "react";
import bMan from "../images/businessman.jpeg";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import AddModal from "./AddModal";
import { MediaContext } from "../Context/MediaContext";
import PaginationComponent from "./PaginationComponent";
import DeleteModal from "./DeleteModal";
import * as XLSX from "xlsx";
import EditModal from "./EditModal";

const MediaManagement = () => {
  const { media } = useContext(MediaContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleEditModalToggle = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //handle delete
  const handleDelete = (id) => {
    setSelectedItem(id);
    handleDeleteModalToggle();
  };

  //handle edit
  const handleEdit = (item) => {
    setSelectedItem(item);
    handleEditModalToggle();
  };

  //code for excel sheet
  const handleExport = () => {
    const dataToExport = media.map((item, index) => ({
      "sl No.": index + 1,
      "Section Name": item.section,
      Title: item.title,
      Subheading: item.subheading,
      "Media Type": item.mediatype,
      Link: item.link,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Media Data");

    XLSX.writeFile(workbook, "MediaData.xlsx");
  };

  //handle search function
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const filteredData = media.filter(
    (item) =>
      item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subheading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mediatype.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //pagination
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(media.length / itemsPerPage);
  return (
    <>
      <div className="media-management">
        <header>
          <h2>Media Management</h2>
          <div className="profile-items">
            <div>
              <h5>Admin</h5>
              <span>admin@admin</span>
            </div>
            <div className="image-container">
              <img src={bMan} alt="profile" className="profile-image" />
            </div>
            <div className="bell-icon">
              <FaBell />
            </div>
          </div>
        </header>

        <div className="header-items">
          <div className="search-container">
            <span className="search-icon">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="button">
            <button className="add-button" onClick={handleModalToggle}>
              +
            </button>
          </div>

          <button className="export-button" onClick={handleExport}>
            Export
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Section Name</th>
                <th>Title</th>
                <th>Subheading</th>
                <th>Media Type</th>
                <th>Link</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getPaginatedData().map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.section}</td>
                  <td>{item.title}</td>
                  <td>{item.subheading}</td>
                  <td>{item.mediayype}</td>
                  <td>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="actions">
                    <FaEdit
                      className="action-icon edit"
                      onClick={() => handleEdit(item)}
                    />
                    <FaTrashAlt
                      className="action-icon delete"
                      onClick={() => handleDelete(item)}
                    />
                    <FaEye className="action-icon view" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>

        {isModalOpen && <AddModal handleModalToggle={handleModalToggle} />}
        {isDeleteModalOpen && (
          <DeleteModal
            handleDeleteToggle={handleDeleteModalToggle}
            selectedItem={selectedItem}
          />
        )}
        {isEditModalOpen && (
          <EditModal
            selectedItem={selectedItem}
            handleEditModalToggle={handleEditModalToggle}
            handleEdit={handleEdit}
          />
        )}
      </div>
    </>
  );
};

export default MediaManagement;
