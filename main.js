//team id = 42
//team name = Arsenal 
//country = England
// League Id (V3)		Country	  Name	                                    Season  Start	    End	        Current
// 39	            	England	  Premier League	                        2023	                		True


const teamName = document.getElementById('team-name');
const teamLogo = document.getElementById('team-logo');

const tournamentName = document.getElementById('tournament-name');
const tournamentLogo = document.getElementById('tournament-logo');

const gamesHistory = document.getElementById('game-history');
let gamesHistoryColor = '';

// Games Table
const winHome = document.getElementById('win-home');
const lostHome = document.getElementById('lost-home');
const drawHome = document.getElementById('draw-home');

const winAway = document.getElementById('win-away');
const lostAway = document.getElementById('lost-away');
const drawAway = document.getElementById('draw-away');

const winTotal = document.getElementById('win-total');
const lostTotal = document.getElementById('lost-total');
const drawTotal = document.getElementById('draw-total');

const homeTotal = document.getElementById('total-home');
const awayTotal = document.getElementById('total-away');
const totalPlayed = document.getElementById('total-played');


const url = 'https://v3.football.api-sports.io/teams/statistics?league=39&season=2023&team=42';
const options = {
    method: 'GET',
    headers: {
    'X-RapidAPI-Key': '2f454e1845c180cb50c8ee7cc10a34d1',
    'X-RapidAPI-Host': 'v3.football.api-sports.io'
    }
};

const getTeamStats = async() => {
    try {
        const response = await fetch(url, options);
        if(response.ok){
            const result = await response.json();
            console.log(result);
            showTeamStats(result);
        }
    } 
    catch (error) {
        console.error(error);
    }
};


const showTeamStats = jsonResult => {
    const teamJson = jsonResult.response;
    const fixtures = teamJson.fixtures;
    
    teamName.innerHTML += teamJson.team.name;
    teamLogo.src = teamJson.team.logo;
    teamLogo.style.display = 'block';

    tournamentName.innerHTML += teamJson.league.name;
    tournamentLogo.src = teamJson.league.logo;
    tournamentLogo.style.display = 'block';

    gamesHistory.innerHTML += teamJson.form;
    formColor(gamesHistory.innerHTML);
    gamesHistory.innerHTML = gamesHistoryColor;

    winHome.innerHTML = fixtures.wins.home;
    lostHome.innerHTML = fixtures.loses.home;
    drawHome.innerHTML = fixtures.draws.home;

    winAway.innerHTML = fixtures.wins.away;
    lostAway.innerHTML = fixtures.loses.away;
    drawAway.innerHTML = fixtures.draws.away;

    winTotal.innerHTML = fixtures.wins.total;
    lostTotal.innerHTML = fixtures.loses.total;
    drawTotal.innerHTML = fixtures.draws.total;

    homeTotal.innerHTML = fixtures.played.home;
    awayTotal.innerHTML = fixtures.played.away;
    totalPlayed.innerHTML = fixtures.played.total;

};

const formColor = formString => {
    for(let i = 0; i < formString.length; i++){
      if(formString[i] === 'W'){
        gamesHistoryColor += '<span class="green">W</span>'
      } else if(formString[i] === 'L'){
        gamesHistoryColor += '<span class="red">L</span>'
      } else {
        gamesHistoryColor += '<span>D</span>'
      }
    }
};

window.onload = getTeamStats;