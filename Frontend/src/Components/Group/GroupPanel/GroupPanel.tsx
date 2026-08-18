import styles from "./GroupPanel.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GroupCard from "./Subcomponents/GroupCard/GroupCard";
import TabNav from "./Subcomponents/TabNav/TabNav";
import { NewPostBlock } from "./Subcomponents/NewPostBlock/NewPostBlock";
import PostCard from "../../Post/PostCard";

export type TabOption = "Posts" | "Chat";

export const GroupPanel = () => {
  const { groupId } = useParams<{ groupId: string }>();

  const [group, setGroup] = useState<Group | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentTab, setCurrentTab] = useState<TabOption>("Posts");
  const PROFILE_TABS = ["Posts", "Chat"] as const;

  useEffect(() => {
    if (!groupId) {
      setGroup(null);
      return;
    }

    const fetchGroup = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/group/${groupId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to load conversation history.");
        }
        const data = await response.json();
        setGroup(data.group);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);
  useEffect(() => {
    if (!groupId) {
      setPosts(null);
      return;
    }
    const fetchGroupPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/post/group/${groupId}`,
          {
            method: "GET",
            credentials: "include",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to load conversation history.");
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupPosts();
  }, [groupId]);
  if (!groupId) {
    return (
      <section className={styles.no__group__selected}>
        <p>Select a message from your inbox to start groupting.</p>
      </section>
    );
  }

  if (isLoading) {
    return <div className={styles.loading__spinner}>Loading messages...</div>;
  }

  if (error) {
    return <div className={styles.error__view}>{error}</div>;
  }

  console.log("GroupPanel | Group: ", group);
  return (
    <section className={styles.group__wrapper}>
      {group ? (
        <>
          <GroupCard group={group} isMember={true}></GroupCard>
          <TabNav
            tabs={PROFILE_TABS}
            activeTab={currentTab}
            setActiveTab={setCurrentTab}
          ></TabNav>
          {currentTab === "Posts" && (
            <div>
              <NewPostBlock></NewPostBlock>
              <section className={styles.posts}>
                {posts && posts.length > 0 ? (
                  posts.map((post: Post) => (
                    <PostCard author={post.author} post={post} key={post.id} />
                  ))
                ) : (
                  <p className={styles.no__posts__info}>
                    There are no posts to show.
                  </p>
                )}
              </section>
            </div>
          )}
          {currentTab === "Chat" && <div>User replies and comments...</div>}
        </>
      ) : (
        <h1>No group selected</h1>
      )}
    </section>
  );
};
