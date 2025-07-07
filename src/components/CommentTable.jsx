import React from 'react';

const CommentTable = ({ comments, sortConfig, requestSort }) => {
  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <table className="comment-table">
      <thead>
        <tr>
          <th>
            <button 
              className="sort-button"
              onClick={() => requestSort('postId')}
            >
              Post ID <span className="sort-icon">{getSortIcon('postId')}</span>
            </button>
          </th>
          <th>
            <button 
              className="sort-button"
              onClick={() => requestSort('name')}
            >
              Name <span className="sort-icon">{getSortIcon('name')}</span>
            </button>
          </th>
          <th>
            <button 
              className="sort-button"
              onClick={() => requestSort('email')}
            >
              Email <span className="sort-icon">{getSortIcon('email')}</span>
            </button>
          </th>
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
  );
};

export default CommentTable;