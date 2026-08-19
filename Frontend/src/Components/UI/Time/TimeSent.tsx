type TimeSentTypes = {
  createTime: Date | string | number;
};

export function TimeSent({ createTime }: TimeSentTypes) {
  const now = Date.now();
  const sent = new Date(createTime).getTime();

  // Handle invalid dates safely
  if (isNaN(sent)) {
    return <span>Unknown date</span>;
  }

  const diffInSeconds = Math.floor((now - sent) / 1000);

  // Handle future dates or immediate posts safely
  if (diffInSeconds < 5) {
    return <span>just now</span>;
  }

  // Define time constants in seconds
  const MINUTE = 60;
  const HOUR = 3600;
  const DAY = 86400;
  const MONTH = 2592000; // Assumes 30 days
  const YEAR = 31536000; // Assumes 365 days

  // Calculate intervals
  if (diffInSeconds < MINUTE) {
    return <span>{diffInSeconds}s</span>;
  }

  if (diffInSeconds < HOUR) {
    const mins = Math.floor(diffInSeconds / MINUTE);
    return <span>{mins}m</span>;
  }

  if (diffInSeconds < DAY) {
    const hours = Math.floor(diffInSeconds / HOUR);
    return <span>{hours}h</span>;
  }

  if (diffInSeconds < MONTH) {
    const days = Math.floor(diffInSeconds / DAY);
    return <span>{days}d</span>;
  }

  if (diffInSeconds < YEAR) {
    const months = Math.floor(diffInSeconds / MONTH);
    return <span>{months}mo</span>;
  }

  const years = Math.floor(diffInSeconds / YEAR);
  return <span>{years}y</span>;
}
