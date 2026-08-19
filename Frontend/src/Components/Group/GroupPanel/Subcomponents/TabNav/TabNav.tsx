import React from "react";
import styles from "./TabNav.module.css";
import type { TabOption } from "../../GroupPanel";

// Define the shape of the props this component expects
type TabNavPropsTypes = {
  tabs: readonly [TabOption, TabOption];
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
};

export default function TabNav({
  tabs,
  activeTab,
  setActiveTab,
}: TabNavPropsTypes) {
  const activeIndex = tabs.indexOf(activeTab);
  return (
    <div className={styles.navContainer}>
      <div className={styles.tabsWrapper}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)} // Calls the parent's state setter
              className={`${styles.tabButton} ${isActive ? styles.active : styles.inactive}`}
            >
              <span>{tab}</span>
            </button>
          );
        })}

        {/* The sliding underline automatically scales to the number of tabs passed in */}
        <div
          className={styles.indicator}
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}
