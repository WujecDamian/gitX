import styles from "./CandidateProfile.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Contexts/Auth/AuthContext";
import { API_URL } from "../../../config";

type CandidateProfileProps = {
    candidateProfile?: CandidateProfile;
    profileVersion?: number;
    onSkip?: () => void;
    onSave?: () => void;
};

type ProjectSlide = {
    name?: string | null;
    projectName?: string | null;
    description?: string | null;
    project_picture_url?: string | null;
    projectPictureUrl?: string | null;
    tags?: string[] | null;
    live_url?: string | null;
    github_url?: string | null;
};

const shortBio = (bio: string) => {
    if (bio.length <= 90) return bio;
    return `${bio.slice(0, 90).trim()}...`;
};

const yesNo = (value: boolean) => (value ? "Yes" : "No");

const dateLabel = (value?: string | null) => (value ? value.slice(0, 10) : "");

const asHref = (value: string) => (
    value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`
);

export const CandidateProfile = ({ candidateProfile, profileVersion = 0, onSkip, onSave }: CandidateProfileProps) => {
    const { user } = useAuth();
    const [candidate, setCandidate] = useState<CandidateProfile | undefined>(candidateProfile);
    const [error, setError] = useState<string | null>(null);
    const [slide, setSlide] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const isRecruiterCard = Boolean(onSkip);

    useEffect(() => {
        if (isRecruiterCard) {
            setCandidate(candidateProfile);
            setSlide(0);
            setIsOpen(false);
            return;
        }
        const getCandidate = async () => {
            try {
                const response = await fetch(`${API_URL}/api/candidate/getCandidate/${user?.id}`, {
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
                setSlide(0);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };
        getCandidate();
    }, [isRecruiterCard, candidateProfile, user?.id, profileVersion]);

    if (error) {
        return <p className={styles.profile__message}>{error}</p>;
    }

    if (!candidate) {
        return <p className={styles.profile__message}>No candidate profile found</p>;
    }

    const projects = (candidate.projects ?? []) as ProjectSlide[];
    const slideCount = 1 + projects.length;
    const currentProject = slide === 0 ? null : projects[slide - 1];
    const projectName = currentProject?.name || currentProject?.projectName || "Project";
    const projectPicture = currentProject?.project_picture_url || currentProject?.projectPictureUrl || "";
    const picture = slide === 0 ? candidate.photo_url : projectPicture;
    const githubSocial = (candidate.socials ?? []).find((social) => social.toLowerCase().includes("github"));
    const circleLink = slide === 0
        ? githubSocial || (!isRecruiterCard ? user?.github_profile_url : "")
        : currentProject?.live_url;

    const showPrevious = () => {
        setSlide((current) => (current === 0 ? slideCount - 1 : current - 1));
    };

    const showNext = () => {
        setSlide((current) => (current === slideCount - 1 ? 0 : current + 1));
    };

    return (
        <div className={styles.profile}>
            {!isRecruiterCard && (
                <p className={styles.profile__preview}>This is how a recruiter will see your profile</p>
            )}
            <article
                className={styles.card}
                style={{ backgroundImage: picture ? `url(${picture})` : undefined }}
            >
                <div className={styles.card__shade}>
                    {slide === 0 ? (
                        <div className={styles.card__text}>
                            <h2 className={styles.card__name}>{candidate.name} {candidate.surname}</h2>
                            <p className={styles.card__bio}>{shortBio(candidate.bio ?? "")}</p>
                            {(candidate.skills ?? []).length > 0 && (
                                <ul className={styles.card__tags}>
                                    {(candidate.skills ?? []).slice(0, 3).map((skill) => (
                                        <li key={skill.id} className={styles.card__tag}>{skill.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className={styles.card__text}>
                            <h2 className={styles.card__name}>{projectName}</h2>
                            {currentProject?.description && (
                                <p className={styles.card__bio}>{shortBio(currentProject.description)}</p>
                            )}
                            {(currentProject?.tags ?? []).length > 0 && (
                                <ul className={styles.card__tags}>
                                    {(currentProject?.tags ?? []).map((tag) => (
                                        <li key={tag} className={styles.card__tag}>{tag}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
                {circleLink && (
                    <a
                        className={styles.card__link}
                        href={asHref(circleLink)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={slide === 0 ? "Open GitHub profile" : "Open live project"}
                    >
                        {slide === 0 ? (

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.48 2.865 8.28 6.839 9.63.5.092.682-.218.682-.483 0-.237-.009-.868-.013-1.703-2.782.615-3.369-1.343-3.369-1.343-.454-1.17-1.11-1.482-1.11-1.482-.908-.637.069-.624.069-.624 1.003.072 1.531 1.045 1.531 1.045.892 1.557 2.341 1.107 2.91.846.091-.658.349-1.107.636-1.362-2.22-.258-4.555-1.134-4.555-5.045 0-1.115.372-2.028.983-2.743-.099-.259-.426-1.3.093-2.708 0 0 .837-.278 2.75 1.048A9.146 9.146 0 0 1 12 6.844c.849.004 1.706.115 2.506.337 1.911-1.326 2.748-1.048 2.748-1.048.52 1.408.193 2.449.095 2.708.613.715.982 1.628.982 2.743 0 3.92-2.338 4.783-4.566 5.038.359.318.678.944.678 1.905 0 1.375-.012 2.484-.012 2.824 0 .268.18.58.688.482C19.138 20.534 22 16.7 22 12.26 22 6.58 17.522 2 12 2Z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </svg>
                        )

                        }
                    </a>
                )}
                {slideCount > 1 && (
                    <div className={styles.card__nav}>
                        <button type="button" className={styles.card__arrow} onClick={showPrevious} aria-label="Previous picture"><svg
                            xmlns="http://w3.org"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        </button>
                        <button type="button" className={styles.card__arrow} onClick={showNext} aria-label="Next picture"><svg
                            xmlns="http://w3.org"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                        </button>
                    </div>
                )}
            </article>
            {onSkip && (
                <div className={styles.profile__actions}>
                    {/* X button */}
                    <button type="button" className={`${styles.profile__action} ${styles.action__skip}`} onClick={onSkip}><svg
                        xmlns="http://w3.org"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                    </button>
                    {/* Heart button */}
                    {onSave && <button type="button" className={`${styles.profile__action} ${styles.action__save}`} onClick={onSave}><svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                    </button>}
                </div>
            )}
            <button type="button" className={styles.profile__open} onClick={() => setIsOpen((open) => !open)}>
                {isOpen ? "Close profile" : "Open profile"} ↑
            </button>
            {isOpen && (
                <section className={styles.details}>
                    <div className={styles.details__section}>
                        <h3>About</h3>
                        <p>{candidate.bio}</p>
                        <p className={styles.details__line}><span>Role</span><span>{candidate.role}</span></p>
                        <p className={styles.details__line}><span>Email</span><a href={`mailto:${candidate.email}`}>{candidate.email}</a></p>
                        <p className={styles.details__line}><span>Phone</span><a href={`tel:${candidate.phone}`}>{candidate.phone}</a></p>
                        <p className={styles.details__line}><span>Expected salary</span><span>{candidate.expected_salary} PLN</span></p>
                        <div className={styles.details__links}>
                            {(candidate.socials ?? []).map((social) => (
                                <a key={social} href={asHref(social)} target="_blank" rel="noreferrer">{social}</a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.details__section}>
                        <h3>Work preferences</h3>
                        <p className={styles.details__line}><span>Remote</span><span>{yesNo(candidate.wants_remote)}</span></p>
                        <p className={styles.details__line}><span>Onsite</span><span>{yesNo(candidate.wants_onsite)}</span></p>
                        <p className={styles.details__line}><span>Hybrid</span><span>{yesNo(candidate.wants_hybrid)}</span></p>
                        <p className={styles.details__line}><span>Part time</span><span>{yesNo(candidate.wants_part_time)}</span></p>
                        <p className={styles.details__line}><span>Full time</span><span>{yesNo(candidate.wants_full_time)}</span></p>
                        <p className={styles.details__line}><span>Employment contract</span><span>{yesNo(candidate.wants_employment_contract)}</span></p>
                        <p className={styles.details__line}><span>Mandate contract</span><span>{yesNo(candidate.wants_mandate_contract)}</span></p>
                        <p className={styles.details__line}><span>B2B contract</span><span>{yesNo(candidate.wants_b2b_contract)}</span></p>
                    </div>

                    <div className={styles.details__section}>
                        <h3>Projects</h3>
                        {projects.length === 0 && <p>{candidate.name} has no projects</p>}
                        {projects.map((project, index) => (
                            <div key={`${project.name ?? project.projectName}-${index}`} className={styles.details__row}>
                                <p>{project.name || project.projectName}</p>
                                <p>{project.description}</p>
                                <ul className={styles.details__tags}>
                                    {(project.tags ?? []).map((tag) => <li key={tag}>{tag}</li>)}
                                </ul>
                                {project.live_url && <a href={asHref(project.live_url)} target="_blank" rel="noreferrer">{project.live_url}</a>}
                                {project.github_url && <a href={asHref(project.github_url)} target="_blank" rel="noreferrer">{project.github_url}</a>}
                            </div>
                        ))}
                    </div>

                    <div className={styles.details__section}>
                        <h3>Experience</h3>
                        {(candidate.experience ?? []).length === 0 && <p>{candidate.name} has no experience</p>}
                        {(candidate.experience ?? []).map((item) => (
                            <div key={item.id} className={styles.details__row}>
                                <p>{item.position} at {item.company}</p>
                                <p>{item.description}</p>
                                <p>{dateLabel(item.start_date)} – {dateLabel(item.end_date)}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.details__section}>
                        <h3>Education</h3>
                        {(candidate.education ?? []).length === 0 && <p>{candidate.name} has no education</p>}
                        {(candidate.education ?? []).map((item) => (
                            <div key={item.id} className={styles.details__row}>
                                <p>{item.degree} at {item.school}</p>
                                <p>{item.field_of_study}</p>
                                <p>{dateLabel(item.start_date)} – {dateLabel(item.end_date)}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.details__section}>
                        <h3>Skills</h3>
                        {(candidate.skills ?? []).length === 0 && <p>{candidate.name} has no skills</p>}
                        <ul className={styles.details__tags}>
                            {(candidate.skills ?? []).map((item) => <li key={item.id}>{item.name}</li>)}
                        </ul>
                    </div>

                    <div className={styles.details__section}>
                        <h3>Certifications</h3>
                        {(candidate.certifications ?? []).length === 0 && <p>{candidate.name} has no certifications</p>}
                        {(candidate.certifications ?? []).map((item) => (
                            <div key={item.id} className={styles.details__row}>
                                <p>{item.name}</p>
                                <p>{item.description}</p>
                                <p>{dateLabel(item.start_date)} – {dateLabel(item.end_date)}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.details__section}>
                        <h3>Languages</h3>
                        {(candidate.languages ?? []).length === 0 && <p>{candidate.name} has no languages</p>}
                        <ul className={styles.details__tags}>
                            {(candidate.languages ?? []).map((item) => <li key={item.id}>{item.name} — {item.level}</li>)}
                        </ul>
                    </div>
                </section>
            )}
        </div>
    );
};
