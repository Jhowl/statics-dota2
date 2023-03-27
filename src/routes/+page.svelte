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
    teamsIds: []
  }

  let matchesData = []
  let durations = []
  let scores = []

  onMount(async () => {
    leaguesOptions = (await leagues).map((l) => ({ label: l.name, value: l.leagueid }))
    teamsOptions = (await teams()).map((t) => ({ label: t.name, value: t.team_id }))
  })

  async function updateByLeagues(e) {
    if (e.detail.type === 'remove') {
      filter.leaguesIds = filter.leaguesIds.filter((id) => id !== e.detail.option.value)
      matchesData = await matches(filter)
      return
    }

    filter.leaguesIds.push(e.detail.option.value)
    matchesData = await matches({ leaguesIds: filter.leaguesIds })
    teamsOptions = (await teams(filter.leaguesIds)).map((t) => ({ label: t.name, value: t.team_id }))

  }

  async function updateByTeams(e) {
    console.log(e.detail)
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
  <h2>Leagues</h2>

  {#if leaguesOptions.length}
    <MultiSelect
      options={leaguesOptions}
      on:change={updateByLeagues}
      placeholder="Select leagues"
    />
  {:else}
    <p>Loading...</p>
  {/if}

  <h2>Teams</h2>

  {#if teamsOptions.length}
    <MultiSelect
      options={teamsOptions}
      on:change={updateByTeams}
      placeholder="Select Teams"
    />
  {:else}
    <p>Loading...</p>
  {/if}

  <Statics {durations} {scores} />
  <Matches {matchesData} />
</main>


