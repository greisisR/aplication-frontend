import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CForm,
  CFormLabel,
} from '@coreui/react';

const OfficeList = () => {
  const [officeData, setOfficeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentOffice, setCurrentOffice] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('http://localhost:8000/office')
      .then((response) => {
        setOfficeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching office data:", error);
      });
  }, []);

  const filteredData = officeData.filter((office) =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleUpdate = (office) => {
    setCurrentOffice(office);
    setUpdateModalVisible(true);
  };

  const handleUpdateChange = (field, value) => {
    setCurrentOffice({ ...currentOffice, [field]: value });
  };

  const handleSave = () => {
    console.log('Updated office:', currentOffice);
    setUpdateModalVisible(false);
    
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Office List</strong>
          </CCardHeader>
          <CCardBody>
            <CFormInput
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <CTable striped responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Office ID</CTableHeaderCell>
                  <CTableHeaderCell>Office Name</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentData.length > 0 ? (
                  currentData.map((office) => (
                    <CTableRow key={office.office_id}>
                      <CTableDataCell>{office.office_id}</CTableDataCell>
                      <CTableDataCell>{office.name}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          size="sm"
                          onClick={() => handleUpdate(office)}
                        >
                          Update
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="3" className="text-center">
                      No results found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Page {currentPage} of {totalPages}</span>
              <div>
                <CButton
                  color="primary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="me-2"
                >
                  Previous
                </CButton>
                <CButton
                  color="primary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </CButton>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal for updating office */}
      <CModal
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
      >
        <CModalHeader>
          <strong>Update Office</strong>
        </CModalHeader>
        <CModalBody>
          {currentOffice && (
            <CForm>
              <div className="mb-3">
                <CFormLabel>Office Name</CFormLabel>
                <CFormInput
                  value={currentOffice.name || ''}
                  onChange={(e) => handleUpdateChange('name', e.target.value)}
                />
              </div>
             
            </CForm>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setUpdateModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  );
};

export default OfficeList;
