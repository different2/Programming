var playerDamage = 0;
let maxHealth = 150;

document.getElementById("useButton").addEventListener("click", 
function() {
    document.getElementById("displayText").innerText = "player used punch!";
});



function use() {
    playerDamage += 60;
    console.log("Incoming damage to player 2:", playerDamage);
    updateHealth("player2", -playerDamage);
}


function updateHealth() {
    var healthText = document.getElementById("playerHealthText");

    var oldHealth = parseInt(healthText.textContent.split('/')[0].replace('→', ''));
    var newHealth = oldHealth - playerDamage;
    
    healthText.innerHTML = `${oldHealth}<span class="arrow">&#8594;</span> ${newHealth}/${maxHealth}`;

}