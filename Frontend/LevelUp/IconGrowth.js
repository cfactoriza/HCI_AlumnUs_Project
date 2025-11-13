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
  // Save current level
  sessionStorage.setItem('userLevel', level);

  // Calculate tier and growth within the current tier
  const tier = Math.floor(level / levelsPerTier);
  const currentLevelInTier = (level % levelsPerTier) + 1;
  const growth = currentLevelInTier / levelsPerTier; // Scales from 0.2 to 1.0 within the tier
  const icon = icons[Math.min(tier, icons.length - 1)];

  // --- HTML/CSS TARGETING ---

  const levelIconImg = document.getElementById("level-icon-img");
  const levelInfo = document.getElementById("level-info");

  // 1. Update the image source (Icon Change)
  if (levelIconImg) {
      if (levelIconImg.src.indexOf(icon) === -1) {
          levelIconImg.src = icon;
      }
  }

  // 2. Apply the scaling transform (Growth Animation)
  if (levelIconImg) {
      // Scales the icon size from 1.0 (base size) up to 1.5 (max growth)
      levelIconImg.style.transform = `scale(${1 + growth * 0.25})`;
  }

  // 3. Update the Level Badge text
  if (levelInfo) {
      levelInfo.textContent =
        `Lv: ${currentLevelInTier}/${levelsPerTier} | Tier: ${Math.min(tier + 1, icons.length)}`;
  }
}

/**
 * Increments the user level and triggers the update.
 */
function levelUp() {
  const maxLevel = icons.length * levelsPerTier;

  if (level < maxLevel - 1) {
    level++;
    updateAvatar();

  } else if (level === maxLevel - 1) {
    // Handle final level up
    level++;
    updateAvatar();
    document.getElementById("level-info").textContent = "Max Level Reached!";

  } else {
    // Already max level
    document.getElementById("level-info").textContent = "Max Level Reached!";
  }
}

// Initial render when the script loads to set the current level and icon
window.onload = updateAvatar;