// Character Class
class Character {
  // Constructor to create a character object
  constructor(name, attack, defense) {
    this.name = name;
    this.attack = attack;
    this.hp = 100;
    this.defense = defense;
    this.status = "Ready for battle";
    this.statusMsg = "";
  }

  // Method to attack the target character
  attackTarget(target) {
    // Calculate the damage inflicted based on the attack and defense values
    const damage = Math.max(0, this.attack - target.defense);

    // Reduce the target's HP by the calculated damage
    target.hp = Math.max(0, target.hp - damage);

    // Set the status of the target character to indicate they have been attacked
    target.status = `${
      target === player ? "Player" : "Enemy"
    } has been attacked`;

    // Update the character stats on the document
    updateStats();
  }

  // Method to drink a potion
  drinkPotion() {
    // Array of available potions with their effects and HP values
    const potions = [
      {flavor: "Uh oh... Poison", hp: 0, effect: "fall unconscious"},
      {flavor: "Health Potion ", hp: 100, effect: "regain full hp"},
      {flavor: "Refreshing Beverage", hp: 5, effect: "+5 hp"},
    ];

    // Select a random potion from the potions array
    const potion = potions[Math.floor(Math.random() * potions.length)];

    // Apply the effect of the selected potion
    if (potion.hp === 0) {
      this.hp = 0; // Set HP to 0 if the effect is to fall unconscious
    } else {
      // Increase HP by the potion's HP value, the max hp is 100
      this.hp = Math.min(100, this.hp + potion.hp);
    }

    // Set the character's status to the potion flavor text
    this.status = potion.flavor;

    // If player is already at 100hp, set statusMsg to 'already at full health', else set statusMsg to the potion effect text
    if (potion.hp === 100 && this.hp === 100) {
      this.statusMsg = "Already at full health!";
    } else {
      this.statusMsg = potion.effect;
    }

    // Update the character stats on the document
    updateStats();
  }
}

// Create player and enemy objects
const player = new Character("Player", 10, 5);
const enemy = new Character("Enemy", 8, 3);

// Function to update the character stats on the document
// Arrays contain id's for each value which is used in getElementById to update text
function updateStats() {
  // Array of stat objects for the player character
  const playerStats = [
    {id: "playerAttack", value: player.attack},
    {id: "playerHP", value: player.hp},
    {id: "playerDefense", value: player.defense},
    {id: "playerStatus", value: player.status},
    {id: "playerStatusMsg", value: player.statusMsg},
  ];

  // Array of stat objects for the enemy character
  const enemyStats = [
    {id: "enemyAttack", value: enemy.attack},
    {id: "enemyHP", value: enemy.hp},
    {id: "enemyDefense", value: enemy.defense},
    {id: "enemyStatus", value: enemy.status},
    {id: "enemyStatusMsg", value: enemy.statusMsg},
  ];

  // Update the players stats on the document
  for (const stat of playerStats) {
    // Find element by its ID and update text content with the stat value
    document.getElementById(stat.id).textContent = stat.value;
  }

  // Update the enemys stats on the document
  for (const stat of enemyStats) {
    // Find the element by its ID and update text content with the stat value
    document.getElementById(stat.id).textContent = stat.value;
  }
}

// Function to initialize the game and set up event listeners
function initializeGame() {
  // Event listeners for player's actions
  document.getElementById("playerAction").addEventListener("click", () => {
    // Attack button clicked
    player.attackTarget(enemy);
  });

  document.getElementById("playerDrinkPotion").addEventListener("click", () => {
    // Drink Potion button clicked
    player.drinkPotion();
  });

  // Event listeners for enemy's actions
  document.getElementById("enemyAction").addEventListener("click", () => {
    // Attack button clicked
    enemy.attackTarget(player);
  });

  document.getElementById("enemyDrinkPotion").addEventListener("click", () => {
    // Drink Potion button clicked
    enemy.drinkPotion();
  });

  // Initial update of character stats on the document
  updateStats();
}

// DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", initializeGame);
