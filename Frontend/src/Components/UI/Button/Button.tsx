import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  "aria-label": ariaLabel,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${styles.button} ${styles[`button--${variant}`]} ${className}`.trim()}
    >
      {children}
    </button>
  );
};
