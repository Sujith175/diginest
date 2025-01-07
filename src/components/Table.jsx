import React from "react";
import PaginationComponent from "../components/PaginationComponent";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const Table = ({
  data,
  totalPages,
  handlePageChange,
  currentPage,
  handleDelete,
  handleEdit,
}) => {
  return (
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
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.section}</td>
              <td>{item.title}</td>
              <td>{item.subheading}</td>
              <td>{item.mediatype}</td>
              <td>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
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
      {/* <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default Table;
