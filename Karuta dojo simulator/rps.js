// Global variables for turn and energy counters
var incomingDamage = { player1: 0, player2: 0 };
var playerDamage = { player1: 0, player2: 0};
var player1PunchCount = 0;
var player2PunchCount = 0;
var turnCount = 0;
var energyCount = 1;
let maxHealth = 150;

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
        incomingDamage.player2 += 12;
        playerDamage.player2 += 12;
        console.log("Incoming damage to player 2:", playerDamage.player2);
        updateHealth("player2", -playerDamage.player2);
        playerDamage.player2 = 0;
        return "player1 used punch!";
    } else if (player2Choice === "punch") {
        incomingDamage.player1 += 12;
        playerDamage.player1 += 12;
        console.log("Incoming damage to player 1:", playerDamage.player1);
        updateHealth("player1", -playerDamage.player1);
        playerDamage.player1 = 0;
        return "Player 2 used punch!";
    } else if (player1Choice === "block") {
        incomingDamage.player1 -= 9;
        playerDamage.player1 -= 9;
        console.log("block damage to player 1:", playerDamage.player1);
        updateHealth("player1", +incomingDamage.player1);
        playerDamage.player1 = 0;
        return "Player 1 used block!";
    } else if (player2Choice === "block") {
        incomingDamage.player2 -= 9;
        playerDamage.player2 -= 9;
        console.log("block damage to player 2:", playerDamage.player2);
        updateHealth("player2", +incomingDamage.player2);
        playerDamage.player2 = 0;
        return "Player 2 used block!";
    }
}


function endTurn() {

    updateTurnCounter();
    console.log("Turn:", updateTurnCounter)
    
    updateEnergyCounter();

    // Subtract incoming damage from health bars
    updateHealth("player1", -incomingDamage.player1);
    updateHealth("player2", -incomingDamage.player2);

    // Clear incoming damage bars
    resetDamageBars();

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

function resetDamageBars() {
    var damageBars = document.querySelectorAll('.incoming-damage');
    damageBars.forEach(bar => {
        bar.style.width = '0px';
    });
}

// Function to update health bars and their text
function updateHealth(player) {
    var healthBar = document.getElementById(player + "HealthBar");
    var healthText = document.getElementById(player + "HealthText");
    var incomingDamageBar = document.getElementById(player + "IncomingDamage");

    // Get old health value
    var oldHealth = parseInt(healthText.textContent.split('/')[0].replace('→', ''));

   // Calculate new health value
    var newHealth = oldHealth - incomingDamage[player];

       // Ensure health stays within 0-100 range
       newHealth = Math.min(150, newHealth);

    healthText.innerHTML = `${oldHealth}<span class="arrow">&#8594;</span> ${newHealth}/${maxHealth}`;


 


    // Calculate the width of the health bar based on the new health value
    var healthBarWidth = ((newHealth >= 0 ? newHealth : 0) / 150) * 150; // Assuming total health is 150 and health bar width is 150px

    // Calculate the width of the damage bar based on incoming damage
    var damageBarWidth = ((incomingDamage[player] >= 0 ? incomingDamage[player] : 0) / 150) * 150; // Convert incoming damage to a width in px

    // Update health bar width
    healthBar.style.width = healthBarWidth + "px";

    // Update incoming damage bar width and position
    if (incomingDamage[player] <= newHealth) {
        incomingDamageBar.style.width = damageBarWidth + "px";
    } else {
        incomingDamageBar.style.width = healthBarWidth + "px";
    }
    incomingDamageBar.style.left = healthBar.style.width;

    // Logging for debugging
    console.log("old Health:", oldHealth);
    console.log("Incoming Damage:", incomingDamage[player]);
    console.log("Player Damage:", playerDamage[player]);
    console.log("New Health:", newHealth);
    console.log("Health Bar Width:", healthBarWidth);
    console.log("Incoming Damage Bar Width:", damageBarWidth);
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