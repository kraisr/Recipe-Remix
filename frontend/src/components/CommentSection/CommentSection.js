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
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const responseUser = await fetch("http://localhost:8080/user/user", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          method: "GET",
        });

        if (!responseUser.ok) {
          throw new Error('Network response was not ok');
        }
        const userData = await responseUser.json();
 
        const data = await response.json();
        
        // Get the user's liked comments
        const likedCommentIds = userData.likedComments.map(comment => comment._id);
        console.log("ids: ", likedCommentIds);
        // Update comments with isLiked property
        const updatedComments = data.comments.map(comment => ({
          ...comment,
          isLiked: likedCommentIds.includes(comment._id),
        }));

        console.log("updated: ", updatedComments);
  
        setComments(updatedComments);
        console.log("comments1: ", comments);
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
      // Check if the comment is already liked by the user
      const isLiked = comments.find(comment => comment._id === commentId)?.isLiked || false;
  
      if (isLiked) {
        // If already liked, make a request to remove it from liked comments
        const response = await fetch(`http://localhost:8080/user/unlike-comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ commentId })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        // Update the local state to toggle isLiked and update the rating
        setComments((prevComments) =>
          prevComments.map(comment =>
            comment._id === commentId
              ? { ...comment, isLiked: !comment.isLiked, rating: comment.rating - 1 }
              : comment
          )
        );
  
        // Update the comment rating on the server
        await updateCommentRating(commentId, -1);
        
        fetchUser();
      } else {
        // If not liked, make a request to like the comment
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
  
        // Update the local state to toggle isLiked and update the rating
        setComments((prevComments) =>
          prevComments.map(comment =>
            comment._id === commentId
              ? { ...comment, isLiked: !comment.isLiked, rating: comment.rating + 1 }
              : comment
          )
        );
  
        // Update the comment rating on the server
        await updateCommentRating(commentId, 1);
  
        fetchUser();
      }
    } catch (error) {
      console.error('Error liking/disliking comment:', error);
    }
  };
  
  // Function to update comment rating on the server
  const updateCommentRating = async (commentId, ratingChange) => {
    try {
      const response = await fetch(`http://localhost:8080/posts/update-comment-rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId, ratingChange }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating comment rating on the server:', error);
    }
  };
  
  
  

  const delete_all_likes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/delete-all-comments`, {
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
          <p>{comment.rating}</p>
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