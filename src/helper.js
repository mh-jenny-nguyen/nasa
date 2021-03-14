export const truncateWithEllipsis = (str, n = 20) => {
  return typeof str !== "undefined" && str.length > n
    ? str.substr(0, n - 1) + "..."
    : str;
};

export const dateFormat = (date) => {
  let format = '';
  let timeStamp = Date.parse(date);
  let temp = new Date(timeStamp);

  if(typeof temp.getMonth  === "function") {
    format = temp.toDateString('en-GB');
  }

  return format;
}
