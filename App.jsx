import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleAddPost = () => {
    if (newPostTitle) {
      const newPost = { id: posts.length + 1, title: newPostTitle };
      setPosts([newPost, ...posts]);
      setNewPostTitle('');
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleEditPost = (postId, newTitle) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, title: newTitle } : post));
  };

  return (
    <div className="App">
      <h1>CRUD App</h1>
      <input
        type="text"
        value={newPostTitle}
        onChange={e => setNewPostTitle(e.target.value)}
        placeholder="Add a new post"
      />
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            onDelete={handleDeletePost}
            onEdit={handleEditPost}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

