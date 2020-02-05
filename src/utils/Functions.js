// 자릿수가 하나일 경우 앞에 0을 붙여줌
function two(str) {
  str = str + "";

  if(str.length === 1) {
    str = "0" + str;
  }
  return str;
}

// Date -> String (yyyy-mm-dd)
export function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateStr = year + "-" + two(month) + "-" + two(day);

  return dateStr;
}

// String (yyyy-mm-dd) -> Date
export function stringToDate(str) {
  const ymdArr = str.split('-');
  return new Date(ymdArr[0], ymdArr[1] - 1, ymdArr[2]);
}

