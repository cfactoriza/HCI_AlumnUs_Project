const icons = [
  "../LevelUp/Images/Level1.png", // Tier 1 (Lv 1-5)
  "../LevelUp/Images/Level2.png", // Tier 2 (Lv 6-10)
  "../LevelUp/Images/Level3.png", // Tier 3 (Lv 11-15)
  "../LevelUp/Images/Level4.png", // Tier 4 (Lv 16-20)
  "../LevelUp/Images/Level5.png", // Tier 5 (Lv 21-25)
  "../LevelUp/Images/Level6.png"  // Tier 6 (Lv 26-30)
];
const levelsPerTier = 5; // 5 levels per tier
// We use sessionStorage for simple state persistence across page reloads
let level = parseInt(sessionStorage.getItem('userLevel')) || 0;

/**
 * Calculates the current tier, growth, and updates the level icon and info badge.
 */
function updateAvatar() {
  const level = parseInt(sessionStorage.getItem('userLevel')) || 0;

  const tier = Math.floor(level / levelsPerTier);
  const currentLevelInTier = (level % levelsPerTier) + 1;
  const growth = currentLevelInTier / levelsPerTier;
  const icon = icons[Math.min(tier, icons.length - 1)];

  const levelIconImg = document.getElementById("level-icon-img");
  const levelInfo = document.getElementById("level-info");

  if (!levelIconImg || !levelInfo) return;

  levelIconImg.src = icon;
  levelIconImg.style.transform = `scale(${1 + growth * 0.25})`;

  levelInfo.textContent =
    `Lv ${currentLevelInTier}/${levelsPerTier} • Tier ${tier + 1}`;
}

window.updateAvatar = updateAvatar;

/**
 * Increments the user level and triggers the update.
 */
function levelUp() {
  let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
  const maxLevel = icons.length * levelsPerTier;

  if (level < maxLevel) { // Only increment if we haven't reached the absolute max
    level++;
    sessionStorage.setItem('userLevel', level); // Save the new level instantly
    // updateAvatar(); // Call the function that updates the sidebar HTML instantly
    window.dispatchEvent(new Event('userLevelUpdated')); // Notify other parts of the app

    // You can add logic for a "Level Up!" toast notification here if desired
    console.log(`Leveled up to: ${level}`);

  } else {
    console.log("Maximum level reached!");
  }
}

// Initial render when the script loads to set the current level and icon
// window.onload = updateAvatar;
