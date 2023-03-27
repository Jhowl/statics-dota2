<script>
  import './style.css'
  import MultiSelect from 'svelte-multiselect'
  import { onMount } from 'svelte'
  import { leagues, teams } from './dataFilters'
  import { matches } from '$lib/components/matches'

  import Matches from '$lib/components/Matches.svelte'
  import Statics from '$lib/components/Statics.svelte'

  let leaguesOptions = []
  let teamsOptions = []
  let filter = {
    leaguesIds: [],
    teamsIds: [],
    year: 2023,
  }

  let matchesData = []
  let durations = []
  let scores = []

  onMount(async () => {
    leaguesOptions = (await leagues(filter.year)).map((l) => ({ label: l.name, value: l.leagueid }))
    teamsOptions = (await teams()).map((t) => ({ label: t.name, value: t.team_id }))
    matchesData = await matches()

    durations = matchesData.map((m) => m.duration)
    scores = matchesData.map((m) => m.radiant_score + m.dire_score)
  })

  async function updateByLeagues(e) {
    if (e.detail === undefined) {
      return
    }

    if (e.detail.type === 'remove') {
      filter.leaguesIds = filter.leaguesIds.filter((id) => id !== e.detail.option.value)
      matchesData = await matches(filter)
      return
    }

    filter.leaguesIds.push(e.detail.option.value)
    matchesData = await matches({ leaguesIds: filter.leaguesIds })
    teamsOptions = (await teams(filter)).map((t) => ({ label: t.name, value: t.team_id }))
  }

  async function updateByTeams(e) {
    if (e.detail.type === 'remove') {
      filter.teamsIds = filter.teamsIds.filter((id) => id !== e.detail.option.value)
      matchesData = await matches(filter)
      return
    }

    filter.teamsIds.push(e.detail.option.value)
    matchesData = await matches(filter)
  }

  $: {
    durations = matchesData.map((m) => m.duration)
    scores = matchesData.map((m) => m.radiant_score + m.dire_score)
  }
</script>

<main>
  <div class="filters" style="margin-bottom: 2rem;">
    <h3>Data from:</h3>
    {#if leaguesOptions.length}
      <MultiSelect
        options={leaguesOptions}
        on:change={updateByLeagues}
        placeholder="Select leagues"
        --sms-options-bg="black"
        --sms-options-color="orange"
      />
    {:else}
      <p>Loading...</p>
    {/if}
    <span style="margin: 0 1rem;">|</span>
    {#if teamsOptions.length}
      <MultiSelect
        options={teamsOptions}
        on:change={updateByTeams}
        placeholder="Select Teams"
        --sms-options-bg="black"
        --sms-options-color="orange"
      />
    {:else}
      <p>Loading...</p>
    {/if}
  </div>

  <Statics {durations} {scores} />
  <Matches {matchesData} />
</main>

<style>
  .filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: 0.9rem;
    width: 50%;
    margin: 0 auto;
  }
</style>

