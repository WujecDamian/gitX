import { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import NewPostModal from "../../Components/Navbar/components/NewPostModal";

function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/post", {
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
  }, []);
  console.log(posts);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;

  return (
    <>
      <section className={styles.home}>
        <h1>Check out some group!</h1>
      </section>
    </>
  );
}

export default Home;
