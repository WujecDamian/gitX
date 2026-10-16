import { useState } from "react";
import styles from "./NewProject.module.css";

type NewProjectProps = {
    id: string;
    name: string;
    content: {
        projectName: string;
        description: string;
        liveUrl: string;
        githubUrl: string;
        projectPictureUrl: string;
        tags: string[];
    };
    onDelete: (id: string) => void;
    onUpdate: (content: { projectName: string; description: string; liveUrl: string; githubUrl: string; projectPictureUrl: string; tags: string[] }) => void;
}

const NewProject = ({ id, name, content, onDelete, onUpdate }: NewProjectProps) => {
    const [projectName, setProjectName] = useState(content.projectName);
    const [description, setDescription] = useState(content.description);
    const [liveUrl, setLiveUrl] = useState(content.liveUrl);
    const [githubUrl, setGithubUrl] = useState(content.githubUrl);
    const [projectPictureUrl, setProjectPictureUrl] = useState(content.projectPictureUrl);
    const [tags, setTags] = useState(content.tags);

    return (
        <div className={styles.project}>
            <h2 className={styles.project__title}>{name}</h2>
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
                <input id={`${id}-project-tags`} type="text" value={tags} onChange={(e) => setTags(e.target.value.split(','))} />
            </div>
            <div className={styles.project__actions}>
                <button onClick={() => onDelete(id)}>Delete</button>
                <button onClick={() => onUpdate({ projectName: projectName, description: description, liveUrl: liveUrl, githubUrl: githubUrl, projectPictureUrl: projectPictureUrl, tags: tags })}>Update</button>
            </div>
        </div>
    )
}

export { NewProject };