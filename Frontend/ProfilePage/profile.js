function showLevelUpToast(newLevel) {
    let currentTier = Math.floor(newLevel / 5) + 1;
    let currentLvl = newLevel % 5 + 1;

    const message = `🎉 Level Up! You're now level ${currentLvl} Tier ${currentTier}!`;
    console.log(message);

    const levelUpToast = document.createElement('div');
    levelUpToast.className = 'level-up-toast';
    levelUpToast.textContent = message;
    document.body.appendChild(levelUpToast);

    // Add keyframes and styles once
    if (!document.querySelector('style[data-level-up-css]')) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-level-up-css', 'true');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
    @keyframes levelup-fadein { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes levelup-fadeout { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); } }
    .level-up-toast { 
    position: fixed; 
    top: 20px; 
    left: 50%; 
    transform: translateX(-50%); 
    padding: 16px 24px; 
    background: linear-gradient(135deg, #f59e42 0%, #e88d2dff 100%); 
    color: #fff; 
    border-radius: 8px; 
    box-shadow: 0 4px 12px rgba(0,0,0,0.3); 
    z-index: 1000; 
    font-weight: 600; 
    font-size: 16px;
    animation: levelup-fadein 0.4s, levelup-fadeout 0.4s 4.6s; 
    }
    `;
    document.head.appendChild(styleSheet);
    }

    setTimeout(() => levelUpToast.remove(), 5000);
}

function addLevel(){
    let level = parseInt(sessionStorage.getItem('userLevel')) || 0;
    level++;
    showLevelUpToast(level);
    sessionStorage.setItem('userLevel', level);
    
    
    // Redirect to home page after toast displays
    setTimeout(() => {
        window.location.href = '../HomePage/home.html';
    }, 1500);
}
