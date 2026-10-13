import { useState } from "react";

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
    onUpdate: (id: string, projectName: string, description: string, liveUrl: string, githubUrl: string, projectPictureUrl: string, tags: string[]) => void;
}

const NewProject = ({ id, name, content, onDelete, onUpdate }: NewProjectProps) => {
    const [projectName, setProjectName] = useState(content.projectName);
    const [description, setDescription] = useState(content.description);
    const [liveUrl, setLiveUrl] = useState(content.liveUrl);
    const [githubUrl, setGithubUrl] = useState(content.githubUrl);
    const [projectPictureUrl, setProjectPictureUrl] = useState(content.projectPictureUrl);
    const [tags, setTags] = useState(content.tags);
    return (
        <div>
            <h1>New Project</h1>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="text" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} />
            <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
            <input type="text" value={projectPictureUrl} onChange={(e) => setProjectPictureUrl(e.target.value)} />
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value.split(','))} />
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => onUpdate(id, projectName, description, liveUrl, githubUrl, projectPictureUrl, tags)}>Update</button>
        </div>
    )
}

export { NewProject };