import { useEffect, useState, useRef } from "react";
import styles from "./Post.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useParams } from "react-router-dom";
import DetailedPostCard from "../../Components/DetailedPost/DetailedPostCard";
import Comment from "../../Components/DetailedPost/Comment/Comment";
import Reply from "../../Components/DetailedPost/Reply/Reply";

function Post() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [post, setPost] = useState<DetailedPost | null>(null);
  const { postId } = useParams<{ postId: string }>();
  type feedTypeTypes = "forYou" | "following";
  const [feedType, setFeedType] = useState<feedTypeTypes>("forYou");

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/post/postWithComments/${postId}`,
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  console.log(post);
  return (
    <>
      <section className={styles.post}>
        {post && (
          <>
            <DetailedPostCard
              author={post.author}
              post={post}
            ></DetailedPostCard>
            <Reply author={user} postId={post.id}></Reply>
            <section className={styles.post__comments}>
              {post.comments.map((comment: any) => (
                <>
                  <Comment
                    author={comment.author}
                    comment={comment}
                    key={comment.id}
                  ></Comment>
                </>
              ))}
            </section>
          </>
        )}
      </section>
    </>
  );
}

export default Post;
