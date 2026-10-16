import { useState } from "react";
import styles from "./NewCertification.module.css";

type CertificationContent = {
    certificationName: string;
    description: string;
    startDate: string;
    endDate: string;
};

type NewCertificationProps = {
    id: string;
    content: CertificationContent;
    onDelete: (id: string) => void;
    onUpdate: (content: CertificationContent) => void;
};

const NewCertification = ({ id, content, onDelete, onUpdate }: NewCertificationProps) => {
    const [isEditing, setIsEditing] = useState(content.certificationName.trim() === "");
    const [certificationName, setCertificationName] = useState(content.certificationName);
    const [description, setDescription] = useState(content.description);
    const [startDate, setStartDate] = useState(content.startDate);
    const [endDate, setEndDate] = useState(content.endDate);

    const save = () => {
        onUpdate({ certificationName, description, startDate, endDate });
        setIsEditing(false);
    };

    const cancel = () => {
        setCertificationName(content.certificationName);
        setDescription(content.description);
        setStartDate(content.startDate);
        setEndDate(content.endDate);
        setIsEditing(false);
    };

    return (
        <div className={styles.certification}>
            {isEditing ? (
                <>
                    <div className={styles.certification__field}>
                        <label htmlFor={`${id}-certification-name`}>Certification</label>
                        <input id={`${id}-certification-name`} type="text" value={certificationName} onChange={(e) => setCertificationName(e.target.value)} />
                    </div>
                    <div className={styles.certification__field}>
                        <label htmlFor={`${id}-certification-description`}>Description</label>
                        <input id={`${id}-certification-description`} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className={styles.certification__dates}>
                        <div className={styles.certification__field}>
                            <label htmlFor={`${id}-certification-start`}>Start date</label>
                            <input id={`${id}-certification-start`} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div className={styles.certification__field}>
                            <label htmlFor={`${id}-certification-end`}>End date</label>
                            <input id={`${id}-certification-end`} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.certification__actions}>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.certification__view}>
                        <p><span className={styles.certification__label}>Name</span> {certificationName || "No certification"}</p>
                        <p><span className={styles.certification__label}>Description</span> {description || "No description"}</p>
                        <p><span className={styles.certification__label}>Dates</span> {startDate || "?"} – {endDate || "?"}</p>
                    </div>
                    <div className={styles.certification__actions}>
                        <button type="button" onClick={() => onDelete(id)}>Delete</button>
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export { NewCertification };
