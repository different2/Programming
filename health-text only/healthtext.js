var playerDamage = 0;
let maxHealth = 150;
let previousValue = 0;

document.getElementById("useButton").addEventListener("click", 
function() {
    document.getElementById("displayText").innerText = "player used punch!";
});



function use() {
    previousValue = playerDamage; 
    playerDamage += 60;
    console.log("Pending damage to player 2:", playerDamage);
    updateHealth("player2", -playerDamage);
}


function updateHealth() {
    var healthText = document.getElementById("playerHealthText");

    if (playerDamage === previousValue+60 ) {
        maxHealth += 1;
    }

    var currentHealth = parseInt(healthText.textContent.split('/')[0].replace('→', '').trim());
    var newHealth = currentHealth - playerDamage;
    healthText.innerHTML = `${currentHealth}<span class="arrow">&#8594;</span> ${newHealth}/${maxHealth}`;




console.log("maxHealth:", maxHealth);

}