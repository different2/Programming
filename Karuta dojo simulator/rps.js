// Global variables for turn and energy counters
var pendingDamage = {
    player1: 0,
    player2: 0
};
var player1PunchCount = 0;
var player2PunchCount = 0;
var turnCount = 0;
var energyCount = 1;

function usePlayer1() {
    // Check if player 1 has reached the maximum number of punch actions
    if (player1PunchCount < 3) {
        // Increment player 1's punch count
        player1PunchCount++;
        // Get player choices
        var player1Choice = document.getElementById("player1Choice").value;

         // Determine the damage and display result
         var result = determineDamage(player1Choice, player2Choice);
        document.getElementById("result").innerHTML = result;

        if (player1PunchCount === 3) {
        document.getElementById("useButtonPlayer1").disabled = true;
        }
    }
}
function usePlayer2() {
    // Check if player 2 has reached the maximum number of punch actions
    if (player2PunchCount < 3) {
        // Increment player 2's punch count
        player2PunchCount++;
        
        var player2Choice = document.getElementById("player2Choice").value;
        var result = determineDamage(player1Choice, player2Choice);
    document.getElementById("result").innerHTML = result;
     // Disable the "Use" button for player 2 if the maximum limit is reached
        if (player2PunchCount === 3) {
        document.getElementById("useButtonPlayer2").disabled = true;
        }
    }
}
// Function to apply damage
function determineDamage(player1Choice, player2Choice) {
    if (player1Choice === "punch") {
        pendingDamage.player2 += 12;
        console.log("Pending damage to player 2:", pendingDamage.player2);
        return "player1 used punch!";
    } else if (player2Choice === "punch") {
        pendingDamage.player1 += 12;
        console.log("Pending damage to player 1:", pendingDamage.player1);
        return "Player 2 used punch!";
    } else if (player1Choice === "block") {
        // Player 1 chooses to block, reduce pending damage to player 1 by 9
        pendingDamage.player1 = Math.max(pendingDamage.player1 - 9, 0);
        console.log("Pending damage to player 1 after block:", pendingDamage.player1);
        return "Player 1 used block!";
    } else if (player2Choice === "block") {
        // Player 2 chooses to block, reduce pending damage to player 2 by 9
        pendingDamage.player2 = Math.max(pendingDamage.player2 - 9, 0);
        console.log("Pending damage to player 2 after block:", pendingDamage.player2);
        return "Player 2 used block!";
    }
}

function endTurn() {
    // Increment turn counter
    updateTurnCounter();
    
    // Update energy counter
    updateEnergyCounter();

    // Subtract pending damage from health bars
    updateHealth("player1", -pendingDamage.player1);
    updateHealth("player2", -pendingDamage.player2);

    // Reset pending damage
    pendingDamage.player1 = 0;
    pendingDamage.player2 = 0;

    // Reset punch counts for both players
    player1PunchCount = 0;
    player2PunchCount = 0;
    // Enable the "Use" buttons for both players
    document.getElementById("useButtonPlayer1").disabled = false;
    document.getElementById("useButtonPlayer2").disabled = false;

    // Check if any player's health has reached zero
    var player1Health = parseInt(document.getElementById("player1HealthText").textContent);
    var player2Health = parseInt(document.getElementById("player2HealthText").textContent);
    console.log("Player 1 Health: " + player1Health + ", Player 2 Health: " + player2Health);
    if (player1Health <= 0) {
        document.getElementById("result").innerHTML = "Player 2 wins! Player 1's health reached zero.";
    } else if (player2Health <= 0) {
        document.getElementById("result").innerHTML = "Player 1 wins! Player 2's health reached zero.";
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
    var healthBarWidth = ((newHealth >= 0 ? newHealth : 0) / 150) * 150; // Assuming total health is 150 and health bar width is 150px

    // Update health text
    healthText.textContent = newHealth;

    // Update health bar width
    healthBar.style.width = healthBarWidth + "px";

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