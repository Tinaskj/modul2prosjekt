function updateViewLeaderBoard() {






    document.getElementById('app').innerHTML = `
 Logget inn som: ${model.currentUser}
 <button onclick="logOut()">Logg ut</button><br>
 
 <button onclick="updateViewGame()">Spill igjen</button>
 <button onclick="updateViewResult()">Resultat</button>
 <button onclick="updateViewLeaderBoard()">Poengtavle</button>

 <h2>Poengtavle</h2><br>
 <button onclick="bestGame()" >Beste forsøk</button> <button onclick="bestAttempts()">Beste gjennomsnitt</button>
 <hr>
 ${drawLeaderBoard()}
 `;






}



function drawLeaderBoard() {
    let playersHtml = "";

    model.playerList.forEach(player => playersHtml += findGamesFromEachPlayer(player));
    return playersHtml

}




function findGamesFromEachPlayer(player) {
    let html = ""
    let FinishedGames = player.game.filter(game => game.finished == true)
    let sortedGames = FinishedGames.sort(compareAttempts);
    let totalGamesAttempts = FinishedGames.reduce((a, b) => ({ attempts: a.attempts + b.attempts }))
    let average = totalGamesAttempts.attempts / FinishedGames.length


    const newObj = {
        userName: player.userName,
        bestGame: sortedGames[0].attempts,
        average: average
    }



    model.leaderBoardList.push(newObj)


    html += `Spiller - ${player.userName} <br>
          Beste spill - ${sortedGames[0].attempts} forsøk <br>
          Gjennomsnitt - ${average}<hr>`



    return html

}


function compareBestGame(a, b) {
    return a.bestGame - b.bestGame;
}

function compareBestAverage(a, b) {
    return a.average - b.average;
}

function bestGame() {
    let html = ""
    const unique = [...new Map(model.leaderBoardList.map((m) => [m.userName, m])).values()];
    unique.sort(compareBestGame)
    for (i = 0; i < unique.length; i++) {
        html += `Spiller - ${unique[i].userName} <br>
          Beste spill - ${unique[i].bestGame} forsøk <br>
          Gjennomsnitt - ${unique[i].average}<hr>`
        console.log(unique[i].userName, unique[i].bestGame, unique[i].average)

    }
    return html

}

function bestAttempts() {
    let html = ""
    const unique = [...new Map(model.leaderBoardList.map((m) => [m.userName, m])).values()];
    unique.sort(compareBestAverage)
    for (i = 0; i < unique.length; i++) {
        html += `Spiller - ${unique[i].userName} <br>
          Beste spill - ${unique[i].bestGame} forsøk <br>
          Gjennomsnitt - ${unique[i].average}<hr>`
        console.log(unique[i].userName, unique[i].bestGame, unique[i].average)

    }
    return html



}