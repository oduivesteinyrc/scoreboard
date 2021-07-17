const getDate = () => {
  const now = new Date()
  let month = getMonthName(now.getMonth())
  let date = twoDigitsDate(now.getDate())
  let year = twoDigitsDate(now.getFullYear())
  let hours = twoDigitsDate(now.getHours())
  let minutes = twoDigitsDate(now.getMinutes())
  return `${month} ${date}, ${year} ${hours}:${minutes}`
}


const getMonthName = (number) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  let month = months[number - 1]
  return month
}
const twoDigitsDate = (number) => {
  return (number < 10 ? '0' + number : number)
}