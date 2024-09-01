// src/components/BlogPost.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function BlogPost() {
  const { id } = useParams(); // Extract the dynamic part of the URL (the post ID)

  return (
    <div>
      <h1>Blog Post #{id}</h1>
      <p>This is the content for blog post with ID: {id}.</p>
      {/* You can add more details or fetch blog post data using the id */}
    </div>
  );
}

export default BlogPost;
