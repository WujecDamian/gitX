import { useState } from "react";
import styles from "./NewEducation.module.css";

type EducationContent = {
    schoolName: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
};

type NewEducationProps = {
    id: string;
    content: EducationContent;
    onDelete: (id: string) => void;
    onUpdate: (content: EducationContent) => void;
};

const NewEducation = ({ id, content, onDelete, onUpdate }: NewEducationProps) => {
    const [isEditing, setIsEditing] = useState(content.schoolName.trim() === "");
    const [schoolName, setSchoolName] = useState(content.schoolName);
    const [degree, setDegree] = useState(content.degree);
    const [fieldOfStudy, setFieldOfStudy] = useState(content.fieldOfStudy);
    const [startDate, setStartDate] = useState(content.startDate);
    const [endDate, setEndDate] = useState(content.endDate);

    const save = () => {
        onUpdate({ schoolName, degree, fieldOfStudy, startDate, endDate });
        setIsEditing(false);
    };

    const cancel = () => {
        setSchoolName(content.schoolName);
        setDegree(content.degree);
        setFieldOfStudy(content.fieldOfStudy);
        setStartDate(content.startDate);
        setEndDate(content.endDate);
        setIsEditing(false);
    };

    return (
        <div className={styles.education}>
            {isEditing ? (
                <>
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
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.education__view}>
                        <p><span className={styles.education__label}>School</span> {schoolName || "No school"}</p>
                        <p><span className={styles.education__label}>Degree</span> {degree || "No degree"}</p>
                        <p><span className={styles.education__label}>Field</span> {fieldOfStudy || "No field of study"}</p>
                        <p><span className={styles.education__label}>Dates</span> {startDate || "?"} – {endDate || "?"}</p>
                    </div>
                    <div className={styles.education__actions}>
                        <button type="button" onClick={() => onDelete(id)}>Delete</button>
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export { NewEducation };
