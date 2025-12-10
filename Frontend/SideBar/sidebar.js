document.addEventListener('DOMContentLoaded', function() {
    // 1. Fetch the content of the sidebar.html file
    fetch('../SideBar/sidebar.html')
        .then(response => response.text())
        .then(html => {
            // 2. Insert the HTML content into the body
            document.body.insertAdjacentHTML('afterbegin', html);
            updateAvatar();
        })
        .catch(error => {
            console.error('Error loading the sidebar:', error);
        });
});