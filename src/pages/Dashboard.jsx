import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getComments, getUsers } from '../services/api';
import CommentTable from '../components/CommentTable';
import SearchBar from '../components/SearchBar';
import '../styles.css';

const Dashboard = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [userInitials, setUserInitials] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitials = async () => {
      try {
        const users = await getUsers();
        const firstUser = users[0];
        const initials = firstUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        setUserInitials(initials);
      } catch (error) {
        console.error('Error fetching user initials:', error);
        setUserInitials('US');
      }
    };
    fetchInitials();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentsData = await getComments();
        setComments(commentsData);
        setFilteredComments(commentsData);
        setPagination(prev => ({
          ...prev,
          totalItems: commentsData.length
        }));
        setLoading(false);
        
        const savedState = JSON.parse(localStorage.getItem('dashboardState'));
        if (savedState) {
          setSearchTerm(savedState.searchTerm || '');
          setSortConfig(savedState.sortConfig || null);
          setPagination(savedState.pagination || {
            currentPage: 1,
            pageSize: 10,
            totalItems: commentsData.length
          });
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!comments.length) return;

    let result = [...comments];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(comment => 
        comment.name.toLowerCase().includes(term) ||
        comment.email.toLowerCase().includes(term) ||
        comment.body.toLowerCase().includes(term)
      );
    }
    
    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    setFilteredComments(result);
    setPagination(prev => ({
      ...prev,
      totalItems: result.length,
      currentPage: 1
    }));

    localStorage.setItem('dashboardState', JSON.stringify({
      searchTerm,
      sortConfig,
      pagination: {
        ...pagination,
        totalItems: result.length
      }
    }));
  }, [comments, searchTerm, sortConfig]);

  const handleSearch = (term) => setSearchTerm(term);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig?.key === key) {
      direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const handlePageSizeChange = (size) => {
    setPagination({
      currentPage: 1,
      pageSize: size,
      totalItems: filteredComments.length
    });
  };

  const handleViewProfile = async () => {
    const users = await getUsers();
    const firstUser = users[0];
    navigate('/profile', { state: { user: firstUser } });
  };

  const { currentPage, pageSize, totalItems } = pagination;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = filteredComments.slice(startIndex, endIndex);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <nav className="swift-navbar">
        <h1 className="navbar-title">SWIFT</h1>
        <button 
          onClick={handleViewProfile} 
          className="profile-button-circle"
          aria-label="View Profile"
        >
          {userInitials}
        </button>
      </nav>

      <div className="dashboard-content">
    

        <CommentTable 
  comments={paginatedData} 
  sortConfig={sortConfig}
  requestSort={requestSort}
  onSearch={handleSearch}
  searchTerm={searchTerm}
/>
        <div className="pagination-controls">
          <div className="page-size-selector">
            <span>Items per page:</span>
            <select 
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {[10, 50, 100].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          
          <div className="page-info">
            Showing {startIndex + 1}-{endIndex} of {totalItems} items
          </div>
          
          <div className="page-navigation">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-button"
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`page-button ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="page-ellipsis">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`page-button ${currentPage === totalPages ? 'active' : ''}`}
                >
                  {totalPages}
                </button>
              </>
            )}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;