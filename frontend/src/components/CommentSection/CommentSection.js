import React, { useState, useEffect } from "react";

import "./commentsection.css";

const CommentSection = ({ postId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  const [currentUserProfileImage, setCurrentUserProfileImage] = useState('');

  useEffect(() => {
    // Fetch comments for the given postId
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data: ", data);
        setComments(data.comments);
        setCurrentUserProfileImage(data.comments.profileImage);
        console.log("comments: ", data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    

    // Call the fetchComments and fetchCurrentUserProfile functions
    fetchComments();
  }, [postId, currentUserId]);
  

  const handleDeleteComment = async (commentId) => {
    try {
      // Make a DELETE request to your server to delete the comment
      const response = await fetch(`http://localhost:8080/posts/delete-comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          postId: postId,
          commentId: commentId
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // If the comment is successfully deleted, update the local state
      setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
  
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="user-info-comment">
            <img src={currentUserProfileImage} alt="Profile" className="profile-image" />
            <p>{comment.username}</p>
          </div>

          <div className="comment-text-section">
            <i class="fa-regular fa-thumbs-up" ></i>
            <i class="fa-regular fa-thumbs-down"></i>
          </div>

          <p>{comment.text}</p>
          
          {currentUserId === comment.username && (
            <button onClick={() => handleDeleteComment(comment._id)} className="button-44 deleteBtn">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;