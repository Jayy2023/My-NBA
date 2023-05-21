const btn = document.querySelector('button');
btn.onclick = searchPlayer;

async function searchPlayer() {
  const playerName = document.getElementById('playerName').value;
  const apiUrl = 'https://www.balldontlie.io/api/v1/players?search=' + playerName;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const playerId = data.data[0].id;
    const statsApiUrl = 'https://www.balldontlie.io/api/v1/season_averages?player_ids[]=' + playerId;

    const statsData = await fetch(statsApiUrl);
    const statsResponse = await statsData.json();
    const playerStats = statsResponse.data[0];

    const playerFullName = data.data[0].first_name + ' ' + data.data[0].last_name;
    const playerStatsDiv = document.getElementById('playerStats');

    playerStatsDiv.innerHTML =
      '<h2>' + playerFullName + '</h2>' +
      '<p>Points per game: ' + playerStats.pts + '</p>' +
      '<p>Assists per game: ' + playerStats.ast + '</p>' +
      '<p>Rebounds per game: ' + playerStats.reb + '</p>' +
      '<p>Field goal percentage: ' + playerStats.fg_pct + '</p>';
    document.getElementById('playerName').value = '';
  } catch (error) {
    // console.error('Error:', error);
  }
 
} 