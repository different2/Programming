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
    if (player1Choice === "punch" && player2Choice === "punch") {
        updateHealth("player2", -12), updateHealth("player1", -12)
        return "It's a tie!";
    } else if (player1Choice === "punch" && player2Choice === "block") {
        // Player 2 blocks the punch, reduce damage by 9
        updateHealth("player2", -3); // Decrease health by 9 when blocking
        return "Player 2 blocks the punch and takes reduced damage!";
    } else if (player2Choice === "punch" && player1Choice === "block") {
        // Player 1 blocks the punch, reduce damage by 9
        updateHealth("player1", -3); // Decrease health by 9 when blocking
        return "Player 1 blocks the punch and takes reduced damage!";
    } else if (player1Choice === "punch") {
        // Apply full damage to player 2
        updateHealth("player2", -12); // Decrease health by 12 for each punch
        return "Player 1 punches! Player 2 takes 12 damage!";
    } else if (player2Choice === "punch") {
        // Apply full damage to player 1
        updateHealth("player1", -12); // Decrease health by 12 for each punch
        return "Player 2 punches! Player 1 takes 12 damage!";
    } else {
        // Neither player chooses punch, no damage is applied
        return "No damage is done.";
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