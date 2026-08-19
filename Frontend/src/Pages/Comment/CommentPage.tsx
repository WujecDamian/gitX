import { useEffect, useState, useRef } from "react";
import styles from "./CommentPage.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useParams } from "react-router-dom";
import DetailedPostCard from "../../Components/DetailedPost/DetailedPostCard";
import Reply from "../../Components/DetailedPost/Reply/Reply";
import Comment from "../../Components/DetailedPost/Comment/Comment";
import SubComment from "../../Components/DetailedPost/SubComment/SubComment";
import PostCard from "../../Components/Post/PostCard";

function CommentPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [comment, setComment] = useState<CommentType | null>(null);
  const [post, setPost] = useState<DetailedPost | null>(null);
  const { commentId } = useParams<{ commentId: string }>();
  type feedTypeTypes = "forYou" | "following";
  const [feedType, setFeedType] = useState<feedTypeTypes>("forYou");

  useEffect(() => {
    const getcomment = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/comment/getComment/${commentId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.statusText}`);
        }
        const data = await response.json();
        setComment(data.comment);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getcomment();
  }, [commentId]);

  useEffect(() => {
    if (!comment || !comment.post_id) return;
    console.log("called getCommentPost! UseEffect");
    const getCommentPost = async () => {
      console.log("called getCommentPost! ");

      try {
        const response = await fetch(
          `http://localhost:3000/api/post/getPost/${comment!.post_id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch comments: ${response.statusText}`);
        }
        const data = await response.json();
        setPost(data.post);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getCommentPost();
  }, [comment]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  console.log(comment);
  console.log(post);
  return (
    <>
      <section className={styles.comment}>
        {comment && (
          <>
            {post && <PostCard author={post!.author} post={post!}></PostCard>}
            <Comment author={comment.author} comment={comment}></Comment>
          </>
        )}
      </section>
    </>
  );
}

export default CommentPage;
