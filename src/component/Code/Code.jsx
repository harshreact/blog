import React, { useState, useEffect } from "react";

import '../Code/Code.css'

const Code = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage,setCurrentPage]=useState(1);
  const postsPerPage=9;

  useEffect(() => {
    fetch("/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="main">
      <h1 className="title_h1">Blog Posts</h1>
      <input
        type="text"
        placeholder="Search"
        className="search-box"
        value={searchQuery}
        onChange={(e) => {setSearchQuery(e.target.value);
            setCurrentPage(1);
        }}
      />
      <div className="blog-container">
        {currentPosts.map((post) => (
            <div key={post.id} className="blog-card">
                <h2 className="title_h2">{post.title}</h2>
                <p>{post.body}</p>
                <p>{post.tags.join(", ")}</p>
                <p className="author">
                    <a href="#">By: {post.author.name}</a>
                </p>
           </div>
        ))}
      </div>
      <div className="pagination">
        <button className="previous"
          onClick={() => setCurrentPage((prev) =>(prev - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className="next"
          onClick={() => setCurrentPage((prev) =>(prev + 1))}        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Code;
