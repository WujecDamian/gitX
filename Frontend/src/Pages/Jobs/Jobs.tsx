import { useEffect, useState } from "react";
import styles from "./Jobs.module.css";
import { useAuth } from "../../Contexts/Auth/AuthContext";
import { CandidateSidebar } from "./JobsSidebar/CandidateSidebar";
import { RecruiterSidebar } from "./JobsSidebar/RecruiterSidebar";
import { RecruiterDashboard } from "../../Components/JobsComponents/RecruiterDashboard/RecruiterDashboard";
import { CandidateProfile } from "../../Components/JobsComponents/CandidateProfile/CandidateProfile";

function Jobs() {
  const { user } = useAuth();
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [profileVersion, setProfileVersion] = useState(0);
  const [prospectVersion, setProspectVersion] = useState(0);
  const [selectedProspect, setSelectedProspect] = useState<CandidateProfile | undefined>(undefined);

  useEffect(() => {
    if (user?.status === "Looking for a job") {
      setStatus("searching");
    } else if (user?.status === "Hiring") {
      setStatus("hiring");
    }
  }, [user?.status]);

  return (
    status === undefined ? (<> <h3 className={styles.jobs__status__message}>Pick status on your profile</h3></>) : (<>
      <section className={styles.jobs__wrapper} >

        {status === "hiring" && (
          <RecruiterSidebar
            prospectVersion={prospectVersion}
            onOpen={setSelectedProspect}
          />
        )}
        {status === "searching" && <CandidateSidebar userId={user?.id} onSaved={() => setProfileVersion((version) => version + 1)} />}

        <section className={styles.jobs__content}>
          {status === "searching" && <CandidateProfile profileVersion={profileVersion} />}
          {status === "hiring" && (
            <RecruiterDashboard
              selected={selectedProspect}
              onClearSelected={() => setSelectedProspect(undefined)}
              prospectVersion={prospectVersion}
              onSaved={() => setProspectVersion((version) => version + 1)}
            />
          )}
        </section>
      </section >
    </>)

  );


}


export default Jobs;
