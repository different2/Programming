// Global variables for turn and energy counters
var turnCount = 0;
var energyCount = 1;

// Function to play the game
function playGame() {
    // Increment turn counter
    updateTurnCounter();
    
    // Get player choices
    var player1Choice = document.getElementById("player1Choice").value;
    var player2Choice = document.getElementById("player2Choice").value;
    
    // Determine the winner and display result
    var result = determineWinner(player1Choice, player2Choice);
    document.getElementById("result").innerHTML = result;
    
    // Update energy counter
    updateEnergyCounter();
    
    // Check if any player's health has reached zero
    var player1Health = parseInt(document.getElementById("player1Health").style.width);
    var player2Health = parseInt(document.getElementById("player2Health").style.width);
    console.log("Player 1 Health: " + player1Health + ", Player 2 Health: " + player2Health);
    if (player1Health <= 0) {
        document.getElementById("result").innerHTML = "Player 2 wins! Player 1's health reached zero.";
    } else if (player2Health <= 0) {
        document.getElementById("result").innerHTML = "Player 1 wins! Player 2's health reached zero.";
    }
}

// Function to update turn counter
function updateTurnCounter() {
    turnCount += 1;
    document.getElementById("turnCount").textContent = turnCount;
}

// Function to update energy counter
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
        updateHealth((player1Choice === "punch") ? "player2" : "player1", -12); 
        return "Punch breaks through block! " + ((player1Choice === "punch") ? "Player 1" : "Player 2") + " wins!";
    } else {
        // The other player wins, no damage is applied
        updateHealth((player1Choice === "block") ? "player2" : "player1", +10);
        return "Player " + ((player1Choice === "punch") ? "2" : "1") + " wins!";
    }
}

// Function to update health bars and their text
function updateHealth(player, healthChange) {
    var healthBar = document.getElementById(player + "Health");
    var healthText = document.getElementById(player + "HealthText");

    // Get current health value
    var currentHealth = parseInt(healthText.textContent);

    // Calculate new health value
    var newHealth = currentHealth + healthChange;

    // Calculate the width of the health bar based on the new health value
    var healthBarWidth = ((newHealth >= 0 ? newHealth : 0) / 150) * 150; // Assuming total health is 150 and health bar width is 300px

    // Update health text
    healthText.textContent = newHealth;

    // Update health bar width
    healthBar.style.width = healthBarWidth + "px";

}