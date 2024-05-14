var turnCount = 0;
var energyCount = 1;

function playGame() {
var player1Choice = document.getElementById("player1Choice").value;
var player2Choice = document.getElementById("player2Choice").value;
var result = determineWinner(player1Choice, player2Choice);
document.getElementById("result").innerHTML = result;
updateTurnCounter();
updateEnergyCounter();
updateHealth(); // Update health bar after each round
}
function updateTurnCounter() {
turnCount += 1;
document.getElementById("turnCount").textContent = turnCount;
}
function updateEnergyCounter() {
if (document.getElementById("vigor").checked && turnCount > 1) {
energyCount = (turnCount + 2) * 0.75;
} else {
if (turnCount > 1 && turnCount % 2 === 0) {
    energyCount += 1;
}
}
var roundedEnergyCount = Math.floor(energyCount);
document.getElementById("energyCount").textContent = roundedEnergyCount;
}


// Function to determine the winner and apply damage
function determineWinner(player1Choice, player2Choice) {
    if (player1Choice === player2Choice) {
        return "It's a tie!";
    } else if ((player1Choice === "punch" && player2Choice === "block") || 
               (player1Choice === "block" && player2Choice === "punch")) {
        // Apply damage to the appropriate player's health bar
        updateHealth((player1Choice === "punch") ? "player2" : "player1", -10); // Decrease health by 10%
        return "Punch breaks through block! " + ((player1Choice === "punch") ? "Player 1" : "Player 2") + " wins!";
    } else {
        // The other player wins, no damage is applied
        return "Player " + ((player1Choice === "punch") ? "2" : "1") + " wins!";
    }
}

// Function to update health bars and their text
function updateHealth(player, healthChange) {
    var healthBar = document.getElementById(player + "Health");
    var healthText = document.getElementById(player + "HealthText");

    // Get current health percentage
    var currentHealth = parseInt(healthBar.style.width);

    // Calculate new health percentage
    var newHealth = currentHealth + healthChange;

    // Ensure health stays within 0-100 range
    newHealth = Math.max(0, Math.min(100, newHealth));

    // Update health bar width
    healthBar.style.width = newHealth + "%";

    // Update health text
    healthText.textContent = newHealth + "%";
}

// Function to play the game
function playGame() {
    var player1Choice = document.getElementById("player1Choice").value;
    var player2Choice = document.getElementById("player2Choice").value;
    var result = determineWinner(player1Choice, player2Choice);
    document.getElementById("result").innerHTML = result;
    updateTurnCounter();
    updateEnergyCounter();
}

// Example usage
const player1Choice = "punch";
const player2Choice = "block";
console.log(determineWinner(player1Choice, player2Choice));