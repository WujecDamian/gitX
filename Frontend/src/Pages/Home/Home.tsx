import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import PostCard from "../../Components/Post/PostCard";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";
import { useOutletContext } from "react-router-dom";
import type { LayoutContextType } from "../../Layouts/GridLayout";

function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { setOnCommentCreated } = useOutletContext<LayoutContextType>();
  type feedTypeTypes = "forYou" | "following";
  const [feedType, setFeedType] = useState<feedTypeTypes>("forYou");

  useEffect(() => {
    const getPosts = async () => {
      let url = "";
      if (feedType === "forYou") {
        url = `${API_URL}/api/post`;
      } else {
        url = `${API_URL}/api/post/${user!.id}`;
      }

      try {
        const response = await fetch(`${url}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    setOnCommentCreated((payload) => {
      setPosts((oldPosts) =>
        oldPosts.map((post) =>
          post.id === payload.postId
            ? {
                ...post,
                _count: {
                  ...post._count,
                  comments: post._count.comments + 1,
                },
              }
            : post,
        ),
      );
    });

    return () => {
      setOnCommentCreated(null);
    };
  }, [setOnCommentCreated]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  return (
    <>
      <section className={styles.home}>
        <section className={styles.post__cards}>
          {error && <ErrorMessage error={error}></ErrorMessage>}
          {posts.map((post) => (
            <PostCard
              author={post.author}
              post={post}
              key={post.id}
            ></PostCard>
          ))}
        </section>
      </section>
    </>
  );
}

export default Home;
