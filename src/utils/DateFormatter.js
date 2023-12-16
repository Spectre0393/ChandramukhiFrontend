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

export function toDateFormat(dateToConvert){

    const parsedDate = Date.parse(dateToConvert);
    const pureDate = new Date(parsedDate);
    return pureDate.toDateString();

  // return dateToConvert.join('-')
}

export function formatDate(dateToConvert) {
  var d = new Date(dateToConvert),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}