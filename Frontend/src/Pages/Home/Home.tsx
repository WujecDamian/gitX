import { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import NewPostModal from "../../Components/Navbar/components/NewPostModal";
import PostCard from "../../Components/Post/PostCard";

function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [posts, setPosts] = useState([]);
  type feedTypeTypes = "forYou" | "following";
  const [feedType, setFeedType] = useState<feedTypeTypes>("forYou");

  useEffect(() => {
    const getPosts = async () => {
      let url = "";
      if (feedType === "forYou") {
        url = "http://localhost:3000/api/post";
      } else {
        url = `http://localhost:3000/api/post/${user!.id}`;
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
        console.log(data);
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
  console.log(posts);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  return (
    <>
      <section className={styles.home}>
        <h1>Check out some group!</h1>
        {posts.map((post: any) => (
          <PostCard author={post.author} post={post}></PostCard>
        ))}
      </section>
    </>
  );
}

export default Home;
