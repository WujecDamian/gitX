import { Link } from "react-router-dom";
import styles from "./CandidateSidebar.module.css";
import { Component, useEffect, useState } from "react";
import { API_URL } from "../../../config";
import { ErrorMessage } from "../../../Components/UI/ErrorMessage/ErrorMessage";
//New (project/experience...) imports
import { NewProject } from "../../../Components/JobsComponents/SubComponentsEditables/NewProject";
import { NewExperience } from "../../../Components/JobsComponents/SubComponentsEditables/NewExperience";
import { NewEducation } from "../../../Components/JobsComponents/SubComponentsEditables/NewEducation";
import { NewSkills } from "../../../Components/JobsComponents/SubComponentsEditables/NewSkills";
import { NewCertification } from "../../../Components/JobsComponents/SubComponentsEditables/NewCertification";
import { NewLanguages } from "../../../Components/JobsComponents/SubComponentsEditables/NewLanguages";
type CandidateSidebarProps = {
  userId: string | undefined;
  onSaved: () => void;
}

export const CandidateSidebar = ({ userId, onSaved }: CandidateSidebarProps) => {

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
    setName(candidate?.name ?? "");
    setSurname(candidate?.surname ?? "");
    setEmail(candidate?.email ?? "");
    setPhone(candidate?.phone ?? "");
    setBio(candidate?.bio ?? "");
    setExpectedSalary(candidate?.expected_salary ?? 10000);
    setWantsRemote(candidate?.wants_remote ?? false);
    setWantsOnsite(candidate?.wants_onsite ?? false);
    setWantsHybrid(candidate?.wants_hybrid ?? false);
    setWantsPartTime(candidate?.wants_part_time ?? false);
    setWantsFullTime(candidate?.wants_full_time ?? false);
    setWantsEmploymentContract(candidate?.wants_employment_contract ?? false);
    setWantsMandateContract(candidate?.wants_mandate_contract ?? false);
    setWantsB2bContract(candidate?.wants_b2b_contract ?? false);
    setRole(candidate?.role ?? "");
    setSocials(candidate?.socials ?? []);
    setPhotoUrl(candidate?.photo_url ?? "");
    setProjects(candidate?.projects ?? []);
    setExperience(candidate?.experience ?? []);
    setEducation(candidate?.education ?? []);
    setSkills(candidate?.skills ?? []);
    setCertifications(candidate?.certifications ?? []);
    setLanguages(candidate?.languages ?? []);

    // The database uses snake_case. The form cards use camelCase. This copies each saved row into a card.
    const dateForInput = (value: string | null | undefined) => value ? value.slice(0, 10) : "";
    const savedProjects = (candidate?.projects ?? []) as {
      id?: string;
      name?: string | null;
      description?: string | null;
      live_url?: string | null;
      github_url?: string | null;
      project_picture_url?: string | null;
      tags?: string[];
    }[];
    const savedExperience = (candidate?.experience ?? []) as {
      id?: string;
      company?: string | null;
      description?: string | null;
      position?: string | null;
      start_date?: string | null;
      end_date?: string | null;
    }[];
    const savedEducation = (candidate?.education ?? []) as {
      id?: string;
      school?: string | null;
      degree?: string | null;
      field_of_study?: string | null;
      start_date?: string | null;
      end_date?: string | null;
    }[];
    const savedSkills = (candidate?.skills ?? []) as { id?: string; name?: string | null }[];
    const savedCertifications = (candidate?.certifications ?? []) as {
      id?: string;
      name?: string | null;
      description?: string | null;
      start_date?: string | null;
      end_date?: string | null;
    }[];
    const savedLanguages = (candidate?.languages ?? []) as { id?: string; name?: string | null; level?: string | null }[];

    setComponentsList([
      ...savedProjects.map((project) => ({
        id: project.id ?? crypto.randomUUID(),
        name: "project",
        content: {
          projectName: project.name ?? "",
          description: project.description ?? "",
          liveUrl: project.live_url ?? "",
          githubUrl: project.github_url ?? "",
          projectPictureUrl: project.project_picture_url ?? "",
          tags: project.tags ?? [],
        },
      })),
      ...savedExperience.map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        name: "experience",
        content: {
          companyName: item.company ?? "",
          description: item.description ?? "",
          position: item.position ?? "",
          startDate: dateForInput(item.start_date),
          endDate: dateForInput(item.end_date),
        },
      })),
      ...savedEducation.map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        name: "education",
        content: {
          schoolName: item.school ?? "",
          degree: item.degree ?? "",
          fieldOfStudy: item.field_of_study ?? "",
          startDate: dateForInput(item.start_date),
          endDate: dateForInput(item.end_date),
        },
      })),
      ...savedSkills.map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        name: "skills",
        content: { skillName: item.name ?? "" },
      })),
      ...savedCertifications.map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        name: "certifications",
        content: {
          certificationName: item.name ?? "",
          description: item.description ?? "",
          startDate: dateForInput(item.start_date),
          endDate: dateForInput(item.end_date),
        },
      })),
      ...savedLanguages.map((item) => ({
        id: item.id ?? crypto.randomUUID(),
        name: "languages",
        content: {
          languageName: item.name ?? "",
          level: item.level ?? "",
        },
      })),
    ]);
  }, [candidate]);

  //updating each rows basing on componentsList, places in correct 'buckets'
  useEffect(() => {
    //zaczynamy z pustymi zeby dzialalo tez usuwanie ezezez
    const nextProjects: Project[] = [];
    const nextExperience: Experience[] = [];
    const nextEducation: Education[] = [];
    const nextSkills: Skill[] = [];
    const nextCertifications: Certification[] = [];
    const nextLanguages: Language[] = [];

    //sprawdzamy kazdy komponent (jego nazwe i dodajemy do tymczasowej tablicy (nie moze byc np. setProjects bo nie dochodzi do rerenderu))
    for (const component of componentsList) {
      if (component.name === "project") {
        nextProjects.push(component.content as Project);
      }
      if (component.name === "experience") {
        nextExperience.push(component.content as Experience);
      }
      if (component.name === "education") {
        nextEducation.push(component.content as Education);
      }
      if (component.name === "skills") {
        nextSkills.push(component.content as Skill);
      }
      if (component.name === "certifications") {
        nextCertifications.push(component.content as Certification);
      }
      if (component.name === "languages") {
        nextLanguages.push(component.content as Language);
      }
    }

    setProjects(nextProjects);
    setExperience(nextExperience);
    setEducation(nextEducation);
    setSkills(nextSkills);
    setCertifications(nextCertifications);
    setLanguages(nextLanguages);
  }, [componentsList]);

  type componentType = {
    id: string,
    name: string,
    content: any
  }
  //adding/updating/deleting components
  const addComponent = (name: string, content: object) => {
    const id = self.crypto.randomUUID();
    setComponentsList([...componentsList, { id, name, content }]);
  }

  const deleteComponent = (id: string) => {
    setComponentsList(componentsList.filter((component) => component.id !== id));
  }
  const updateComponent = (id: string, content: object = {}) => {
    console.log("Updating component", id, content);
    setComponentsList(componentsList.map((component) => component?.id === id ? { ...component, content } : component));
    console.log("Components list after update", componentsList);
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
      onSaved();
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
          <div className={styles.candidate__section}>
            <label htmlFor="projects">Projects</label>
            {componentsList.map((component) => component.name === "project" ? <NewProject key={component.id} id={component.id} name={component.name} content={component.content} onDelete={() => deleteComponent(component.id)} onUpdate={(content) => updateComponent(component.id, content)} /> : null)}
            <button onClick={() => addComponent("project", { projectName: "", description: "", liveUrl: "", githubUrl: "", projectPictureUrl: "", tags: [] })}>Add Project</button>
          </div>
          <div className={styles.candidate__section}>
            <label htmlFor="experience">Experience</label>
            {componentsList.map((component) => component.name === "experience" ? <NewExperience key={component.id} id={component.id} name={component.name} content={component.content} onDelete={() => deleteComponent(component.id)} onUpdate={(content) => updateComponent(component.id, content)} /> : null)}
            <button onClick={() => addComponent("experience", { companyName: "", description: "", position: "", startDate: "", endDate: "" })}>Add Experience</button>
          </div>
          <div className={styles.candidate__section}>
            <label htmlFor="education">Education</label>
            {componentsList.map((component) => component.name === "education" ? <NewEducation key={component.id} id={component.id} name={component.name} content={component.content} onDelete={() => deleteComponent(component.id)} onUpdate={(content) => updateComponent(component.id, content)} /> : null)}
            <button onClick={() => addComponent("education", { schoolName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" })}>Add Education</button>
          </div>
          <div className={styles.candidate__section}>
            <label htmlFor="skills">Skills</label>
            {componentsList.map((component) => component.name === "skills" ? <NewSkills key={component.id} id={component.id} name={component.name} content={component.content} onDelete={() => deleteComponent(component.id)} onUpdate={(content) => updateComponent(component.id, content)} /> : null)}
            <button onClick={() => addComponent("skills", { skillName: "" })}>Add Skill</button>
          </div>
          <div className={styles.candidate__section}>
            <label htmlFor="certifications">Certifications</label>
            {componentsList.map((component) => component.name === "certifications" ? <NewCertification key={component.id} id={component.id} name={component.name} content={component.content} onDelete={() => deleteComponent(component.id)} onUpdate={(content) => updateComponent(component.id, content)} /> : null)}
            <button onClick={() => addComponent("certifications", { certificationName: "", description: "", startDate: "", endDate: "" })}>Add Certification</button>
          </div>
          <div className={styles.candidate__section}>
            <label htmlFor="languages">Languages</label>
            {componentsList.map((component) => component.name === "languages" ? <NewLanguages key={component.id} id={component.id} name={component.name} content={component.content} onDelete={() => deleteComponent(component.id)} onUpdate={(content) => updateComponent(component.id, content)} /> : null)}
            <button onClick={() => addComponent("languages", { languageName: "", level: "" })}>Add Language</button>
          </div>




        </section>
        <section className={styles.candidate__actions}>
          <div className={styles.candidate__actions__button}>
            <button className={styles.candidate__actions__button__save} onClick={handleSave}>Save</button>
          </div>
        </section>
      </aside>
    </>
  ));
}
