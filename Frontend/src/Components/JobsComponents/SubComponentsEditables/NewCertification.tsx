import { useState } from "react";
import styles from "./NewCertification.module.css";

type NewCertificationProps = {
    id: string;
    name: string;
    content: {
        certificationName: string;
        description: string;
        startDate: string;
        endDate: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { certificationName: string; description: string; startDate: string; endDate: string }) => void;
}

const NewCertification = ({ id, name, content, onDelete, onUpdate }: NewCertificationProps) => {
    const [certificationName, setCertificationName] = useState(content.certificationName);
    const [description, setDescription] = useState(content.description);
    const [startDate, setStartDate] = useState(content.startDate);
    const [endDate, setEndDate] = useState(content.endDate);

    return (
        <div className={styles.certification}>
            <h2 className={styles.certification__title}>{name}</h2>
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
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onUpdate({ certificationName: certificationName, description: description, startDate: startDate, endDate: endDate })}>Update</button>
            </div>
        </div>
    )
}

export { NewCertification };