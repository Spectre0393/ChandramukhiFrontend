/* export default function todayDate() {
  const current = new Date();
  const date = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;

  return date;
} */

export default function formattedStringDate(dateToConvert) {
    const parsedDate = Date.parse(dateToConvert);
    const pureDate = new Date(parsedDate)
    return pureDate.toDateString()
}