import { Link } from "react-router-dom";
import styles from "./CandidateProfile.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/Auth/AuthContext";
import { API_URL } from "../../../config";

type CandidateProfileProps = {
    candidateProfile: CandidateProfile | undefined;
};

export const CandidateProfile = ({ candidateProfile }: CandidateProfileProps) => {
    const { user } = useAuth();

    const [candidate, setCandidate] = useState<CandidateProfile | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const getCandidate = async () => {
            try {
                const response = await fetch(`${API_URL}/api/candidate/getCandidate/${user?.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("No candidate profile found");
                }
                const data = await response.json();
                setCandidate(data.candidateProfile);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };
        getCandidate();
    }, []);

    console.log(candidate)

    return (
        <div className={styles.candidate__profile}>
            {candidate ? (
                <div className={styles.candidate__profile__content}>
                    <h2 className={styles.candidate__profile__content__title}>{candidate.name}</h2>
                    <p className={styles.candidate__profile__content__description}>{candidate.bio}</p>
                </div>
            ) : (
                <p>No candidate profile found</p>
            )}
        </div>
    );
};
