export const truncateWithEllipsis = (str, n = 20) => {
  return typeof str !== "undefined" && str.length > n
    ? str.substr(0, n - 1) + "..."
    : str;
};

export const compareDate = (dateObj1, dateObj2) => {
  if (dateObj1 < dateObj2) {
    return -1;
  }

  if (dateObj1 > dateObj2) {
    return 1;
  }
  
  return 0;
};
