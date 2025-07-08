import React from 'react';
import SearchBar from './SearchBar';

const CommentTable = ({ comments, sortConfig, requestSort, onSearch, searchTerm }) => {
  const getSortIcons = (key) => {
    const isActive = sortConfig && sortConfig.key === key;
    const isAscending = isActive && sortConfig.direction === 'ascending';
    const isDescending = isActive && sortConfig.direction === 'descending';

    return (
      <span className="sort-icons">
        <span className={`sort-icon ${isAscending ? 'active' : ''}`}>^</span>
        <span className={`sort-icon ${isDescending ? 'active' : ''}`}>⌄</span>
      </span>
    );
  };

  return (
    <div className="comment-container">
    <div className="comment-header">
  <div className="sort-controls">
    <button 
      className="sort-button"
      onClick={() => requestSort('postId')}
    >
      Sort Post ID <span className="icon-container">{getSortIcons('postId')}</span>
    </button>
    
    <button 
      className="sort-button"
      onClick={() => requestSort('name')}
    >
      Sort Name <span className="icon-container">{getSortIcons('name')}</span>
    </button>
    
    <button 
      className="sort-button"
      onClick={() => requestSort('email')}
    >
      Sort Email <span className="icon-container">{getSortIcons('email')}</span>
    </button>
  </div>
  
  <div className="search-section">
    <SearchBar 
      onSearch={onSearch} 
      searchTerm={searchTerm} 
      placeholder="Search name, email, comment" 
    />
  </div>
</div>

      <table className="comment-table">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id}>
              <td>{comment.postId}</td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentTable;