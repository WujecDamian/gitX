import type { RefObject } from "react";
import styles from "../Navbar.module.css";
import { Link } from "react-router-dom";

type ProfileDropdownProps = {
  ref?: RefObject<HTMLDivElement | null>;
  logout: () => Promise<void>;
  className?: string;
};

export default function ProfileDropdown({
  ref,
  logout,
  className,
}: ProfileDropdownProps) {
  return (
    <div className={className ?? styles.dropdown} ref={ref}>
      <Link to="/" onClick={logout}>
        Log Out
      </Link>
    </div>
  );
}
