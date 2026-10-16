import { useState } from "react";
import styles from "./NewExperience.module.css";

type NewExperienceProps = {
    id: string;
    name: string;
    content: {
        companyName: string;
        description: string;
        position: string;
        startDate: string;
        endDate: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { companyName: string; description: string; position: string; startDate: string; endDate: string }) => void;
}

const NewExperience = ({ id, name, content, onDelete, onUpdate }: NewExperienceProps) => {
    const [companyName, setCompanyName] = useState(content.companyName);
    const [description, setDescription] = useState(content.description);
    const [position, setPosition] = useState(content.position);
    const [startDate, setStartDate] = useState(content.startDate);
    const [endDate, setEndDate] = useState(content.endDate);

    return (
        <div className={styles.experience}>
            <h2 className={styles.experience__title}>{name}</h2>
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
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onUpdate({ companyName: companyName, description: description, position: position, startDate: startDate, endDate: endDate })}>Update</button>
            </div>
        </div>
    )
}

export { NewExperience };