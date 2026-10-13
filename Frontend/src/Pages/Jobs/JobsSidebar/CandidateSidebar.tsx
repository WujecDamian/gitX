import { Link } from "react-router-dom";
import styles from "./CandidateSidebar.module.css";
import { Component, useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { ErrorMessage } from "../../../Components/UI/ErrorMessage/ErrorMessage";
//New (project/experience...) imports
import { NewProject } from "../../../Components/JobsComponents/SubComponentsEditables/NewProject";

type CandidateSidebarProps = {
  userId: string | undefined;
}

export const CandidateSidebar = ({ userId }: CandidateSidebarProps) => {

  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState(candidate?.name ?? "");
  const [surname, setSurname] = useState(candidate?.surname ?? "");
  const [email, setEmail] = useState(candidate?.email ?? "");
  const [phone, setPhone] = useState(candidate?.phone ?? "");
  const [bio, setBio] = useState(candidate?.bio ?? "");
  const [expected_salary, setExpectedSalary] = useState(candidate?.expected_salary ?? 10000);
  const [wants_remote, setWantsRemote] = useState(candidate?.wants_remote ?? false);
  const [wants_onsite, setWantsOnsite] = useState(candidate?.wants_onsite ?? false);
  const [wants_hybrid, setWantsHybrid] = useState(candidate?.wants_hybrid ?? false);
  const [wants_part_time, setWantsPartTime] = useState(candidate?.wants_part_time ?? false);
  const [wants_full_time, setWantsFullTime] = useState(candidate?.wants_full_time ?? false);
  const [wants_employment_contract, setWantsEmploymentContract] = useState(candidate?.wants_employment_contract ?? false);
  const [wants_mandate_contract, setWantsMandateContract] = useState(candidate?.wants_mandate_contract ?? false);
  const [wants_b2b_contract, setWantsB2bContract] = useState(candidate?.wants_b2b_contract ?? false);
  const [role, setRole] = useState(candidate?.role ?? "");
  const [socials, setSocials] = useState(candidate?.socials ?? []);
  const [photoUrl, setPhotoUrl] = useState(candidate?.photo_url ?? "");
  const [projects, setProjects] = useState(candidate?.projects ?? []);
  const [experience, setExperience] = useState(candidate?.experience ?? []);
  const [education, setEducation] = useState(candidate?.education ?? []);
  const [skills, setSkills] = useState(candidate?.skills ?? []);
  const [certifications, setCertifications] = useState(candidate?.certifications ?? []);
  const [languages, setLanguages] = useState(candidate?.languages ?? []);
  //Components list to render them 
  const [componentsList, setComponentsList] = useState<componentType[]>([]);
  useEffect(() => {
    const getCandidate = async () => {
      try {
        const response = await fetch(`${API_URL}/api/candidate/getCandidate/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("No candidate profile found");
        }
        const data = await response.json();
        setCandidate(data.candidateProfile);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    };
    getCandidate();
  }, []);

  useEffect(() => {
    console.log(componentsList);
    componentsList.forEach((component) => {
      if (component.name === "project") {
        setProjects([...projects, component.content as Project]);
      }
      if (component.name === "experience") {
        setExperience([...experience, component.content as Experience]);
      }
      if (component.name === "education") {
        setEducation([...education, component.content as Education]);
      }
      if (component.name === "skills") {
        setSkills([...skills, component.content as Skill]);
      }
      if (component.name === "certifications") {
        setCertifications([...certifications, component.content as Certification]);
      }
      if (component.name === "languages") {
        setLanguages([...languages, component.content as Language]);
      }
    });
  }, [componentsList]);

  type componentType = {
    id: string,
    name: string,
    content: object
  }
  //adding/updating/deleting components
  const addComponent = (name: string, content: object) => {
    const id = self.crypto.randomUUID();
    setComponentsList([...componentsList, { id, name, content }]);
  }

  const deleteComponent = (id: string) => {
    setComponentsList(componentsList.filter((component) => component.id !== id));
  }
  const updateComponent = (id: string, name: string, content: object = {}) => {
    setComponentsList(componentsList.map((component) => component?.id === id ? { ...component, name, content } : component));
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/api/candidate/updateCandidate/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          surname,
          email,
          phone,
          bio,
          expected_salary,
          wants_remote,
          wants_onsite,
          wants_hybrid,
          wants_part_time,
          wants_full_time,
          wants_employment_contract,
          wants_mandate_contract,
          wants_b2b_contract,
          role,
          socials,
          photo_url: photoUrl,
          projects,
          experience,
          education,
          skills,
          certifications,
          languages,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to save candidate profile");
      }
      const data = await response.json();

      setCandidate(data.updatedCandidate);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  }


  return (error ? (<ErrorMessage error={error} />) : (
    <>
      <aside className={styles.candidate__sidebar}>
        <h1 className={styles.candidate__sidebar__title}>Your Candidate Profile</h1>
        <section className={styles.candidate__details}>
          <div className={styles.candidate__details__container}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="surname">Surname</label>
            <input type="text" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <label htmlFor="bio">Bio</label>
          </div>
          <textarea className={styles.bio} maxLength={500} id="bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          <div className={styles.expected_salary__container}>
            <label htmlFor="expected_salary">Expected Salary (in PLN)</label>
            <p>{expected_salary} PLN</p>
            <input type="range" min={4000} max={40000} step={100} id="expected_salary" value={expected_salary} onChange={(e) => setExpectedSalary(parseInt(e.target.value))} />
          </div>
          <div className={styles.work__model__container}>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_remote">Wants Remote</label>
              <input type="checkbox" id="wants_remote" checked={wants_remote} onChange={(e) => setWantsRemote(e.target.checked)} />
            </div>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_onsite">Wants Onsite</label>
              <input type="checkbox" id="wants_onsite" checked={wants_onsite} onChange={(e) => setWantsOnsite(e.target.checked)} />
            </div>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_hybrid">Wants Hybrid</label>
              <input type="checkbox" id="wants_hybrid" checked={wants_hybrid} onChange={(e) => setWantsHybrid(e.target.checked)} />
            </div>
          </div>
          <div className={styles.work__availability__container}>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_part_time">Wants Part Time</label>
              <input type="checkbox" id="wants_part_time" checked={wants_part_time} onChange={(e) => setWantsPartTime(e.target.checked)} />
            </div>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_full_time">Wants Full Time</label>
              <input type="checkbox" id="wants_full_time" checked={wants_full_time} onChange={(e) => setWantsFullTime(e.target.checked)} />
            </div>
          </div>
          <div className={styles.work__contract__container}>

            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_employment_contract">Wants Employment Contract</label>
              <input type="checkbox" id="wants_employment_contract" checked={wants_employment_contract} onChange={(e) => setWantsEmploymentContract(e.target.checked)} />
            </div>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_mandate_contract">Wants Mandate Contract</label>
              <input type="checkbox" id="wants_mandate_contract" checked={wants_mandate_contract} onChange={(e) => setWantsMandateContract(e.target.checked)} />
            </div>
            <div className={styles.checkbox__divider}>
              <label htmlFor="wants_b2b_contract">Wants B2B Contract</label>
              <input type="checkbox" id="wants_b2b_contract" checked={wants_b2b_contract} onChange={(e) => setWantsB2bContract(e.target.checked)} />
            </div>
          </div>
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
            <option value="DevOps">DevOps</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="AI">AI/GenAI</option>


          </select>
          <label htmlFor="socials">Socials (comma separated)</label>
          <input type="text" id="socials" value={socials} onChange={(e) => setSocials(e.target.value.split(','))} />
          <label htmlFor="photoUrl">Photo URL</label>
          <input type="text" id="photoUrl" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          <label htmlFor="projects">Projects</label>
          <p>section here for projects</p>
          {componentsList.map((component) => component.name === "project" ? <NewProject key={component.id} id={component.id} name={component.name} content={{ projectName: "", description: "", liveUrl: "", githubUrl: "", projectPictureUrl: "", tags: [] }} onDelete={() => deleteComponent(component.id)} onUpdate={() => updateComponent(component.id, component.name, component.content)} /> : null)}
          <button onClick={() => addComponent("project", { projectName: "", description: "", liveUrl: "", githubUrl: "", projectPictureUrl: "", tags: [] })}>Add Project</button>
          <label htmlFor="experience">Experience</label>
          <p>section here for experience</p>
          <label htmlFor="education">Education</label>
          <p>section here for education</p>
          <label htmlFor="skills">Skills</label>
          <p>section here for skills</p>
          <label htmlFor="certifications">Certifications</label>
          <p>section here for certifications</p>

          <label htmlFor="languages">Languages</label>
          <p>section here for languages</p>
          <label htmlFor="projects">Projects</label>
          <p>section here for projects</p>



        </section>
        <section className={styles.candidate__actions}>
          <button className={styles.candidate__actions__button}>
            <button className={styles.candidate__actions__button__save} onClick={handleSave}>Save</button>
          </button>
        </section>
      </aside>
    </>
  ));
}
