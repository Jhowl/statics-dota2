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
  function standardDeviationbyTime() {
    const times = durations.reduce((acc, curr) => {
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

    console.log(times)

    return {
      thirty: times.thirty / durations.length * 100,
      thirtyTwo: times.thirtyTwo / durations.length * 100,
      thirtyFour: times.thirtyFour / durations.length * 100,
      thirtySix: times.thirtySix / durations.length * 100,
      thirtyEight: times.thirtyEight / durations.length * 100,
      forty: times.forty / durations.length * 100,
      fortyTwo: times.fortyTwo / durations.length * 100,
      fortyFour: times.fortyFour / durations.length * 100
    }
  }

</script>

<div class="statics">
  <div class="statics-duration">
    <h3>Duration</h3>
    {#if durations.length}
      <div class="statics-duration-min">
        <p>Min: {utils.secondsToMinutes(utils.min(durations))}</p>
      </div>
      <div class="statics-duration-max">
        <p>Max: {utils.secondsToMinutes(utils.max(durations))}</p>
      </div>
      <div class="statics-duration-avg">
        <p>Average: {utils.secondsToMinutes(utils.average(durations))}</p>
      </div>
      <div class="statics-duration-std">
        <p>Standard Deviation: {utils.secondsToMinutes(utils.standardDeviation(durations))}</p>
      </div>
      <div class="statics-duration-median">
        <p>Median: {utils.secondsToMinutes(utils.median(durations))}</p>
      </div>
      <div class="statics-duration-mode">
        <p>Mode: {utils.secondsToMinutes(utils.mode(durations))}</p>
      </div>
      <div class="statics-duration-variance">
        <p>Average: {utils.average(durations)}</p>
        <p>Variance: {utils.variance(durations)}</p>
      </div>
      <div class="statics-duration-confidence">
        <p>Confidence Interval: {utils.secondsToMinutes(confidenceInterval(durations).lower)} - {utils.secondsToMinutes(confidenceInterval(durations).upper)}</p>
        <p class="notice">* Confidence Interval is calculated with 95% confidence</p>
      </div>
      <div class="statics-duration-regression">
        <p>Regression: {regression(durations).slope}x + {regression(durations).intercept}</p>
      </div>
      <div>
        <p>Standard Deviation by Time</p>
        <p>30m: {standardDeviationbyTime().thirty}</p>
        <p>32m: {standardDeviationbyTime().thirtyTwo}</p>
        <p>34m: {standardDeviationbyTime().thirtyFour}</p>
        <p>36m: {standardDeviationbyTime().thirtySix}</p>
        <p>38m: {standardDeviationbyTime().thirtyEight}</p>
        <p>40m: {standardDeviationbyTime().forty}</p>
        <p>42m: {standardDeviationbyTime().fortyTwo}</p>
        <p>44m: {standardDeviationbyTime().fortyFour}</p>
      </div>
    {:else}
      <p>No data</p>
    {/if}
  </div>

  <div class="statics-score">
    <h3>Score</h3>
    {#if scores.length}
      <div class="statics-score-min">
        <p>Min: {utils.min(scores)}</p>
      </div>
      <div class="statics-score-max">
        <p>Max: {utils.max(scores)}</p>
      </div>
      <div class="statics-score-avg">
        <p>Average: {utils.average(scores)}</p>
      </div>
      <div class="statics-score-std">
        <p>Standard Deviation: {utils.standardDeviation(scores)}</p>
      </div>
      <div class="statics-score-median">
        <p>Median: {utils.median(scores)}</p>
      </div>
      <div class="statics-score-mode">
        <p>Mode: {utils.mode(scores)}</p>
      </div>
      <div class="statics-score-variance">
        <p>Average: {utils.average(scores)}</p>
        <p>Variance: {utils.variance(scores)}</p>
      </div>
      <div class="statics-score-confidence">
        <p>Confidence Interval: {confidenceInterval(scores).lower} - {confidenceInterval(scores).upper}</p>
        <p class="notice">* Confidence Interval is calculated with 95% confidence</p>
      </div>
      <div class="statics-score-regression">
        <p>Regression: {regression(scores).slope}x + {regression(scores).intercept}</p>
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
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 1rem;
  }

  .statics-duration,
  .statics-score {
    width: 45%;
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
