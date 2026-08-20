import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router";
import styles from "./Profile.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import PostCard from "../../Components/Post/PostCard";
import { API_URL } from "../../config";
function Profile() {
  const [profile, setProfile] = useState<(User & { posts: Post[] }) | null>(
    null,
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/user/profile/${params.userId}`,
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
        setIsFollowing(data.isFollowing);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getProfile();
  }, [params.userId]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No profile.</div>;

  return (
    <>
      <ProfileCard owner={profile} isFollowing={isFollowing}></ProfileCard>
      <section className={styles.posts}>
        {profile.posts.length > 0 ? (
          profile.posts.map((post: Post) => (
            <PostCard author={profile} post={post} key={post.id}></PostCard>
          ))
        ) : (
          <div className={styles.no__posts__message}>
            <p>{profile.display_name} Has no posts to show!</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Profile;
