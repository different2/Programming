let playerDamage = 0;
let maxHealth = 150;
let currentHealth = maxHealth;

document.getElementById("useButton").addEventListener("click", 
function() {
    document.getElementById("displayText").innerText = "player used punch!";
});



function use() {
    playerDamage += 12;
    console.log("Incoming damage to player:", playerDamage);
   
}
function endTurn() {
    updateHealth("player", -playerDamage.player);
    currentHealth -= playerDamage;
    playerDamage = 0;
    console.log("currentHealth:", currentHealth);
}


function updateHealth() {
    let healthBar = document.getElementById("HealthBar");
    let healthText = document.getElementById("playerHealthText");

    let Health = Math.min(maxHealth-playerDamage,maxHealth);

    let newHealth = Health - playerDamage;
 
    let healthBarWidth = (newHealth / maxHealth) * 100;

    if (playerDamage > 0) {
        healthText.innerHTML = `${currentHealth}<span class="arrow">&#8594;</span> ${newHealth}/${maxHealth}`;
        console.log("healthText.innerHTML:",   healthText.innerHTML);
    } else {
 
        healthText.innerHTML = `${newHealth}/${maxHealth}`;
        console.log("healthText.innerHTML:",   healthText.innerHTML);
    }

    
    healthBar.style.width = healthBarWidth + "%";


console.log("healthBar.style.width:", healthBar.style.width);
console.log("healthText.textContent:", healthText.textContent);


}