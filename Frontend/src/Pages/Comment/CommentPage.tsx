import { useEffect, useState } from "react";
import styles from "./CommentPage.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useOutletContext, useParams } from "react-router-dom";
import Comment from "../../Components/DetailedPost/Comment/Comment";
import PostCard from "../../Components/Post/PostCard";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";
import type { LayoutContextType } from "../../Layouts/GridLayout";
import { insertReply } from "../../Components/DetailedPost/insertReply";

function CommentPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [comment, setComment] = useState<CommentType | null>(null);
  const [post, setPost] = useState<DetailedPost | null>(null);
  const { commentId } = useParams<{ commentId: string }>();
  const { setOnCommentCreated } = useOutletContext<LayoutContextType>();
  type feedTypeTypes = "forYou" | "following";
  const [feedType, setFeedType] = useState<feedTypeTypes>("forYou");

  useEffect(() => {
    const getcomment = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/comment/getComment/${commentId}`,
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
          `${API_URL}/api/post/getPost/${comment!.post_id}`,
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

  useEffect(() => {
    setOnCommentCreated((payload) => {
      setPost((oldPost) => {
        if (!oldPost || oldPost.id !== payload.postId) {
          return oldPost;
        }
        return {
          ...oldPost,
          _count: {
            ...oldPost._count,
            comments: oldPost._count.comments + 1,
          },
        };
      });

      setComment((oldComment) => {
        if (!oldComment || !payload.parentCommentId) {
          return oldComment;
        }
        return insertReply(
          oldComment,
          payload.parentCommentId,
          payload.comment,
        );
      });
    });

    return () => {
      setOnCommentCreated(null);
    };
  }, [setOnCommentCreated]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  console.log(comment);
  console.log(post);
  return (
    <>
      <section className={styles.comment}>
        {error && <ErrorMessage error={error}></ErrorMessage>}
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
