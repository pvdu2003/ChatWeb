export function extractTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  if (date.toDateString() === now.toDateString()) {
    return `${hours}:${minutes}`;
  } else {
    // If not today, format to a more readable format (e.g., MMM DD, YYYY)
    const formattedDate = date.toLocaleString("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${hours}:${minutes} ${formattedDate}`;
  }
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
