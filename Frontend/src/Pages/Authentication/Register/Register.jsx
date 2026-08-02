import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);
    const displayName = formData.get("displayName");
    const username = formData.get("username");
    const password = formData.get("password");
    const bodyData = {
      displayName,
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bodyData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }
    } catch (error) {
      setError(error.message || error);
    } finally {
      setLoading(false);
      window.location.href = "/";
    }
  };
  if (loading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>{error?.message ? error.message : String(error)}</span>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="displayName">
        Display name (this will be public to everyone)
      </label>
      <input type="text" name="displayName" id="displayName" />
      <label htmlFor="username">Username (private to you)</label>
      <input type="text" name="username" id="username" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <input type="submit" value="Register" />
    </form>
  );
};

export default Register;
