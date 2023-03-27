<script>
  import { onMount } from 'svelte'
  import { matches } from './matches'

  import utils from '$lib/utils/utils'

  export let matchesData = []
  onMount(async () => {
    matchesData = await matches()
  })

</script>

<div class="matches">
  {#if matchesData.length}
    <table>
      <thead>
        <tr>
          <th>Match ID</th>
          <th>Duration</th>
          <th>Start Time</th>
          <th>Dire Score</th>
          <th>Radiant Score</th>
          <th>Radiant Name</th>
          <th>Dire Name</th>
          <th>League Name</th>
        </tr>
      </thead>
      <tbody>
        {#each matchesData as match}
          <tr>
            <td>
              {match.match_id}
              <a href="https://www.dotabuff.com/matches/{match.match_id}" target="_blank">
                <img src="dotabuff.png" alt="dotabuff" width="15" height="15">
              </a>
            </td>
            <td>{utils.secondsToMinutes(match.duration)}</td>
            <td>{utils.timestampToDate(match.start_time)}</td>
            <td>{match.dire_score}</td>
            <td>{match.radiant_score}</td>
            <td>{match.radiant_name}</td>
            <td>{match.dire_name}</td>
            <td>{match.league_name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  .matches {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 1200px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  /* tr:nth-child(even) {
    background-color: #f2f2f2;
  } */

  tr:hover {
    background-color: #343434;
    color: #C56400;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4caf4f65;
    color: white;
  }

</style>
