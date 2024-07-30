import React, { useState } from 'react';

function Post({ post, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(post.id, editTitle);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
      ) : (
        <span>{post.title}</span>
      )}
      <div className="button-group">
        <button onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </li>
  );
}

export default Post;

