import { useState } from "react";
import styles from "./NewExperience.module.css";

type ExperienceContent = {
    companyName: string;
    description: string;
    position: string;
    startDate: string;
    endDate: string;
};

type NewExperienceProps = {
    id: string;
    content: ExperienceContent;
    onDelete: (id: string) => void;
    onUpdate: (content: ExperienceContent) => void;
};

const NewExperience = ({ id, content, onDelete, onUpdate }: NewExperienceProps) => {
    const [isEditing, setIsEditing] = useState(content.companyName.trim() === "");
    const [companyName, setCompanyName] = useState(content.companyName);
    const [description, setDescription] = useState(content.description);
    const [position, setPosition] = useState(content.position);
    const [startDate, setStartDate] = useState(content.startDate);
    const [endDate, setEndDate] = useState(content.endDate);

    const save = () => {
        onUpdate({ companyName, description, position, startDate, endDate });
        setIsEditing(false);
    };

    const cancel = () => {
        setCompanyName(content.companyName);
        setDescription(content.description);
        setPosition(content.position);
        setStartDate(content.startDate);
        setEndDate(content.endDate);
        setIsEditing(false);
    };

    return (
        <div className={styles.experience}>
            {isEditing ? (
                <>
                    <div className={styles.experience__field}>
                        <label htmlFor={`${id}-experience-company`}>Company</label>
                        <input id={`${id}-experience-company`} type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>
                    <div className={styles.experience__field}>
                        <label htmlFor={`${id}-experience-position`}>Position</label>
                        <input id={`${id}-experience-position`} type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
                    </div>
                    <div className={styles.experience__field}>
                        <label htmlFor={`${id}-experience-description`}>Description</label>
                        <input id={`${id}-experience-description`} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className={styles.experience__dates}>
                        <div className={styles.experience__field}>
                            <label htmlFor={`${id}-experience-start`}>Start date</label>
                            <input id={`${id}-experience-start`} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className={styles.experience__field}>
                            <label htmlFor={`${id}-experience-end`}>End date</label>
                            <input id={`${id}-experience-end`} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.experience__actions}>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.experience__view}>
                        <p><span className={styles.experience__label}>Company</span> {companyName || "No company"}</p>
                        <p><span className={styles.experience__label}>Position</span> {position || "No position"}</p>
                        <p><span className={styles.experience__label}>Description</span> {description || "No description"}</p>
                        <p><span className={styles.experience__label}>Dates</span> {startDate || "?"} – {endDate || "?"}</p>
                    </div>
                    <div className={styles.experience__actions}>
                        <button type="button" onClick={() => onDelete(id)}>Delete</button>
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export { NewExperience };
