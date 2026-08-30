import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import PostCard from "../../Components/Post/PostCard";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { useOutletContext, useParams } from "react-router-dom";
import type { LayoutContextType } from "../../Layouts/GridLayout";
function Profile() {
  const [profile, setProfile] = useState<(User & { posts: Post[] }) | null>(
    null,
  );
  const [isFollowing, setIsFollowing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();
  const { setOnCommentCreated, setOnPostCreated } =
    useOutletContext<LayoutContextType>();
  let params = useParams();
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
  useEffect(() => {
    getProfile();
  }, [params.userId]);

  useEffect(() => {
    setOnCommentCreated((payload) => {
      setProfile((oldProfile) => {
        if (!oldProfile) {
          return oldProfile;
        }
        const nextPosts = oldProfile.posts.map((post) =>
          post.id === payload.postId
            ? {
                ...post,
                _count: {
                  ...post._count,
                  comments: post._count.comments + 1,
                },
              }
            : post,
        );
        return {
          ...oldProfile,
          posts: nextPosts,
        } as User & { posts: Post[] };
      });
    });

    return () => {
      setOnCommentCreated(null);
    };
  }, [setOnCommentCreated]);

  useEffect(() => {
    setOnPostCreated((payload) => {
      if (payload.post.groupId) {
        return;
      }
      setProfile((oldProfile) => {
        if (!oldProfile || oldProfile.id !== payload.post.author.id) {
          return oldProfile;
        }
        return {
          ...oldProfile,
          posts: [payload.post, ...oldProfile.posts],
        } as User & { posts: Post[] };
      });
    });

    return () => {
      setOnPostCreated(null);
    };
  }, [setOnPostCreated]);

  if (loading) return <div>Loading...</div>;
  if (error) return <ErrorMessage error={error}></ErrorMessage>;
  if (!profile) return <div>No profile.</div>;

  return (
    <>
      <ProfileCard
        owner={profile}
        isFollowing={isFollowing}
        onProfileUpdated={async () => {
          await getProfile();
          await refreshUser();
        }}
      ></ProfileCard>
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
