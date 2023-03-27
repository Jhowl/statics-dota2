const utils = {
  //coonvert seconds to minutes 30:00m
  secondsToMinutes: (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  },
  timestampToDate: (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month}-${day}`;
  },
  average: (array) => {
    const sum = array.reduce((a, b) => a + b);
    return (sum / array.length);
  },
  median: (array) => {
    const mid = Math.floor(array.length / 2),
      nums = [...array].sort((a, b) => a - b);
    return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  },
  mode: (array) => {
    return array.sort((a, b) =>
      array.filter(v => v === a).length
      - array.filter(v => v === b).length
    ).pop();
  },
  standardDeviation: (array) => {
    const avg = utils.average(array);

    const squareDiffs = array.map((value) => {
      const diff = value - avg;
      const sqrDiff = diff * diff;
      return sqrDiff;
    });

    const avgSquareDiff = utils.average(squareDiffs);

    const stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  },
  variance: (array) => {
    const avg = utils.average(array);

    const squareDiffs = array.map((value) => {
      const diff = value - avg;
      const sqrDiff = diff * diff;
      return sqrDiff;
    });

    const avgSquareDiff = utils.average(squareDiffs);

    return avgSquareDiff;
  },
  confidenceInterval: (array) => {
    const avg = utils.average(array);
    const stdDev = utils.standardDeviation(array);
    const n = array.length;
    const z = 1.96;
    const marginOfError = z * (stdDev / Math.sqrt(n));
    const lowerBound = avg - marginOfError;
    const upperBound = avg + marginOfError;
    return [lowerBound, upperBound];
  },
  regression: (array) => {
    const x = array.map((item, index) => index);
    const y = array;
    const xAvg = utils.average(x);
    const yAvg = utils.average(y);
    const xDiff = x.map((item) => item - xAvg);
    const yDiff = y.map((item) => item - yAvg);
    const xDiffSquared = xDiff.map((item) => item * item);
    const xDiffSquaredSum = xDiffSquared.reduce((a, b) => a + b);
    const xDiffTimesYDiff = xDiff.map((item, index) => item * yDiff[index]);
    const xDiffTimesYDiffSum = xDiffTimesYDiff.reduce((a, b) => a + b);
    const slope = xDiffTimesYDiffSum / xDiffSquaredSum;
    const intercept = yAvg - (slope * xAvg);
    return [slope, intercept];
  },
  min: (array) => {
    return Math.min(...array);
  },
  max: (array) => {
    return Math.max(...array);
  }
}

export default utils
