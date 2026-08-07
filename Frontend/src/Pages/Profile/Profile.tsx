import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router";
import styles from "./Profile.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import PostCard from "../../Components/Post/PostCard";

function Profile() {
  const [profile, setProfile] = useState<(User & { posts: Post[] }) | null>(
    null,
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/user/profile/${params.userId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setProfile(data.userProfile);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile.</div>;
  console.log(profile);

  return (
    <>
      <section className={styles.profile__wrapper}>
        <ProfileCard owner={profile} posts={profile.posts}></ProfileCard>
      </section>
      <section className={styles.posts}>
        {profile.posts.map((post: Post) => (
          <PostCard author={profile} post={post}></PostCard>
        ))}
      </section>
    </>
  );
}

export default Profile;
