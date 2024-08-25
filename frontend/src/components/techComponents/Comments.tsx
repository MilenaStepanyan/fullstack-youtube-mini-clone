import React, { useState, useEffect } from "react";

interface Comment {
  id: number;
  video_id: number;
  user_id: number;
  content: string;
  created_at: string;
}

interface CommentsProps {
  videoId: number;
}

const API_BASE_URL = "http://localhost:3010/api";

const Comments: React.FC<CommentsProps> = ({ videoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/comments?video_id=${videoId}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || "Failed to fetch comments");
        }
        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Could not load comments. Please try again later.");
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          video_id: videoId,
          user_id: userId,
          content: newComment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to add comment");
      }

      const newCommentData = await response.json();
      setComments([...comments, newCommentData]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Could not add comment. Please try again later.");
    }
  };
  {
    console.log(comments);
  }
  return (
    <div className="comments-container">
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <>
          {error && <p className="error">{error}</p>}
          <div className="comment-input">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="comment-item">
                <p>{comment.content}</p>
                <small>
                  Posted on: {new Date(comment.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Comments;
