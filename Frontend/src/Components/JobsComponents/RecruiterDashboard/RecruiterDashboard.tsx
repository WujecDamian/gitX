import styles from "./RecruiterDashboard.module.css";

export const RecruiterDashboard = () => {
    return (
        <div className={styles.recruiter__dashboard__container}>
            <h1 className={styles.recruiter__dashboard__title}>Recruiter Dashboard</h1>
            <div className={styles.recruiter__dashboard__content}>
                <div className={styles.recruiter__dashboard__content__item}>
                    <h2 className={styles.recruiter__dashboard__content__item__title}>Jobs</h2>
                </div>
                <div className={styles.recruiter__dashboard__content__item}>
                    <h2 className={styles.recruiter__dashboard__content__item__title}>Candidates</h2>
                </div>
                <div className={styles.recruiter__dashboard__content__item}>
                    <h2 className={styles.recruiter__dashboard__content__item__title}>Messages</h2>
                </div>
                <div className={styles.recruiter__dashboard__content__item}>
                </div>
            </div>
        </div>
    );
};

