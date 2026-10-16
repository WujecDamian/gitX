import { useState } from "react";
import styles from "./NewSkills.module.css";

type NewSkillsProps = {
    id: string;
    name: string;
    content: {
        skillName: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { skillName: string }) => void;
}

const NewSkills = ({ id, name, content, onDelete, onUpdate }: NewSkillsProps) => {
    const [skillName, setSkillName] = useState(content.skillName);

    return (
        <div className={styles.skill}>
            <h2 className={styles.skill__title}>{name}</h2>
            <div className={styles.skill__field}>
                <label htmlFor={`${id}-skill-name`}>Skill</label>
                <input id={`${id}-skill-name`} type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} />
            </div>
            <div className={styles.skill__actions}>
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onUpdate({ skillName: skillName })}>Update</button>
            </div>
        </div>
    )
}

export { NewSkills };