export function convertDateToAPIDate(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    return null; 
  }
  return date.toISOString(); 
}

export function convertAPIDateToDate(isoString) {
  if (typeof isoString !== "string") {
    return null; 
  }
  const date = new Date(isoString);
  return isNaN(date) ? null : date; 
}
