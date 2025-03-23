import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // For accessibility

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(6);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDocuments();
  }, [navigate]);

  const fetchDocuments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No token found');
      }
      const { data } = await axios.get('http://localhost:5000/api/documents', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
      // Fallback to mock data if the API call fails
      const mockData = [
        { _id: '1', title: 'Document 1', createdAt: '2023-10-01T12:00:00Z' },
        { _id: '2', title: 'Document 2', createdAt: '2023-10-02T12:00:00Z' },
        { _id: '3', title: 'Document 3', createdAt: '2023-10-03T12:00:00Z' },
        { _id: '4', title: 'Document 4', createdAt: '2023-10-04T12:00:00Z' },
        { _id: '5', title: 'Document 5', createdAt: '2023-10-05T12:00:00Z' },
        { _id: '6', title: 'Document 6', createdAt: '2023-10-06T12:00:00Z' },
      ];
      setDocuments(mockData);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedDocuments = filteredDocuments.sort((a, b) => {
    if (sortBy === 'createdAt') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = sortedDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await axios.delete(`http://localhost:5000/api/documents/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success('Document deleted successfully!');
      fetchDocuments(); // Refresh the list
    } catch (error) {
      console.error('Failed to delete document:', error);
      toast.error('Failed to delete document. Please try again.');
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const openDeleteModal = (id) => {
    setDocumentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4" style={{ background: 'linear-gradient(135deg, #1e3c72, #2a5298)', minHeight: '100vh' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="text-white fw-bold">Dashboard</h2>
          <div>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control rounded-pill me-3"
              style={{ width: '250px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#fff' }}
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select rounded-pill"
              style={{ width: '150px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#fff' }}
            >
              <option value="createdAt">Sort by Date</option>
              <option value="title">Sort by Title</option>
            </select>
          </div>
        </div>

        <div className="text-white mb-4">
          Showing {currentDocuments.length} of {sortedDocuments.length} documents
        </div>

        <motion.div
          className="row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentDocuments.map((doc) => (
            <motion.div
              key={doc._id}
              className="col-md-4 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="card h-100 shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '15px' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-white fw-bold">{doc.title}</h5>
                  <p className="card-text text-white-50">Created on: {new Date(doc.createdAt).toLocaleDateString()}</p>
                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/document/${doc._id}`}
                      className="btn btn-primary flex-grow-1"
                      style={{
                        background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
                        border: 'none',
                        borderRadius: '30px',
                        padding: '10px 20px',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="fas fa-eye me-2"></i> Open
                    </Link>
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate(`/document/edit/${doc._id}`)}
                      style={{
                        borderRadius: '30px',
                        padding: '10px 20px',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteModal(doc._id)}
                      style={{
                        borderRadius: '30px',
                        padding: '10px 20px',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: Math.ceil(sortedDocuments.length / documentsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '30px' }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <motion.button
          className="btn btn-success rounded-circle p-3"
          onClick={() => navigate('/document/new')}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(45deg, #4caf50, #81c784)',
            border: 'none',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <i className="fas fa-plus"></i>
        </motion.button>

        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete Document Confirmation"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '15px',
              padding: '20px',
              color: '#fff'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          <h2 className="fw-bold mb-4">Are you sure?</h2>
          <p className="mb-4">This action cannot be undone. The document will be permanently deleted.</p>
          <div className="d-flex justify-content-end gap-3">
            <button className="btn btn-secondary" onClick={closeDeleteModal}>Cancel</button>
            <button className="btn btn-danger" onClick={() => handleDelete(documentToDelete)}>Delete</button>
          </div>
        </Modal>

        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Dashboard;