const icons = [
  "Images/Level1.png",
  "Images/Level2.png",
  "Images/Level3.png",
  "Images/Level4.png",
  "Images/Level5.png",
  "Images/Level6.png"
];
const levelsPerTier = 5; // 5 levels per tier
let level = 0;

function updateAvatar() {
  const tier = Math.floor(level / levelsPerTier);
  const growth = ((level % levelsPerTier) + 1) / levelsPerTier; // 0.2, ..., 1
  const icon = icons[Math.min(tier, icons.length - 1)];

  const avatar = document.getElementById("avatar-img");
  avatar.src = icon;
  avatar.style.transform = `scale(${1 + growth * 0.5})`;

  document.getElementById("level-info").textContent =
    `Level: ${(level % levelsPerTier) + 1} / ${levelsPerTier} — Tier: ${Math.min(tier + 1, icons.length)}`;
}

function levelUp() {
  if (level < icons.length * levelsPerTier - 1) {
    level++;
    updateAvatar();
  } else {
    document.getElementById("level-info").textContent = "Max level reached!";
  }
}

// Initial render
updateAvatar();
