// Returns an array of dates between the two dates

let getDates = function (startDate, endDate) {
  // newStartDate;
  // newEndDate;
  let dates = [],
    currentDate = startDate,
    addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }

  return dates;
};

// Usage
// let dates = getDates(new Date(2020, 4, 22), new Date(2020, 4, 26));
// dates.forEach(function (date) {
//   console.log(date);
// });

export { getDates };
