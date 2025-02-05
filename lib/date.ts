export function getCurrentMonth() {
  const date = new Date();
  const monthIndex = date.getMonth();

  const monthValues = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  return monthValues[monthIndex];
}

export function getCurrentWeek() {
  const date = new Date();
  const day = date.getDate();

  if (day <= 15) {
    return "first_half";
  } else {
    return "second_half";
  }
}
