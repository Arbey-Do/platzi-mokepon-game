let startGame = () => {
  const mokepones = [
    "Hipodoge",
    "Capipepo",
    "Ratigueya",
    // "Langostelvis",
    // "Tucapalma",
    // "Pydos",
  ];

  const [hipodoge, capipepo, ratigueya] = mokepones;

  const attacks = ["Fire", "Water", "Ground"];

  const [fire, water, ground] = attacks;

  let playerPet = null;
  let enemyPet = null;

  let playerAttack = null;
  let enemyAttack = null;

  let playerLifes = 3;
  let enemyLifes = 3;

  let gameStatus = null;

  const petLabels = document.getElementsByClassName("pets__label");
  const inputHipodoge = document.querySelector("#hipodoge");
  const inputCapipepo = document.querySelector("#capipepo");
  const inputRatihueya = document.querySelector("#ratigueya");
  const playerPetName = document.querySelector("#player-pet-name");
  const enemyPetName = document.querySelector("#enemy-pet-name");
  const selectPetButton = document.querySelector("#pet-select-button");
  const fireAttackButton = document.querySelector("#fire-attack-button");
  const waterAttackButton = document.querySelector("#water-attack-button");
  const groundAttackButton = document.querySelector("#ground-attack-button");
  const playerLifesText = document.querySelector("#player-lifes");
  const enemyLifesText = document.querySelector("#enemy-lifes");
  const gameInfo = document.querySelector("#info");
  const reloadButton = document.querySelector("#reload-button");
  const attacksSection = document.querySelector("#attacks");
  const petStatus = document.querySelector("#pet-status");

  const minPet = 0;
  const maxPet = 2;

  const playFireAttack = () => {
    playerAttack = fire;
    startFight();
  };

  const playWaterAttack = () => {
    playerAttack = water;
    startFight();
  };

  const playGroundAttack = () => {
    playerAttack = ground;
    startFight();
  };

  const startFight = () => {
    selectEnemyAtack();
    let fightWinner = "Player WINS THIS TURN!";

    if (playerAttack == enemyAttack) {
      fightWinner = "TIE!";
    } else if (playerAttack == fire && enemyAttack == ground) {
      enemyLifes -= 1;
      enemyLifesText.innerHTML = enemyLifes;
    } else if (playerAttack === water && enemyAttack === fire) {
      enemyLifes -= 1;
      enemyLifesText.innerHTML = enemyLifes;
    } else if (playerAttack === ground && enemyAttack === water) {
      enemyLifes -= 1;
      enemyLifesText.innerHTML = enemyLifes;
    } else {
      playerLifes -= 1;
      playerLifesText.innerHTML = playerLifes;
      fightWinner = "Enemy WINS THIS TURN!";
    }

    gameStatus = `${playerPet} attacks with ${playerAttack}, ${enemyPet} attacks with ${enemyAttack} - ${fightWinner}`;

    showGameStatus(gameStatus);

    checkGameWinner();
  };

  const checkGameWinner = () => {
    if (enemyLifes && playerLifes) {
      return;
    } else if (enemyLifes == 0) {
      gameStatus = "GAME OVER! PLAYER WINS";
    } else if (playerLifes == 0) {
      gameStatus = "GAME OVER! ENEMY WINS";
    }

    fireAttackButton.disabled = true;
    waterAttackButton.disabled = true;
    groundAttackButton.disabled = true;
    selectPetButton.disabled = true;

    showGameStatus(gameStatus);
  };

  const reloadGame = () => {
    location.reload();
  };

  // Creates a p element that shows some game status
  const showGameStatus = (status) => {
    const p = document.createElement("p");
    const text = document.createTextNode(status);
    p.appendChild(text);
    gameInfo.appendChild(p);
  };

  // Select an enemy attack from attacks array
  const selectEnemyAtack = () => {
    enemyAttack = attacks[getRandom(0, attacks.length - 1)];
  };

  // Return a random number between min and max, including two values
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Selects a random pet from the mokepones array
  const selectEnemyPet = () => {
    enemyPet = mokepones[getRandom(minPet, maxPet)];
  };

  // Sets the enemy pet name and the it's live in the html
  const showEnemyPet = () => {
    selectEnemyPet();
    enemyPetName.innerHTML = enemyPet;
    enemyLifesText.innerHTML = enemyLifes;
  };

  // Sets the player pet name and the it's live in the html
  const showPlayerPet = () => {
    playerPetName.innerHTML = playerPet;
    playerLifesText.innerHTML = playerLifes;
  };

  // Allows player select a pet
  const selectPlayerPet = () => {
    if (inputHipodoge.checked) {
      playerPet = hipodoge;
    } else if (inputCapipepo.checked) {
      playerPet = capipepo;
    } else if (inputRatihueya.checked) {
      playerPet = ratigueya;
    } else {
      alert("you've still not select a Mokepon!");
      return;
    }

    showPetStatus();
    showAttacks();
  };

  const hidePetStatus = () => {
    petStatus.style.display = "none";
  };

  const showPetStatus = () => {
    showPlayerPet();
    showEnemyPet();
    petStatus.style.display = "block";
    showReloadButton();
  };

  const hideAttacks = () => {
    attacksSection.style.display = "none";
  };

  const showAttacks = () => {
    attacksSection.style.display = "block";
  };

  const showReloadButton = () => {
    reloadButton.style.display = "inline-block";
  };

  const hideReloadButton = () => {
    reloadButton.style.display = "none";
  };

  const selectPet = () => {
    selectPetButton.disabled = false;
    selectPetButton.classList.add("enabled-button");
  };

  const setPetLabelListeners = () => {
    for (let item of petLabels) {
      item.addEventListener("click", selectPet);
    }
  };

  selectPetButton.addEventListener("click", selectPlayerPet);
  fireAttackButton.addEventListener("click", playFireAttack);
  waterAttackButton.addEventListener("click", playWaterAttack);
  groundAttackButton.addEventListener("click", playGroundAttack);
  reloadButton.addEventListener("click", reloadGame);
  selectPetButton.disabled = true;
  setPetLabelListeners();
  hidePetStatus();
  hideAttacks();
  hideReloadButton();
};

// Waits the HTML is completly loaded to start the game.
window.addEventListener("load", startGame);
