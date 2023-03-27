<script>
  import { onMount } from 'svelte'
  import { matches } from './matches'

  import utils from '$lib/utils/utils'

  export let matchesData = []
    // {
    //     "duration": 1841,
    //     "match_id": 7073795445,
    //     "start_time": 1679579857,
    //     "dire_score": 12,
    //     "radiant_score": 23,
    //     "radiant_name": "HellRaisers",
    //     "dire_name": "BetBoom Team",
    //     "league_name": "DPC 2023 EEU Spring Tour Division I - presented by Paragon Events"
    // }

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
            <td>{match.match_id}</td>
            <td>{match.duration}</td>
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
    background-color: #ddd;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
  }

</style>
