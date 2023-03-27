import axios from 'axios'

const urlBase = 'https://api.opendota.com/api/explorer?sql='

const queryLeagues = `SELECT
    leagues.tier, leagues.name, leagues.leagueid
FROM
    matches
    JOIN match_patch USING (match_id)
    JOIN leagues USING (leagueid)
WHERE
    leagues.tier = 'premium' AND
    EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= 2023
GROUP BY
    leagues.name, leagues.leagueid`

const urlLeagues = urlBase + encodeURIComponent(queryLeagues)

export const leagues = axios.get(urlLeagues)
  .then((response) => {
    return response.data.rows
  }
)

export const teams = async (leaguesIds=[]) => {
  const whereLeagues = leaguesIds.length > 0 ? `AND leagues.leagueid IN (${leaguesIds})` : ''

  const queryMatches = `
    SELECT
      teams.team_id,
      teams.name,
      leagues.name AS league_name
    FROM
      matches
    JOIN match_patch USING (match_id)
    JOIN leagues USING (leagueid)
    JOIN teams ON teams.team_id = matches.radiant_team_id OR teams.team_id = matches.dire_team_id
    WHERE
      leagues.tier = 'premium' AND
      EXTRACT(YEAR FROM to_timestamp(matches.start_time)) >= 2023
      ${whereLeagues}
    GROUP BY
      teams.team_id,
      teams.name,
      leagues.name`

  try {
    const urlMatches = urlBase + encodeURIComponent(queryMatches)
    const matches = await axios.get(urlMatches)

    return matches.data.rows
  } catch (error) {
    console.log(error)
    return error
  }
}

