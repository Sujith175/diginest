import React, { useContext, useState } from "react";
import AddModal from "../components/AddModal";
import { MediaContext } from "../Context/MediaContext";
import DeleteModal from "../components/DeleteModal";
import * as XLSX from "xlsx";
import EditModal from "../components/EditModal";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import Table from "../components/Table";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";

const MediaManagement = () => {
  const { media } = useContext(MediaContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  //calling custom hooks
  const { searchQuery, filteredData, handleSearch } = useSearch(media);
  const { currentPage, totalPages, paginatedData, handlePageChange } =
    usePagination(filteredData);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDeleteModalToggle = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleEditModalToggle = () => {
    setIsEditModalOpen(!isEditModalOpen);
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

  // const totalPages = Math.ceil(media.length / itemsPerPage);
  return (
    <>
      <div className="media-management">
        <Header />

        <div className="header-items">
          <Searchbar value={searchQuery} onChange={handleSearch} />
          <div className="button">
            <button className="add-button" onClick={handleModalToggle}>
              +
            </button>
          </div>

          <button className="export-button" onClick={handleExport}>
            Export
          </button>
        </div>

        <Table
          data={paginatedData}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />

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
