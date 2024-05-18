// Global variables for turn and energy counters
var pendingDamage = { player1: 0, player2: 0 };
var totalPendingDamage = { player1: 0, player2: 0 };
var totalDamage = { player1: 0, player2: 0 };
var blockingDamage = { player1: 0, player2: 0 };
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
        pendingDamage.player2 += 60;
        totalDamage.player2 += 60;
        console.log("Pending damage to player 2:", pendingDamage.player2);
        updateHealth("player2", -pendingDamage.player2);
        pendingDamage.player2 = 0;
        return "player1 used punch!";
    } else if (player2Choice === "punch") {
        pendingDamage.player1 += 12;
        totalDamage.player1 += 12;
        console.log("Pending damage to player 1:", pendingDamage.player1);
        updateHealth("player1", -pendingDamage.player1);
        pendingDamage.player1 = 0;
        return "Player 2 used punch!";
    } else if (player1Choice === "block") {
        blockingDamage.player1 += 9; // Track blocking damage
        totalDamage.player1 -= 9;
        console.log("block damage to player 1:", totalDamage.player1);
        updateHealth("player1", +blockingDamage.player1);
        blockingDamage.player1 = 0;
        return "Player 1 used block!";
    } else if (player2Choice === "block") {
        blockingDamage.player2 += 30; // Track blocking damage
        totalDamage.player2 -= 30;
        console.log("block damage to player 2:", totalDamage.player2);
        updateHealth("player2", +blockingDamage.player2);
        blockingDamage.player2 = 0;
        return "Player 2 used block!";
    }
}


function endTurn() {

    updateTurnCounter();
    console.log("Turn:", updateTurnCounter)
    
    updateEnergyCounter();

    // Subtract pending damage from health bars
    updateHealth("player1", -totalDamage.player1);
    updateHealth("player2", -totalDamage.player2);

    // Clear pending damage bars
    resetPendingDamageBars();

    // Reset pending damage
    totalDamage.player1 = 0;
    totalDamage.player2 = 0;

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

function resetPendingDamageBars() {
    var pendingDamageBars = document.querySelectorAll('.pending-damage');
    pendingDamageBars.forEach(bar => {
        bar.style.width = '0px';
    });
}

// Function to update health bars and their text
function updateHealth(player, healthChange) {
    var healthBar = document.getElementById(player + "Health");
    var healthText = document.getElementById(player + "HealthText");
    var pendingDamageBar = document.getElementById(player + "PendingDamage");

    // Get current health value
    var currentHealth = parseInt(healthText.textContent);

    // Add pending damage to total pending damage
    totalPendingDamage[player] += pendingDamage[player];

   // Calculate new health value
    var newHealth = currentHealth - (pendingDamage[player] - blockingDamage[player]);

    // Ensure health stays within 0-100 range
    newHealth = Math.min(150, newHealth);


    // Calculate the width of the health bar based on the new health value
    var healthBarWidth = ((newHealth >= 0 ? newHealth : 0) / 150) * 150; // Assuming total health is 150 and health bar width is 150px

    // Calculate the width of the pending damage bar based on pending damage
    var pendingDamageWidth = ((totalDamage[player] >= 0 ? totalDamage[player] : 0) / 150) * 150; // Convert pending damage to a width in px

    // Update health text
    healthText.textContent = newHealth;

    // Update health bar width
    healthBar.style.width = healthBarWidth + "px";

    // Update pending damage bar width and position
    if (totalDamage[player] <= newHealth) {
        pendingDamageBar.style.width = pendingDamageWidth + "px";
    } else {
        pendingDamageBar.style.width = healthBarWidth + "px";
    }
    pendingDamageBar.style.left = healthBar.style.width;

    // Logging for debugging
    console.log("Current Health:", currentHealth);
    console.log("Health Change:", healthChange);
    console.log("Pending Damage:", pendingDamage[player]);
    console.log("total pending damage:", totalPendingDamage[player]);
    console.log("Total Damage:", totalDamage[player]);
    console.log("New Health:", newHealth);
    console.log("Health Bar Width:", healthBarWidth);
    console.log("Pending Damage Bar Width:", pendingDamageWidth);
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