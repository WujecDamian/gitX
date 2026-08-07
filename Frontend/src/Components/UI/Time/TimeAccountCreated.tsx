type TimeAccountCreatedTypes = {
  createTime: Date | string | number;
};

export function TimeAccountCreated({ createTime }: TimeAccountCreatedTypes) {
  const date = new Date(createTime);

  // Handle invalid dates safely
  if (isNaN(date.getTime())) {
    return <span>Joined Unknown date</span>;
  }

  // Formats to: "Month Year" (e.g., "July 2026")
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  });

  return <span>Joined {formatter.format(date)}</span>;
}
