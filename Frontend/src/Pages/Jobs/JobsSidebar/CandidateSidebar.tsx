import { Link } from "react-router-dom";
import styles from "./CandidateSidebar.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { ErrorMessage } from "../../../Components/UI/ErrorMessage/ErrorMessage";

type CandidateSidebarProps = {
  userId: string | undefined;
}

export const CandidateSidebar = ({ userId }: CandidateSidebarProps) => {

  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCandidate = async () => {
      try {
        const response = await fetch(`${API_URL}/api/candidate/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch candidate");
        }
        const data = await response.json();
        setCandidate(data as CandidateProfile);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getCandidate();
  }, [userId]);

  //states of candidate profile rows
  if (candidate) {
    const [name, setName] = useState(candidate.name ?? "");
    const [surname, setSurname] = useState(candidate.surname ?? "");
    const [email, setEmail] = useState(candidate.email ?? "");
    const [phone, setPhone] = useState(candidate.phone ?? "");
    const [bio, setBio] = useState(candidate.bio ?? "");
    const [tags, setTags] = useState(candidate.tags ?? []);
    const [socials, setSocials] = useState(candidate.socials ?? []);
    const [photoUrl, setPhotoUrl] = useState(candidate.photo_url ?? "");
    const [projects, setProjects] = useState(candidate.projects ?? []);
    const [experience, setExperience] = useState(candidate.experience ?? []);
    const [education, setEducation] = useState(candidate.education ?? []);
    const [skills, setSkills] = useState(candidate.skills ?? []);
    const [certifications, setCertifications] = useState(candidate.certifications ?? []);
    const [languages, setLanguages] = useState(candidate.languages ?? []);
  }
  return (error ? (<ErrorMessage error={error} />) : (
    <>
      <aside className={styles.candidate__sidebar}>
        <h1 className={styles.candidate__sidebar__title}>Your Candidate Profile</h1>
        <section className={styles.candidate__details}>

        </section>
        <section className={styles.candidate__actions}>
          <button className={styles.candidate__actions__button}>
            <button className={styles.candidate__actions__button__save}>Save</button>
          </button>
        </section>
      </aside>
    </>
  ));
}
