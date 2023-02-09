// Format day to DD
const formatDay = (day) => {
  if (day.length == 1) {
    return `0${day}`;
  }
  return day;
};
// Format month to MM
const formatMonth = (month) => {
  if (month.length == 1) {
    return `0${month}`;
  }
  return month;
};

// Format date to YYYYMMDD
export const formatDate = (date) => {
  const d = new Date(date.replace(/-/g, "/"));
  let month = formatMonth("" + (d.getMonth() + 1));
  let day = formatDay("" + d.getDate());
  const year = d.getFullYear();
  return [day, month, year].join("");
};

// Scroll to element
export const scrollToElement = (e, offset = 115) => {
  if (e.target) e.preventDefault();
  // Get the target element attribute or href
  const target = e.target ? e.target.getAttribute("href") : e;
  const element = document.querySelector(target);
  window.scrollTo({
    top: element.offsetTop - offset,
    behavior: "smooth",
  });
};

// Replace special characters
export const replaceSpecialCharacters = (str) => {
  return str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase();
};
