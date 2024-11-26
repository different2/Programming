// Global variables
let incomingDamage = { player1: 0, player2: 0 };
let playerDamage = { player1: 0, player2: 0 };
let player1PunchCount = 0;
let player2PunchCount = 0;
let turnCount = 0;
let energyCount = 1;
let maxHealth = 150;
let playerHealth = { player1: maxHealth, player2: maxHealth };

function usePlayer1() {
    if (player1PunchCount < 3) {
        player1PunchCount++;
        let player1Choice = document.getElementById("player1Choice").value;
        let result = determineDamage("player1", player1Choice);
        document.getElementById("result").innerHTML = result;

        if (player1PunchCount === 3) {
            document.getElementById("useButtonPlayer1").disabled = true;
        }
    }
}

function usePlayer2() {
    if (player2PunchCount < 3) {
        player2PunchCount++;
        let player2Choice = document.getElementById("player2Choice").value;
        let result = determineDamage("player2", player2Choice);
        document.getElementById("result").innerHTML = result;

        if (player2PunchCount === 3) {
            document.getElementById("useButtonPlayer2").disabled = true;
        }
    }
}

function determineDamage(activePlayer, choice) {
    const targetPlayer = activePlayer === "player1" ? "player2" : "player1";
    
    if (choice === "punch") {
        incomingDamage[targetPlayer] += 12;
        playerDamage[targetPlayer] += 12;
        updateHealth(targetPlayer);
        return `${activePlayer} used punch!`;
    } else if (choice === "block") {
        const blockAmount = Math.min(9, incomingDamage[activePlayer]);
        incomingDamage[activePlayer] -= blockAmount;
        playerDamage[activePlayer] -= blockAmount;
        updateHealth(activePlayer);
        return `${activePlayer} used block!`;
    }
}

function endTurn() {
    // Apply damage and update health
    for (let player of ["player1", "player2"]) {
        playerHealth[player] = Math.max(0, playerHealth[player] - incomingDamage[player]);
        updateHealthDisplay(player);
    }

    // Reset counters and states
    incomingDamage = { player1: 0, player2: 0 };
    playerDamage = { player1: 0, player2: 0 };
    player1PunchCount = 0;
    player2PunchCount = 0;
    resetDamageBars();

    // Enable buttons
    document.getElementById("useButtonPlayer1").disabled = false;
    document.getElementById("useButtonPlayer2").disabled = false;

    // Update turn and energy
    turnCount++;
    document.getElementById("turnCount").textContent = turnCount;
    updateEnergyCounter();

    // Check win condition
    if (playerHealth.player1 <= 0) {
        document.getElementById("result").innerHTML = "Player 2 wins! Player 1's health reached zero.";
    } else if (playerHealth.player2 <= 0) {
        document.getElementById("result").innerHTML = "Player 1 wins! Player 2's health reached zero.";
    }
}

function updateHealth(player) {
    const healthBar = document.getElementById(player + "HealthBar");
    const healthText = document.getElementById(player + "HealthText");
    const incomingDamageBar = document.getElementById(player + "IncomingDamage");

    const currentHealth = playerHealth[player];
    const projectedHealth = currentHealth - incomingDamage[player];
    
    // Update health text
    healthText.innerHTML = `${currentHealth}<span class="arrow">→</span>${projectedHealth}/${maxHealth}`;

    // Update health bar (scale to pixels)
    const healthBarWidth = (currentHealth / maxHealth) * 150;
    healthBar.style.width = `${healthBarWidth}px`;

    // Update damage bar
    const damageWidth = (incomingDamage[player] / maxHealth) * 150;
    incomingDamageBar.style.width = `${Math.min(damageWidth, healthBarWidth)}px`;
    incomingDamageBar.style.left = `${healthBarWidth - Math.min(damageWidth, healthBarWidth)}px`;
}

function updateHealthDisplay(player) {
    const healthBar = document.getElementById(player + "HealthBar");
    const healthText = document.getElementById(player + "HealthText");
    
    const healthBarWidth = (playerHealth[player] / maxHealth) * 150;
    healthBar.style.width = `${healthBarWidth}px`;
    healthText.innerHTML = `${playerHealth[player]}/${maxHealth}`;
}

function resetDamageBars() {
    const damageBars = document.querySelectorAll('.incoming-damage');
    damageBars.forEach(bar => {
        bar.style.width = '0px';
        bar.style.left = '0px';
    });
}

function updateEnergyCounter() {
    if (document.getElementById("vigor").checked && turnCount > 1) {
        energyCount = (turnCount + 2) * 0.75;
    } else if (turnCount > 1 && turnCount % 2 === 0) {
        energyCount += 1;
    }
    document.getElementById("energyCount").textContent = Math.floor(energyCount);
}