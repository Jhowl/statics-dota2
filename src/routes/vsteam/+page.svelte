<script>
  import { onMount } from 'svelte';
  import { teams } from './../dataFilters';
  import { matches } from '$lib/components/matches'

  import Statics from '$lib/components/Statics.svelte'

  let teamsOptions = [];
  let selectedTeams = [];

  let matchesData = [];
  let durations = [];
  let scores = [];

  onMount(async () => {
    teamsOptions = (await teams()).map((t) => ({ label: t.name, value: t.team_id }));
  });

  async function updateTeams(e) {
    selectedTeams = e.detail.map((option) => option.value);

    matchesData = await matches({
      teamsIds: selectedTeams
    });

    durations = matchesData.map((m) => m.duration);
    scores = matchesData.map((m) => m.radiant_score + m.dire_score);
  }

</script>

<main>
  <h1>Select Two Teams to Compare Statistics</h1>

  <div class="team-select-container">
    <select multiple bind:value={selectedTeams} on:change={updateTeams}>
      {#each teamsOptions as team}
        <option value={team.value}>{team.label}</option>
      {/each}
    </select>
  </div>

  {#if selectedTeams.length >= 2}
    <div class="team-stats-container">
      {#each selectedTeams as team}
        <div class="team-stats">
          <h2>{teamsOptions.find(t => t.value === team).label}</h2>
          <Statics
            durations={durations.filter(m => m.team_id === team)}
            scores={scores.filter(m => m.team_id === team)}
          />
        </div>
      {/each}
    </div>
  {:else}
    <p>Select two teams to compare their statistics</p>
  {/if}
</main>

<style>
  .team-select-container {
    margin-bottom: 2rem;
  }

  .team-stats-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .team-stats {
    width: 50%;
  }
</style>
