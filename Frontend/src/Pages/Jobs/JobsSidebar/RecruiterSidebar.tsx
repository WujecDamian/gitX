import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecruiterSidebar.module.css";
import { API_URL } from "../../../config";

type RecruiterSidebarProps = {
  prospectVersion: number;
  onOpen: (candidate: CandidateProfile) => void;
};

type ProspectRow = {
  id: string;
  candidateProfile: CandidateProfile;
};

export const RecruiterSidebar = ({ prospectVersion, onOpen }: RecruiterSidebarProps) => {
  const navigate = useNavigate();
  const [prospects, setProspects] = useState<ProspectRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProspects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/candidate/prospects`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to load prospects");
        }
        const data = await response.json();
        setProspects(data.prospects ?? []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    loadProspects();
  }, [prospectVersion]);

  const openChat = async (userId: string | undefined) => {
    if (!userId) return;
    try {
      const response = await fetch(`${API_URL}/api/chat/${userId}`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to open chat");
      }
      const data = await response.json();
      navigate(`/chat/${data.chat}`);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <aside className={styles.recruiter__sidebar}>
      <h1 className={styles.recruiter__sidebar__title}>Prospects</h1>
      {error && <p className={styles.prospect__error}>{error}</p>}
      <ul className={styles.prospect__list}>
        {prospects.map((prospect) => (
          <li key={prospect.id} className={styles.prospect}>
            <button type="button" className={styles.prospect__open} onClick={() => onOpen(prospect.candidateProfile)}>
              {prospect.candidateProfile.name} {prospect.candidateProfile.surname}
            </button>
            <button type="button" className={styles.prospect__message} onClick={() => openChat(prospect.candidateProfile.user_id)}>
              Message
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
