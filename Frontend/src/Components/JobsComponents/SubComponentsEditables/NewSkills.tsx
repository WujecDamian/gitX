import { useState } from "react";
import styles from "./NewSkills.module.css";

type NewSkillsProps = {
    id: string;
    content: {
        skillName: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { skillName: string }) => void;
};

const NewSkills = ({ id, content, onDelete, onUpdate }: NewSkillsProps) => {
    const [isEditing, setIsEditing] = useState(content.skillName.trim() === "");
    const [skillName, setSkillName] = useState(content.skillName);

    const save = () => {
        onUpdate({ skillName });
        setIsEditing(false);
    };

    const cancel = () => {
        setSkillName(content.skillName);
        setIsEditing(false);
    };

    return (
        <div className={styles.skill}>
            {isEditing ? (
                <>
                    <div className={styles.skill__field}>
                        <label htmlFor={`${id}-skill-name`}>Skill</label>
                        <input id={`${id}-skill-name`} type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
                    </div>
                    <div className={styles.skill__actions}>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <p className={styles.skill__view}><span className={styles.skill__label}>Skill</span> {skillName || "No skill"}</p>
                    <div className={styles.skill__actions}>
                        <button type="button" onClick={() => onDelete(id)}>Delete</button>
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export { NewSkills };
