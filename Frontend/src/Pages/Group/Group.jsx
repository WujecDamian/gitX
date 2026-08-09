import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router";
import styles from "./Group.module.css";
import UserBox from "../../Components/UserBox/Userbox";

function Group() {
  const [cookies] = useCookies(["user", "token"]);
  const token = cookies.token;
  const user = cookies.user;

  const [group, setGroup] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let params = useParams();

  useEffect(() => {
    const fetchGroups = async () => {
      console.log(params);
      console.log(params.groupId);
      try {
        const response = await fetch(
          `http://localhost:3000/api/groups/group/${params.groupId}`,
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            `HTTP error ${result.error}! Status: ${response.status}`,
          );
        }
        setGroup(result.group);
      } catch (err) {
        console.error("Fetch failed", err);
      }
    };
    fetchGroups();
  }, []);
  console.log(group);

  const handleJoin = async () => {
    const bodyData = {
      userId: user.id,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/groups/group/${params.groupId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ bodyData }),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className={styles.home}>
        <h1>{group.name}</h1>
        <button onClick={handleJoin}>Join</button>
        {loading && <span>loading....</span>}
        {error && <span>{error?.message ? error.message : String(error)}</span>}

        <section className={styles.group}>
          {group?.users?.map((user) => (
            <UserBox user={user}></UserBox>
          ))}
        </section>
      </section>
    </>
  );
}

export default Group;
