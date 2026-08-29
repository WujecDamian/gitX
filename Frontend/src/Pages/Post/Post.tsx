import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useOutletContext, useParams } from "react-router-dom";
import DetailedPostCard from "../../Components/DetailedPost/DetailedPostCard";
import Comment from "../../Components/DetailedPost/Comment/Comment";
import Reply from "../../Components/DetailedPost/Reply/Reply";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";
import type { LayoutContextType } from "../../Layouts/GridLayout";

function Post() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [post, setPost] = useState<DetailedPost | null>(null);
  const { postId } = useParams<{ postId: string }>();
  const { setOnCommentCreated } = useOutletContext<LayoutContextType>();
  type feedTypeTypes = "forYou" | "following";
  const [feedType, setFeedType] = useState<feedTypeTypes>("forYou");

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/post/postWithComments/${postId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
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
    getPost();
  }, [postId]);

  useEffect(() => {
    setOnCommentCreated((payload) => {
      setPost((oldPost) => {
        if (!oldPost) {
          return oldPost;
        }

        if (payload.parentCommentId) {
          return {
            ...oldPost,
            comments: oldPost.comments.map((existingComment) =>
              existingComment.id === payload.parentCommentId
                ? {
                    ...existingComment,
                    sub_comments: [
                      payload.comment,
                      ...(existingComment.sub_comments ?? []),
                    ],
                    _count: {
                      ...existingComment._count,
                      sub_comments: existingComment._count.sub_comments + 1,
                    },
                  }
                : existingComment,
            ),
            _count: {
              ...oldPost._count,
              comments: oldPost._count.comments + 1,
            },
          };
        }

        if (oldPost.id !== payload.postId) {
          return oldPost;
        }

        return {
          ...oldPost,
          comments: [payload.comment, ...oldPost.comments],
          _count: {
            ...oldPost._count,
            comments: oldPost._count.comments + 1,
          },
        };
      });
    });

    return () => {
      setOnCommentCreated(null);
    };
  }, [setOnCommentCreated]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  console.log(post);
  return (
    <>
      <section className={styles.post}>
        {error && <ErrorMessage error={error}></ErrorMessage>}
        {post && (
          <>
            <DetailedPostCard
              author={post.author}
              post={post}
            ></DetailedPostCard>
            <Reply
              author={user}
              postId={post.id}
              onCommentCreated={(comment) => {
                setPost((oldPost) => {
                  if (!oldPost) {
                    return oldPost;
                  }
                  return {
                    ...oldPost,
                    comments: [comment, ...oldPost.comments],
                    _count: {
                      ...oldPost._count,
                      comments: oldPost._count.comments + 1,
                    },
                  };
                });
              }}
            ></Reply>
            <section className={styles.post__comments}>
              {post.comments.map((comment: CommentType) => (
                <Comment
                  author={comment.author}
                  comment={comment}
                  key={comment.id}
                ></Comment>
              ))}
            </section>
          </>
        )}
      </section>
    </>
  );
}

export default Post;
