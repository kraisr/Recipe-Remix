import React, { useState, useEffect } from "react";

import "./commentsection.css";

const CommentSection = ({ postId, currentUserId }) => {
  const [comments, setComments] = useState([]);
  

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
        console.log("comments: ", data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    

    // Call the fetchComments and fetchCurrentUserProfile functions
    fetchComments();
  }, [postId, currentUserId]);
  
  // Fetch user function
  const fetchUser = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch("http://localhost:8080/user/user", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          method: "GET",
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("data ", data.likedComments);

      } catch (error) {
        console.error('Error fetching user name:', error);
      }
  };

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

  const handleLikeComment = async (commentId, userId) => {
  try {
    const updateUserData = {
      commentId: commentId,
    };
    const response = await fetch(`http://localhost:8080/user/like-comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updateUserData)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const updatedComment = await response.json();
    console.log("check:", updatedComment);
    // Update the local state to toggle isLiked
    setComments((prevComments) =>
      prevComments.map(comment =>
        comment._id === commentId ? { ...comment, isLiked: !comment.isLiked } : comment
      )
    );

    fetchUser();
    

  } catch (error) {
    console.error('Error liking/disliking comment:', error);
  }
};


  const delete_all_likes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/unlike-comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
      });

      const data = await response.json();
      console.log(data);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error liking/disliking comment:', error);
    }
  }

  return (
    <div className="comment-section">
      <h2>Comments</h2>
      {comments.map((comment) => (
      <div key={comment._id} className="comment-item">
        <p><b>{comment.username}</b></p>
        <div className="comment-text-section">
          <i
            className={`fa-thumbs-up ${comment.isLiked ? 'fa-solid' : 'fa-regular'}`}
            onClick={() => handleLikeComment(comment._id, currentUserId)}
          ></i>
          <i className="fa-regular fa-thumbs-down"></i>
        </div>
        <p>{comment.text}</p>
        {currentUserId === comment.username && (
          <button onClick={() => handleDeleteComment(comment._id)} className="button-44 deleteBtn">Delete</button>
        )}
      </div>
    ))}
    <button onClick={delete_all_likes}>delete all</button>
    </div>
  );
};

export default CommentSection;