import React, { useState } from 'react';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      setPosts([{ user, text: newPost }, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="feed">
      <h2>Bem-vindo, {user} 👋</h2>
      
      <div className="new-post">
        <textarea 
          placeholder="Escreva algo..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handleAddPost}>Postar</button>
      </div>

      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <strong>{post.user}</strong>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;
