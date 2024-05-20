var playerDamage = 0;
let maxHealth = 150;

document.getElementById("useButton").addEventListener("click", 
function() {
    document.getElementById("displayText").innerText = "player used punch!";
});



function use() {
    playerDamage += 60;
    console.log("Pending damage to player 2:", playerDamage);
    updateHealth("player2", -playerDamage);
}


function updateHealth() {
    var healthText = document.getElementById("playerHealthText");

    var currentHealth = parseInt(healthText.textContent.split('/')[0].replace('→', ''));
    var newHealth = currentHealth - playerDamage;
    
    var healthDisplay = `${currentHealth}<span class="arrow">&#8594;</span> ${newHealth}/${maxHealth}`;

    healthText.innerHTML = healthDisplay;


console.log("maxHealth:", maxHealth);

}