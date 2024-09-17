import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog posts from the API
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/getblog"); // Replace with your actual API
        const data = await response.json();
        setPosts(data.blogs); // Accessing the blogs array from the response
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-container">
      {posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div className="blog-post" key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.imageUrl && (
              <img src={post.imageUrl.url} alt={post.title} />
            )}{" "}
            {/* Accessing imageUrl.url */}
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
