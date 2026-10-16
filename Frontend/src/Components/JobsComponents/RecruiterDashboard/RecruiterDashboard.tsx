import { useEffect, useState } from "react";
import styles from "./RecruiterDashboard.module.css";
import { API_URL } from "../../../config";
import { CandidateProfile } from "../CandidateProfile/CandidateProfile";

type RecruiterDashboardProps = {
    selected: CandidateProfile | undefined;
    onClearSelected: () => void;
    prospectVersion: number;
    onSaved: () => void;
};

const roles = ["", "Frontend", "Backend", "Fullstack", "DevOps", "Data Science", "Cybersecurity", "AI"];

export const RecruiterDashboard = ({ selected, onClearSelected, prospectVersion, onSaved }: RecruiterDashboardProps) => {
    const [role, setRole] = useState("");
    const [remote, setRemote] = useState(false);
    const [onsite, setOnsite] = useState(false);
    const [hybrid, setHybrid] = useState(false);
    const [expectedSalary, setExpectedSalary] = useState(40000);
    const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
    const [index, setIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const browse = async () => {
            try {
                const params = new URLSearchParams({
                    expected_salary: String(expectedSalary),
                });
                if (role) params.set("role", role);
                if (remote) params.set("remote", "true");
                if (onsite) params.set("onsite", "true");
                if (hybrid) params.set("hybrid", "true");
                const response = await fetch(`${API_URL}/api/candidate/browse?${params.toString()}`, {
                    credentials: "include",
                });
                if (!response.ok) {
                    throw new Error("Failed to load candidates");
                }
                const data = await response.json();
                setCandidates(data.candidates ?? []);
                setIndex(0);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };
        browse();
    }, [role, remote, onsite, hybrid, expectedSalary, prospectVersion]);

    const current = selected ?? candidates[index];

    const showNext = () => {
        onClearSelected();
        if (!selected) {
            setIndex((currentIndex) => currentIndex + 1);
        }
    };

    const saveCurrent = async () => {
        if (!current?.id) return;
        try {
            const response = await fetch(`${API_URL}/api/candidate/prospects`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ candidateProfileId: current.id }),
            });
            if (!response.ok) {
                throw new Error("Failed to save prospect");
            }
            onSaved();
            onClearSelected();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.filters}>
                <label className={styles.filters__field}>
                    Role
                    <select value={role} onChange={(event) => setRole(event.target.value)}>
                        <option value="">Any</option>
                        {roles.filter(Boolean).map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                </label>
                <label className={styles.filters__check}>
                    <input type="checkbox" checked={remote} onChange={(event) => setRemote(event.target.checked)} />
                    Remote
                </label>
                <label className={styles.filters__check}>
                    <input type="checkbox" checked={onsite} onChange={(event) => setOnsite(event.target.checked)} />
                    Onsite
                </label>
                <label className={styles.filters__check}>
                    <input type="checkbox" checked={hybrid} onChange={(event) => setHybrid(event.target.checked)} />
                    Hybrid
                </label>
                <label className={styles.filters__field}>
                    Max salary {expectedSalary} PLN
                    <input type="range" min={4000} max={40000} step={100} value={expectedSalary} onChange={(event) => setExpectedSalary(Number(event.target.value))} />
                </label>
            </div>
            {error && <p>{error}</p>}
            {current ? (
                <CandidateProfile
                    candidateProfile={current}
                    onSkip={showNext}
                    onSave={selected ? undefined : saveCurrent}
                />
            ) : (
                <p>No candidates match these filters.</p>
            )}
        </div>
    );
};
