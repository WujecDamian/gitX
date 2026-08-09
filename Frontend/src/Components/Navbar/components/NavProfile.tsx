import styles from "../Navbar.module.css";
import ProfileDropdown from "./ProfileDropdown";
import { useEffect, useRef, useState } from "react";
import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";

type props = {
  user: User;
  logout: () => Promise<void>;
};

export default function NavProfile(props: props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      console.log("DropdownRef", dropdownRef.current);
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log("closed");
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleDropdownOpen = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <>
      {isOpen && (
        <ProfileDropdown
          ref={dropdownRef}
          logout={props.logout}
        ></ProfileDropdown>
      )}

      <div className={styles.nav__mini__profile} onClick={handleDropdownOpen}>
        <span className={styles["mini__profile--left"]}>
          <div>
            <ProfilePicture
              url={props.user.profile_picture_url}
            ></ProfilePicture>
          </div>
          <div className={styles["profile__left__names"]}>
            <span>{props.user.display_name}</span>
            <span>@{props.user.username}</span>
          </div>
        </span>
        <span className={styles["mini__profile--right"]}>
          <span>&#8943;</span>
        </span>
      </div>
    </>
  );
}
