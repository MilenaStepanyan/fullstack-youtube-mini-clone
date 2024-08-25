import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  video_id: number;
  user_id: number;
  comment_text: string;
  parent_id: number | null;
  created_at: string;
}

interface CommentsProps {
  videoId: number;
}

const Comments: React.FC<CommentsProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?video_id=${videoId}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [videoId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userIdFromToken = getUserIdFromToken(token);
      setUserId(userIdFromToken);
    }
  }, []);

  const getUserIdFromToken = (token: string): number => {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const parsedData = JSON.parse(decodedPayload);
    return parsedData.userId;
  };

  const handleAddComment = async () => {
    if (!newComment || userId === null) return;

    try {
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          video_id: videoId,
          user_id: userId,
          comment_text: newComment,
        }),
      });
      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };



  return (
    <div>
      <h2>Comments</h2>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.comment_text}</p>
            <small>Posted on: {new Date(comment.created_at).toLocaleString()}</small>
            <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            <button onClick={() => handleUpdateComment(comment.id, prompt("Edit comment:", comment.comment_text) || comment.comment_text)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
