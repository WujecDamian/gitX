import { useState } from "react";
import styles from "./NewProject.module.css";

type ProjectContent = {
    projectName: string;
    description: string;
    liveUrl: string;
    githubUrl: string;
    projectPictureUrl: string;
    tags: string[];
};

type NewProjectProps = {
    id: string;
    content: ProjectContent;
    onDelete: (id: string) => void;
    onUpdate: (content: ProjectContent) => void;
};

const NewProject = ({ id, content, onDelete, onUpdate }: NewProjectProps) => {
    const [isEditing, setIsEditing] = useState(content.projectName.trim() === "");
    const [projectName, setProjectName] = useState(content.projectName);
    const [description, setDescription] = useState(content.description);
    const [liveUrl, setLiveUrl] = useState(content.liveUrl);
    const [githubUrl, setGithubUrl] = useState(content.githubUrl);
    const [projectPictureUrl, setProjectPictureUrl] = useState(content.projectPictureUrl);
    const [tags, setTags] = useState(content.tags);

    const save = () => {
        onUpdate({ projectName, description, liveUrl, githubUrl, projectPictureUrl, tags });
        setIsEditing(false);
    };

    const cancel = () => {
        setProjectName(content.projectName);
        setDescription(content.description);
        setLiveUrl(content.liveUrl);
        setGithubUrl(content.githubUrl);
        setProjectPictureUrl(content.projectPictureUrl);
        setTags(content.tags);
        setIsEditing(false);
    };

    return (
        <div className={styles.project}>
            {isEditing ? (
                <>
                    <div className={styles.project__field}>
                        <label htmlFor={`${id}-project-name`}>Project name</label>
                        <input id={`${id}-project-name`} type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                    </div>
                    <div className={styles.project__field}>
                        <label htmlFor={`${id}-project-description`}>Description</label>
                        <input id={`${id}-project-description`} type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className={styles.project__field}>
                        <label htmlFor={`${id}-project-live-url`}>Live URL</label>
                        <input id={`${id}-project-live-url`} type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
                    </div>
                    <div className={styles.project__field}>
                        <label htmlFor={`${id}-project-github-url`}>GitHub URL</label>
                        <input id={`${id}-project-github-url`} type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                    </div>
                    <div className={styles.project__field}>
                        <label htmlFor={`${id}-project-picture-url`}>Picture URL</label>
                        <input id={`${id}-project-picture-url`} type="text" value={projectPictureUrl} onChange={(e) => setProjectPictureUrl(e.target.value)} />
                    </div>
                    <div className={styles.project__field}>
                        <label htmlFor={`${id}-project-tags`}>Tags (comma separated)</label>
                        <input id={`${id}-project-tags`} type="text" value={tags} onChange={(e) => setTags(e.target.value.split(","))} />
                    </div>
                    <div className={styles.project__actions}>
                        <button type="button" onClick={cancel}>Cancel</button>
                        <button type="button" onClick={save}>Save</button>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.project__view}>
                        <p><span className={styles.project__label}>Name</span> {projectName || "No name"}</p>
                        <p><span className={styles.project__label}>Description</span> {description || "No description"}</p>
                        <p><span className={styles.project__label}>Live</span> {liveUrl || "No live URL"}</p>
                        <p><span className={styles.project__label}>GitHub</span> {githubUrl || "No GitHub URL"}</p>
                        <p><span className={styles.project__label}>Picture</span> {projectPictureUrl || "No picture URL"}</p>
                        <p><span className={styles.project__label}>Tags</span> {tags.filter(Boolean).join(", ") || "No tags"}</p>
                    </div>
                    <div className={styles.project__actions}>
                        <button type="button" onClick={() => onDelete(id)}>Delete</button>
                        <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            )}
        </div>
    );
};

export { NewProject };
