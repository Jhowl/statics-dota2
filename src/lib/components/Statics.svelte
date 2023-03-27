<script>
  import utils from '$lib/utils/utils'

  export let durations = []
  export let scores = []

  function confidenceInterval(data) {
    const result = utils.confidenceInterval(data)

    return {
      lower: result[0],
      upper: result[1]
    }
  }

  function regression(data) {
    const result = utils.regression(data)

    return {
      slope: result[0],
      intercept: result[1]
    }
  }
  //Create a function that will calculate the standard deviation by time 30m = ?% 32m =?5
  function standardDeviationbyTime(data) {
    const times = data.reduce((acc, curr) => {
      acc.thirty = curr < 1800 ? acc.thirty + 1 : acc.thirty
      acc.thirtyTwo = curr < 1920 ? acc.thirtyTwo + 1 : acc.thirtyTwo
      acc.thirtyFour = curr < 2040 ? acc.thirtyFour + 1 : acc.thirtyFour
      acc.thirtySix = curr < 2160 ? acc.thirtySix + 1 : acc.thirtySix
      acc.thirtyEight = curr < 2280 ? acc.thirtyEight + 1 : acc.thirtyEight
      acc.forty = curr < 2400 ? acc.forty + 1 : acc.forty
      acc.fortyTwo = curr < 2520 ? acc.fortyTwo + 1 : acc.fortyTwo
      acc.fortyFour = curr < 2640 ? acc.fortyFour + 1 : acc.fortyFour
      return acc
    }, {
      thirty: 0,
      thirtyTwo: 0,
      thirtyFour: 0,
      thirtySix: 0,
      thirtyEight: 0,
      forty: 0,
      fortyTwo: 0,
      fortyFour: 0
    })

    return `
      <p>30m: ${times.thirty / data.length * 100}%</p>
      <p>32m: ${times.thirtyTwo / data.length * 100}%</p>
      <p>34m: ${times.thirtyFour / data.length * 100}%</p>
      <p>36m: ${times.thirtySix / data.length * 100}%</p>
      <p>38m: ${times.thirtyEight / data.length * 100}%</p>
      <p>40m: ${times.forty / data.length * 100}%</p>
      <p>42m: ${times.fortyTwo / data.length * 100}%</p>
      <p>44m: ${times.fortyFour / data.length * 100}%</p>
    `
  }

  //create deviation by score 30m = ?% 35m = ?% 40m = ?% 45m = ?% 50m = ?% 55m = ?% 60m = ?% 65m = ?% 70m = ?% 75m = ?% 80m = ?%
  function standardDeviationbyScore(data) {
    const scores = data.reduce((acc, curr) => {
      acc.thirty = curr < 30 ? acc.thirty + 1 : acc.thirty
      acc.thirtyFive = curr < 35 ? acc.thirtyFive + 1 : acc.thirtyFive
      acc.forty = curr < 40 ? acc.forty + 1 : acc.forty
      acc.fortyFive = curr < 45 ? acc.fortyFive + 1 : acc.fortyFive
      acc.fifty = curr < 50 ? acc.fifty + 1 : acc.fifty
      acc.fiftyFive = curr < 55 ? acc.fiftyFive + 1 : acc.fiftyFive
      acc.sixty = curr < 60 ? acc.sixty + 1 : acc.sixty
      acc.sixtyFive = curr < 65 ? acc.sixtyFive + 1 : acc.sixtyFive
      acc.seventy = curr < 70 ? acc.seventy + 1 : acc.seventy
      acc.seventyFive = curr < 75 ? acc.seventyFive + 1 : acc.seventyFive
      acc.eighty = curr < 80 ? acc.eighty + 1 : acc.eighty
      return acc
    }, {
      thirty: 0,
      thirtyFive: 0,
      forty: 0,
      fortyFive: 0,
      fifty: 0,
      fiftyFive: 0,
      sixty: 0,
      sixtyFive: 0,
      seventy: 0,
      seventyFive: 0,
      eighty: 0
    })

    return `
      <p>30: ${scores.thirty / data.length * 100}%</p>
      <p>35: ${scores.thirtyFive / data.length * 100}%</p>
      <p>40: ${scores.forty / data.length * 100}%</p>
      <p>45: ${scores.fortyFive / data.length * 100}%</p>
      <p>50: ${scores.fifty / data.length * 100}%</p>
      <p>55: ${scores.fiftyFive / data.length * 100}%</p>
      <p>60: ${scores.sixty / data.length * 100}%</p>
      <p>65: ${scores.sixtyFive / data.length * 100}%</p>
      <p>70: ${scores.seventy / data.length * 100}%</p>
    `
  }

</script>

<div class="statics">
  <div class="statics-duration">
    <h3>Duration</h3>
    {#if durations.length}
      <div class="statics-duration-min">
        <p>Min: <strong> {utils.secondsToMinutes(utils.min(durations))}</strong></p>
      </div>
      <div class="statics-duration-max">
        <p>Max: <strong> {utils.secondsToMinutes(utils.max(durations))}</strong></p>
      </div>
      <div class="statics-duration-avg">
        <p>Average: <strong> {utils.secondsToMinutes(utils.average(durations))}</strong></p>
      </div>
      <div class="statics-duration-std">
        <p>Standard Deviation: <strong> {utils.secondsToMinutes(utils.standardDeviation(durations))}</strong></p>
      </div>
      <div class="statics-duration-median">
        <p>Median: <strong> {utils.secondsToMinutes(utils.median(durations))}</strong></p>
      </div>
      <div class="statics-duration-mode">
        <p>Mode: <strong> {utils.secondsToMinutes(utils.mode(durations))}</strong></p>
      </div>
      <div class="statics-duration-variance">
        <p>Average: <strong> {utils.average(durations)}</strong></p>
        <p>Variance: <strong> {utils.variance(durations)}</strong></p>
      </div>
      <div class="statics-duration-confidence">
        <p>Confidence Interval: <strong> {utils.secondsToMinutes(confidenceInterval(durations).lower)} - {utils.secondsToMinutes(confidenceInterval(durations).upper)}</strong></p>
        <p class="notice">* Confidence Interval is calculated with 95% confidence</p>
      </div>
      <div class="statics-duration-regression">
        <p>Regression: <strong> {regression(durations).slope}x + {regression(durations).intercept}</strong></p>
      </div>
      <div>
        <p>Standard Deviation by Time:</p>
        {@html standardDeviationbyTime(durations)}
      </div>
    {:else}
      <p>No data</p>
    {/if}
  </div>

  <div class="statics-score">
    <h3>Score</h3>
    {#if scores.length}
      <div class="statics-score-min">
        <p>Min: <strong> {utils.min(scores)}</strong></p>
      </div>
      <div class="statics-score-max">
        <p>Max: <strong> {utils.max(scores)}</strong></p>
      </div>
      <div class="statics-score-avg">
        <p>Average: <strong> {utils.average(scores)}</strong></p>
      </div>
      <div class="statics-score-std">
        <p>Standard Deviation: <strong> {utils.standardDeviation(scores)}</strong></p>
      </div>
      <div class="statics-score-median">
        <p>Median: <strong> {utils.median(scores)}</strong></p>
      </div>
      <div class="statics-score-mode">
        <p>Mode: <strong> {utils.mode(scores)}</strong></p>
      </div>
      <div class="statics-score-variance">
        <p>Average: <strong> {utils.average(scores)}</strong></p>
        <p>Variance: <strong> {utils.variance(scores)}</strong></p>
      </div>
      <div class="statics-score-confidence">
        <p>Confidence Interval: <strong> {confidenceInterval(scores).lower} - {confidenceInterval(scores).upper}</strong></p>
        <p class="notice">* Confidence Interval is calculated with 95% confidence</p>
      </div>
      <div class="statics-score-regression">
        <p>Regression: <strong> {regression(scores).slope}x + {regression(scores).intercept}</strong></p>
      </div>
      <div class="statics-score-standard-deviation-by-time">
        <p>Standard Deviation by Socre:</p>
        {@html standardDeviationbyScore(scores)}
      </div>
    {:else}
      <p>No data</p>
    {/if}
  </div>
</div>

<style>
  .statics {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .statics-duration,
  .statics-score {
    width: 38%;
    padding-left: 1rem;
    border: 1px solid #ccc;
  }

  .statics-duration-min,
  .statics-duration-max,
  .statics-duration-avg,
  .statics-duration-std,
  .statics-duration-median,
  .statics-duration-mode,
  .statics-duration-variance,
  .statics-duration-confidence,
  .statics-duration-regression,
  .statics-score-min,
  .statics-score-max,
  .statics-score-avg,
  .statics-score-std,
  .statics-score-median,
  .statics-score-mode,
  .statics-score-variance,
  .statics-score-confidence,
  .statics-score-regression {
    margin-bottom: 0.5rem;
  }

  .notice {
    margin-top: -0.5rem;
    font-size: 0.6rem;
  }

</style>
