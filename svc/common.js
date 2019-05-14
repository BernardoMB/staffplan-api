const _ = require('lodash');

function getPoints(arr) {
  const tempArr = [];
  arr.forEach(p => {
    tempArr.push(p.START_DATE);
    tempArr.push(p.END_DATE);
  });
  return _.uniq(_.sortBy(tempArr, x => x), d => convertToUTC(d));
}

function convertToUTC(date) {
    return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds());
}

function getOverlappingSum(arr3, abPair) {
  let sum = 0;
  const f = d => convertToUTC(d);
  arr3.forEach(p => {
    if (f(abPair.START_DATE) < f(p.END_DATE) && f(abPair.END_DATE) > f(p.START_DATE)) {
      sum += p.ALLOCATION;
    }
  });
  return { ...abPair, ALLOCATION: sum, STAFF_ID: arr3[0].STAFF_ID,STAFF_NAME : arr3[0].STAFF_NAME, ROLE_ID: arr3[0].PROJECT_ROLE_ID };
}

function getFinalOutput(pointsArr, mainArr) {
  let i = 0;
  let result = [];
  while (i < pointsArr.length - 1) {
    const obj = getOverlappingSum(mainArr, {
      START_DATE: pointsArr[i],
      END_DATE: pointsArr[i + 1]
    });
    if (obj.ALLOCATION <= 70) result.push(obj);
    i++;
  }
  return result;
}

exports.getDurationViseAllocationByStaffID = (arr) => {
    const overlappingPointsArr = getPoints(arr);
    return getFinalOutput(overlappingPointsArr, arr);
}