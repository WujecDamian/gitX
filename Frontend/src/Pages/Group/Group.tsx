import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams, Link } from "react-router";
import styles from "./Group.module.css";
import { GroupSidebar } from "../../Components/Group/Subcomponents/GroupSidebar";
import { GroupPanel } from "../../Components/Group/GroupPanel/GroupPanel";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";

function Group() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();
  if (!user) {
    return <h2>Log in first</h2>;
  }
  useEffect(() => {
    const getGroups = async () => {
      try {
        const response = await fetch(`${API_URL}/api/group/`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.statusText}`);
        }
        const data = await response.json();
        setGroups(data.groups);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getGroups();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view this page.</div>;
  if (error) return <ErrorMessage error={error}></ErrorMessage>;
  console.log(groups);
  return (
    <>
      <section
        className={`${styles.group__wrapper} ${params.groupId ? styles["group__wrapper--open"] : ""}`}
      >
        <GroupSidebar groups={groups}></GroupSidebar>
        <GroupPanel></GroupPanel>
      </section>
    </>
  );
}

export default Group;
