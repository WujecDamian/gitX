import { useEffect, useState } from "react";
import styles from "./Jobs.module.css";
import { API_URL } from "../../config";
import { ErrorMessage } from "../../Components/UI/ErrorMessage/ErrorMessage";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { CandidateSidebar } from "./JobsSidebar/CandidateSidebar";
import { RecruiterSidebar } from "./JobsSidebar/RecruiterSidebar";
import { RecruiterDashboard } from "../../Components/JobsComponents/RecruiterDashboard/RecruiterDashboard";
import { CandidateProfile } from "../../Components/JobsComponents/CandidateProfile/CandidateProfile";

function Jobs() {
  const { user } = useAuth();
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [profileVersion, setProfileVersion] = useState(0);

  useEffect(() => {
    if (user?.status === "Looking for a job") {
      setStatus("searching");
      const getCandidateProfile = async () => {
        try {
          const response = await fetch(`${API_URL}/api/jobs/candidate-profile`, {
            method: "GET",
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch candidate profile: ${response.statusText}`);
          }
          const data = await response.json();
          setCandidateProfile(data.candidateProfile);
          setIsLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred");
          }
          setIsLoading(false);
        }
      };
      getCandidateProfile();
    } else if (user?.status === "Hiring") {
      setStatus("hiring");
      const getJobs = async () => {
        try {
          const response = await fetch(`${API_URL}/api/jobs/hiring-profile`, {
            method: "GET",
            credentials: "include",
          });
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred");
          }
          setIsLoading(false);
        }
      };
      getJobs();
    }
  }, []);

  return (
    status === undefined ? (<> <h3 className={styles.jobs__status__message}>Pick status on your profile</h3></>) : (<>
      <section className={styles.jobs__wrapper} >

        {status === "hiring" && <RecruiterSidebar />}
        {status === "searching" && <CandidateSidebar userId={user?.id} onSaved={() => setProfileVersion((version) => version + 1)} />}

        <section className={styles.jobs__content}>
          {/* Render components based on status */}
          {status === "searching" && <CandidateProfile candidateProfile={candidateProfile} profileVersion={profileVersion} />}
          {status === "hiring" && <RecruiterDashboard />}
        </section>
      </section >
    </>)

  );


}


export default Jobs;
