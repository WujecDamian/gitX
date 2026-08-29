import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import styles from "./EditProfileModal.module.css";
import { API_URL } from "../../../config";
import { ErrorMessage } from "../../UI/ErrorMessage/ErrorMessage";
import { catalogSkills, skillGroups } from "./skillGroups";

type EditProfileModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  owner: User;
  onProfileUpdated: () => Promise<void> | void;
};

const joinList = (items?: string[]) => (items ?? []).join(", ");

const splitList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

const extraSkills = (selected: string[]) =>
  selected.filter((skill) => !catalogSkills.includes(skill));

export const EditProfileModal = ({
  isOpen,
  setIsOpen,
  owner,
  onProfileUpdated,
}: EditProfileModalProps) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState(owner.display_name);
  const [bio, setBio] = useState(owner.bio ?? "");
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    owner.profile_picture_url ?? "",
  );
  const [bannerPictureUrl, setBannerPictureUrl] = useState(
    owner.banner_picture_url ?? "",
  );
  const [tags, setTags] = useState<string[]>(owner.tags ?? []);
  const [socials, setSocials] = useState(joinList(owner.socials));
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    setError(null);
    setDisplayName(owner.display_name);
    setBio(owner.bio ?? "");
    setProfilePictureUrl(owner.profile_picture_url ?? "");
    setBannerPictureUrl(owner.banner_picture_url ?? "");
    setTags(owner.tags ?? []);
    setSocials(joinList(owner.socials));
  }, [isOpen, owner]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsOpen]);

  const toggleSkill = (skill: string) => {
    setTags((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill],
    );
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const bodyData = {
      display_name: displayName,
      bio,
      profile_picture_url: profilePictureUrl,
      banner_picture_url: bannerPictureUrl,
      tags,
      socials: splitList(socials),
    };

    try {
      const response = await fetch(`${API_URL}/api/user/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bodyData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      await onProfileUpdated();
      setIsOpen(false);
    } catch (submitError) {
      if (submitError instanceof Error) {
        setError(submitError.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const customSkills = extraSkills(tags);

  return (
    <div className={styles.edit__modal} ref={modalRef}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Edit profile</h2>
          <button
            type="button"
            className={styles.close__btn}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        <label className={styles.field}>
          Display name
          <input
            name="display_name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        </label>

        <label className={styles.field}>
          Bio
          <textarea
            name="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            rows={4}
          />
        </label>

        <label className={styles.field}>
          Profile picture URL
          <input
            name="profile_picture_url"
            value={profilePictureUrl}
            onChange={(event) => setProfilePictureUrl(event.target.value)}
          />
        </label>

        <label className={styles.field}>
          Banner picture URL
          <input
            name="banner_picture_url"
            value={bannerPictureUrl}
            onChange={(event) => setBannerPictureUrl(event.target.value)}
          />
        </label>

        <fieldset className={styles.skills}>
          <legend className={styles.skills__legend}>Skills</legend>
          {customSkills.length > 0 && (
            <div className={styles.skills__group}>
              <h3 className={styles.skills__heading}>Already on your profile</h3>
              <div className={styles.skills__list}>
                {customSkills.map((skill) => (
                  <label className={styles.skills__item} key={skill}>
                    <input
                      type="checkbox"
                      checked={tags.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
          )}
          {skillGroups.map((group) => (
            <div className={styles.skills__group} key={group.name}>
              <h3 className={styles.skills__heading}>{group.name}</h3>
              <div className={styles.skills__list}>
                {group.skills.map((skill) => (
                  <label className={styles.skills__item} key={skill}>
                    <input
                      type="checkbox"
                      checked={tags.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </fieldset>

        <label className={styles.field}>
          Socials (comma separated)
          <input
            name="socials"
            value={socials}
            onChange={(event) => setSocials(event.target.value)}
          />
        </label>

        <div className={styles.modal__footer}>
          <input
            type="submit"
            value={loading ? "Saving..." : "Save"}
            disabled={loading}
          />
        </div>
        {error && <ErrorMessage error={error}></ErrorMessage>}
      </form>
    </div>
  );
};
