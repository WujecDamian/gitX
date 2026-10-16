import { useState } from "react";
import styles from "./NewLanguages.module.css";

type NewLanguagesProps = {
    id: string;
    name: string;
    content: {
        languageName: string;
        level: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { languageName: string; level: string }) => void;
}

const NewLanguages = ({ id, name, content, onDelete, onUpdate }: NewLanguagesProps) => {
    const [languageName, setLanguageName] = useState(content.languageName);
    const [level, setLevel] = useState(content.level);

    return (
        <div className={styles.language}>
            <h2 className={styles.language__title}>{name}</h2>
            <div className={styles.language__field}>
                <label htmlFor={`${id}-language-name`}>Language</label>
                <input id={`${id}-language-name`} type="text" value={languageName} onChange={(e) => setLanguageName(e.target.value)} />
            </div>
            <div className={styles.language__field}>
                <label htmlFor={`${id}-language-level`}>Level</label>
                <input id={`${id}-language-level`} type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
            </div>
            <div className={styles.language__actions}>
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onUpdate({ languageName: languageName, level: level })}>Update</button>
            </div>
        </div>
    )
}

export { NewLanguages };