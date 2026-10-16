import { useState } from "react";
import styles from "./NewLanguages.module.css";

type NewLanguagesProps = {
    id: string;
    content: {
        languageName: string;
        level: string;
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { languageName: string; level: string }) => void;
};

const NewLanguages = ({ id, content, onDelete, onUpdate }: NewLanguagesProps) => {
    const [isEditing, setIsEditing] = useState(content.languageName.trim() === "");
    const [languageName, setLanguageName] = useState(content.languageName);
    const [level, setLevel] = useState(content.level);

    const save = () => {
        onUpdate({ languageName, level });
        setIsEditing(false);
    };

    const cancel = () => {
        setLanguageName(content.languageName);
        setLevel(content.level);
        setIsEditing(false);
    };

    return (
        <div className={styles.language}>
            {isEditing ? (
                <>
                    <div className={styles.language__field}>
                        <label htmlFor={`${id}-language-name`}>Language</label>
                        <input id={`${id}-language-name`} type="text" value={languageName} onChange={(e) => setLanguageName(e.target.value)} />
                    </div>
                    <div className={styles.language__field}>
                        <label htmlFor={`${id}-language-level`}>Level</label>
                        <input id={`${id}-language-level`} type="text" value={level} onChange={(e) => setLevel(e.target.value)} />
                    </div>
                    <div className={styles.language__actions}>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.language__view}>
                        <p><span className={styles.language__label}>Language</span> {languageName || "No language"}</p>
                        <p><span className={styles.language__label}>Level</span> {level || "No level"}</p>
                    </div>
                    <div className={styles.language__actions}>
                        <button type="button" onClick={() => onDelete(id)}>Delete</button>
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export { NewLanguages };
