/**
 * Display a toast notification for level-up events.
 * @param {number} newLevel - The new level after leveling up.
 */
function showLevelUpToast(newLevel) {

  let currentTier = Math.floor(newLevel / 5) + 1;
  let currentLvl = newLevel % 5 + 1;
  let levelsLeft = 6 - currentLvl;
  const message = `🎉 Level Up! You're now level ${currentLvl} Tier ${currentTier}!\n${levelsLeft} level(s) left before next tier`;
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
        background: linear-gradient(135deg, #f59e42 0%, #d6852dff 100%); 
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

document.getElementById('new-post-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const postType = document.getElementById('post-type').value;
    const postTitle = document.getElementById('post-title').value;
    const postAuthor = document.getElementById('post-author').value;
    const postSnippet = document.getElementById('post-snippet').value;

    let workshopDetails = {};

    if (postType === 'workshop') {
        workshopDetails = {
            date: document.getElementById('workshop-date').value,
            time: document.getElementById('workshop-time').value,
            duration: document.getElementById('workshop-duration').value,
            limit: document.getElementById('attendee-limit').value || 'No limit'
        };
    }

    const newPost = {
        title: postTitle,
        meta: `Posted by ${postAuthor} | Just Now | 0 comments`,
        snippet: postSnippet,
        type: postType, // 'discussion', 'workshop', or 'job'
        workshop: workshopDetails, // Include workshop details if applicable
        // Define the button text based on the new post type
        linkText: postType === 'workshop' ? 'Join Workshop' : postType === 'job' ? 'View Post Details' : 'View Discussion'
        
    };

    // 1. Retrieve existing posts from localStorage or initialize an empty array
    let posts = JSON.parse(localStorage.getItem('communityPosts')) || [];

    // add level up
    levelUp();
    // 2. Prepend the new post (to show it at the top, newest first)
    posts.unshift(newPost);

    // 3. Save the updated list back to localStorage (Data Persistence)
    localStorage.setItem('communityPosts', JSON.stringify(posts));

    // 4. Redirect to the community page to see the updated list (with delay for toast visibility)
    setTimeout(() => {
        window.location.href = '../CommunityPage/community.html';
    }, 1500);
});