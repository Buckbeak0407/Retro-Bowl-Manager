let budget = 1000;
let coins = 100;
let trainingLevel = 1;
let stadiumLevel = 1;
let coachRating = 1;
let userScore = 0;
let opponentScore = 0;
let seasonProgress = 0;
let teamName = "My Team";
let characterName = "Manager";
let offensiveRating = 0;
let defensiveRating = 0;
let players = [];
let transferMarket = [];
let team = [{ name: "Player 1", rating: 60, role: 'offense' }, { name: "Player 2", rating: 55, role: 'defense' }];
let seasonLeaderboard = [{ team: "My Team", wins: 0, losses: 0 }];

function showSection(section) {
    document.querySelectorAll('.section').forEach(div => div.style.display = 'none');
    document.getElementById(section).style.display = 'block';
    updateUI();
}

function saveCharacter() {
    characterName = document.getElementById("characterName").value || "Manager";
    teamName = document.getElementById("teamName").value || "My Team";
    document.getElementById("characterInfo").innerText = `Character: ${characterName}`;
    document.getElementById("teamInfo").innerText = `Team: ${teamName}`;
}

function updateUI() {
    document.getElementById("budget").innerText = budget;
    document.getElementById("coins").innerText = coins;
    document.getElementById("trainingLevel").innerText = trainingLevel;
    document.getElementById("stadiumLevel").innerText = stadiumLevel;
    document.getElementById("coachRating").innerText = coachRating;
    
    document.getElementById("teamList").innerHTML = team
        .map(player => `<div>${player.name} (Rating: ${player.rating}) - Role: ${player.role}</div>`)
        .join("");

    document.getElementById("offensiveRating").innerText = offensiveRating;
    document.getElementById("defensiveRating").innerText = defensiveRating;

    document.getElementById("playerMarket").innerHTML = transferMarket
        .map((p, i) => `<div>${p.name} (Rating: ${p.rating}) 
            <button onclick="buyPlayer(${i})">Buy ($${p.cost}, ${p.role})</button></div>`)
        .join("");

    document.getElementById("leaderboard").innerHTML = seasonLeaderboard
        .map(leader => `<div>${leader.team} - Wins: ${leader.wins}, Losses: ${leader.losses}</div>`)
        .join("");
}

function refreshMarket() {
    if (coins < 10) {
        alert("Not enough coins to refresh market.");
        return;
    }
    coins -= 10;
    transferMarket = generateRandomPlayers();
    updateUI();
}

function generateRandomPlayers() {
    return [
        { name: "Player A", rating: Math.floor(Math.random() * 40) + 50, cost: 100, role: 'offense' },
        { name: "Player B", rating: Math.floor(Math.random() * 40) + 50, cost: 150, role: 'defense' },
        { name: "Player C", rating: Math.floor(Math.random() * 40) + 60, cost: 200, role: 'offense' },
    ];
}

function buyPlayer(index) {
    const player = transferMarket[index];
    if (coins < player.cost) {
        alert("Not enough coins to buy this player.");
        return;
    }
    coins -= player.cost;
    team.push(player);
    updateUI();
}

function upgradeFacility(facility) {
    if (budget < 500) {
        alert("Not enough budget to upgrade.");
        return;
    }
    budget -= 500;
    if (facility === 'training') {
        trainingLevel++;
    } else if (facility === 'stadium') {
        stadiumLevel++;
    }
    updateUI();
}

function upgradeCoach() {
    if (budget < 1000) {
        alert("Not enough budget to upgrade coach.");
        return;
    }
    budget -= 1000;
    coachRating++;
    updateUI();
}

function startMatch() {
    showSection("matchScreen");
    userScore = opponentScore = 0;
    document.getElementById("userScore").innerText = userScore;
    document.getElementById("opponentScore").innerText = opponentScore;
    document.getElementById("matchCommentary").innerText = "";
    matchDuration = 180;  // 3 minutes in seconds
    ballPosition = 50; // Start in center
    ballMoveInterval = setInterval(moveBall, 1000);
    commentaryIndex = 0;
    interval = setInterval(() => {
        if (commentaryIndex < commentary.length) {
            document.getElementById("matchCommentary").innerText += "\n" + commentary[commentaryIndex];
            commentaryIndex++;
        } else {
            clearInterval(interval);
        }
    }, 5000);
}

function moveBall() {
    if (matchDuration <= 0) {
        clearInterval(ballMoveInterval);
        finishMatch();
        return;
    }
    matchDuration--;
    ballPosition = Math.random() * 100;
    document.getElementById("ball").style.left = `${ballPosition}%`;
    document.getElementById("ball").style.top = `${Math.random() * 80}%`;

    // Update scores
    if (Math.random() > 0.95) {
        userScore++;
        document.getElementById("userScore").innerText = userScore;
    }
    if (Math.random() > 0.95) {
        opponentScore++;
        document.getElementById("opponentScore").innerText = opponentScore;
    }
}

function finishMatch() {
    let result = "Draw";
    if (userScore > opponentScore) {
        result = "You Win!";
    } else if (userScore < opponentScore) {
        result = "You Lose!";
    }

    setTimeout(() => {
        alert(`${result} Final Score: ${userScore} - ${opponentScore}`);
        seasonLeaderboard[0].wins += userScore > opponentScore ? 1 : 0;
        seasonLeaderboard[0].losses += userScore < opponentScore ? 1 : 0;
        showSection('menu');
        updateUI();
    }, 500);
}

function endMatch() {
    finishMatch();
}
