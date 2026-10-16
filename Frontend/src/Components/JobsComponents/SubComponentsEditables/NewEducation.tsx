import { useState } from "react";
import styles from "./NewEducation.module.css";

type NewEducationProps = {
    id: string;
    name: string;
    content: {
        schoolName: string;
        degree: string;
        fieldOfStudy: string;
        startDate: string;
        endDate: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { schoolName: string; degree: string; fieldOfStudy: string; startDate: string; endDate: string }) => void;
}

const NewEducation = ({ id, name, content, onDelete, onUpdate }: NewEducationProps) => {
    const [schoolName, setSchoolName] = useState(content.schoolName);
    const [degree, setDegree] = useState(content.degree);
    const [fieldOfStudy, setFieldOfStudy] = useState(content.fieldOfStudy);
    const [startDate, setStartDate] = useState(content.startDate);
    const [endDate, setEndDate] = useState(content.endDate);
    return (
        <div className={styles.education}>
            <h2 className={styles.education__title}>{name}</h2>
            <div className={styles.education__field}>
                <label htmlFor={`${id}-education-school`}>School</label>
                <input id={`${id}-education-school`} type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
            </div>
            <div className={styles.education__field}>
                <label htmlFor={`${id}-education-degree`}>Degree</label>
                <input id={`${id}-education-degree`} type="text" value={degree} onChange={(e) => setDegree(e.target.value)} />
            </div>
            <div className={styles.education__field}>
                <label htmlFor={`${id}-education-field`}>Field of study</label>
                <input id={`${id}-education-field`} type="text" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
            </div>
            <div className={styles.education__dates}>
                <div className={styles.education__field}>
                    <label htmlFor={`${id}-education-start`}>Start date</label>
                    <input id={`${id}-education-start`} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className={styles.education__field}>
                    <label htmlFor={`${id}-education-end`}>End date</label>
                    <input id={`${id}-education-end`} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
            <div className={styles.education__actions}>
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onUpdate({ schoolName: schoolName, degree: degree, fieldOfStudy: fieldOfStudy, startDate: startDate, endDate: endDate })}>Update</button>
            </div>
        </div>
    )
}

export { NewEducation };