import { Link } from "react-router-dom";
import styles from "./CandidateProfile.module.css";

type CandidateProfileProps = {
    candidateProfile: CandidateProfile | undefined;
};

export const CandidateProfile = ({ candidateProfile }: CandidateProfileProps) => {
    return (
        <div className={styles.candidate__profile}>
            <h1 className={styles.candidate__profile__title}>Candidate Profile</h1>
        </div>
    );
};
