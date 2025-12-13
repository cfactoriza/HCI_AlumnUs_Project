function loadAndRenderPosts() {
    const postsContainer = document.querySelector('.posts-section');
    if (!postsContainer) return;

    // Helper to format date/time nicely
    function formatWorkshopMeta(post) {
        if (post.type !== 'workshop' || !post.workshop || !post.workshop.date) {
            return '';
        }

        const dateObj = new Date(post.workshop.date + 'T' + post.workshop.time);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
        const formattedTime = post.workshop.time ? post.workshop.time : 'TBD';

        const durationText = post.workshop.duration ? `${post.workshop.duration} min` : 'Unknown duration';
        const limitText = post.workshop.limit !== 'No limit' ? `Limit: ${post.workshop.limit} attendees` : 'No attendee limit';


        return `
            <div class="workshop-details">
                <p><strong>Date:</strong> ${formattedDate} @ ${formattedTime}</p>
                <p><strong>Duration:</strong> ${durationText}</p>
                <p><strong>Capacity:</strong> ${limitText}</p>
            </div>
        `;
    }

    // 1. Retrieve dynamically created posts from localStorage
    const dynamicPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    
    // 2. Define the original static posts content
    const staticPostsContent = `
        <div class="post-card">
            <h3 class="post-title">Alumni Mentor Needed: Transitioning from Academia to Tech</h3>
            <p class="post-meta">Posted by Sarah J. (Student '25) | 5 hours ago | 12 comments</p>
            <p class="post-snippet">I'm a final-year CS student looking for an alumnus with experience in transitioning from academic research (AI/ML) to a corporate role. Any advice on resume formatting and interview prep would be greatly appreciated...</p>
            <a href="#" class="read-more">View Discussion</a>
        </div>

        <div class="post-card">
            <h3 class="post-title">Which Elective is Better: Advanced Algorithms vs. Distributed Systems?</h3>
            <p class="post-meta">Posted by Alex K. (Alumnus '18) | Yesterday | 35 comments</p>
            <p class="post-snippet">Hey everyone, I'm thinking of brushing up my skills. For current students, which elective offers better real-world skills? Any specific professor recommendations for either course?...</p>
            <a href="#" class="read-more">View Discussion</a>
        </div>

        <div class="post-card">
            <h3 class="post-title">Job Post: Senior Analyst Role at 'Innovate Global' (Alumni Referral)</h3>
            <p class="post-meta">Posted by Michael D. (Alumnus '12) | 2 days ago | 8 comments</p>
            <p class="post-snippet">My company is hiring for a Senior Data Analyst. We specifically encourage applicants from our university network. The deadline is next Friday. Link to job description attached...</p>
            <a href="#" class="read-more">View Post Details</a>
        </div>
    `;

    // 3. Clear existing content and re-render header
    postsContainer.innerHTML = '<h2 class="section-title">Latest Discussions & Requests</h2>';

    // 4. Render dynamic posts first (newest at the top)
    dynamicPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        // Apply the special 'workshop-card' class if the type is workshop
        const cardClass = post.type === 'workshop' ? 'post-card workshop-card' : 'post-card';
        
        postElement.className = cardClass;
        postElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div style="flex: 1;">
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-meta">${post.meta}</p>
                    ${formatWorkshopMeta(post)}
                    <p class="post-snippet">${post.snippet}</p>
                    <a href="#" class="read-more">${post.linkText}</a>
                </div>
                <button class="delete-post-btn" data-index="${index}" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; white-space: nowrap; margin-left: 12px;">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-post-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            if (confirm('Are you sure you want to delete this post?')) {
                dynamicPosts.splice(index, 1);
                localStorage.setItem('communityPosts', JSON.stringify(dynamicPosts));
                loadAndRenderPosts(); // Re-render the posts
            }
        });
    });

    // 5. Append the original static posts content
    postsContainer.insertAdjacentHTML('beforeend', staticPostsContent);
}

// Run the function on page load
window.onload = loadAndRenderPosts;