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

    // 2. Prepend the new post (to show it at the top, newest first)
    posts.unshift(newPost);

    // 3. Save the updated list back to localStorage (Data Persistence)
    localStorage.setItem('communityPosts', JSON.stringify(posts));

    // 4. Redirect to the community page to see the updated list
    window.location.href = '../CommunityPage/community.html';
});