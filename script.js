// script.js

function postStory() {
    const storyTitleInput = document.getElementById('story-title');
    const storyTitle = storyTitleInput.value.trim();
    const storyInput = document.getElementById('story-input');
    const storyContent = storyInput.value.trim();
    const uniqueId = Date.now(); // Unique ID for each story

    if (storyTitle && storyContent) {
        const feed = document.getElementById('feed');
        const newStory = document.createElement('article');
        newStory.classList.add('story');

        const storyHeader = document.createElement('div');
        storyHeader.classList.add('story-header');

        const profilePicture = document.createElement('img');
        profilePicture.src = 'profile-picture.jpg'; // Replace with actual profile picture URL
        profilePicture.alt = 'Profile Picture';
        profilePicture.classList.add('profile-picture');

        const username = document.createElement('span');
        username.textContent = 'Username'; // Replace with actual username
        username.classList.add('username');

        const starCount = document.createElement('span');
        starCount.classList.add('star-count');
        starCount.id = `star-count-${uniqueId}`;
        starCount.innerHTML = 'Stars: <b>0</b>';

        storyHeader.appendChild(profilePicture);
        storyHeader.appendChild(username);
        storyHeader.appendChild(starCount);

        const storyTitleElement = document.createElement('h3');
        storyTitleElement.textContent = storyTitle;

        const storyText = document.createElement('p');
        storyText.classList.add('story-content');
        storyText.id = `story-content-${uniqueId}`; // Unique ID for each story

        if (storyContent.length > 300) {
            storyText.innerHTML = `${storyContent.substring(0, 300)}<span class="more" onclick="toggleStory('${storyText.id}')">...more</span>`;
            storyText.dataset.fullContent = storyContent; // Store the full content
        } else {
            storyText.textContent = storyContent;
        }

        const storyActions = document.createElement('div');
        storyActions.classList.add('story-actions');
        storyActions.innerHTML = `
            <span><i class="fas fa-heart" onclick="toggleLike(this)"></i> Like <span class="count">0</span></span>
            <span><i class="fas fa-comment" onclick="toggleCommentSection('comment-section-${uniqueId}')"></i> Comment <span class="count">0</span></span>
            <span><i class="fas fa-share" onclick="toggleShare(this)"></i> Share <span class="count">0</span></span>
            <span><i class="fas fa-bookmark" onclick="toggleSave(this)"></i> Save <span class="count">0</span></span>
        `;

        const storyTime = document.createElement('p');
        storyTime.classList.add('story-time');
        storyTime.textContent = formatTimeAgo(new Date());

        const storyRating = document.createElement('div');
        storyRating.classList.add('story-rating');
        storyRating.innerHTML = `
            <i class="fas fa-star" onclick="rateStory(this, 1, 'star-count-${uniqueId}')"></i>
            <i class="fas fa-star" onclick="rateStory(this, 2, 'star-count-${uniqueId}')"></i>
            <i class="fas fa-star" onclick="rateStory(this, 3, 'star-count-${uniqueId}')"></i>
            <i class="fas fa-star" onclick="rateStory(this, 4, 'star-count-${uniqueId}')"></i>
            <i class="fas fa-star" onclick="rateStory(this, 5, 'star-count-${uniqueId}')"></i>
        `;

        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        commentSection.id = `comment-section-${uniqueId}`;
        commentSection.innerHTML = `
            <div class="comment-container">
                <div class="comments">
                    <!-- Comments will be dynamically inserted here -->
                </div>
            </div>
            <div class="comment-input-container">
                <textarea placeholder="Add a comment..."></textarea>
                <button type="button" onclick="postComment('comment-section-${uniqueId}')">Post</button>
            </div>
        `;

        newStory.appendChild(storyHeader);
        newStory.appendChild(storyTitleElement);
        newStory.appendChild(storyTime);
        newStory.appendChild(storyText);
        newStory.appendChild(storyActions);
        newStory.appendChild(storyRating);
        newStory.appendChild(commentSection);

        feed.insertBefore(newStory, feed.firstChild);

        // Clear the input fields
        storyTitleInput.value = '';
        storyInput.value = '';
    } else {
        alert('Please enter a title and write a story before posting.');
    }
}

function applyEventListeners() {
    const feed = document.getElementById('feed');
    feed.querySelectorAll('.fa-comment').forEach(commentIcon => {
        const commentSectionId = commentIcon.getAttribute('onclick').match(/'(.+)'/)[1];
        commentIcon.setAttribute('onclick', `toggleCommentSection('${commentSectionId}')`);
    });
}

function toggleStory(storyId) {
    const storyElement = document.getElementById(storyId);
    const isExpanded = storyElement.classList.toggle('expanded');

    if (isExpanded) {
        storyElement.innerHTML = `${storyElement.dataset.fullContent}<span class="back" onclick="toggleStory('${storyId}')"> back</span>`;
    } else {
        storyElement.innerHTML = `${storyElement.dataset.fullContent.substring(0, 300)}<span class="more" onclick="toggleStory('${storyId}')">...more</span>`;
    }
}

function toggleIcon(element) {
    element.classList.toggle('active');
}

function toggleLike(element) {
    toggleIcon(element);
    const countElement = element.nextElementSibling;
    let count = parseInt(countElement.textContent);
    count = element.classList.contains('active') ? count + 1 : count - 1;
    countElement.textContent = count;
}

function toggleShare(element) {
    toggleIcon(element);
    const countElement = element.nextElementSibling;
    let count = parseInt(countElement.textContent);
    count = element.classList.contains('active') ? count + 1 : count - 1;
    countElement.textContent = count;
}

function toggleSave(element) {
    toggleIcon(element);
    const countElement = element.nextElementSibling;
    let count = parseInt(countElement.textContent);
    count = element.classList.contains('active') ? count + 1 : count - 1;
    countElement.textContent = count;
}

function formatTimeAgo(date) {
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    if (secondsAgo < 60) {
        return `${secondsAgo} seconds ago`;
    } else if (minutesAgo < 60) {
        return `${minutesAgo} minutes ago`;
    } else if (hoursAgo < 24) {
        return `${hoursAgo} hours ago`;
    } else if (daysAgo === 1) {
        return `1 day ago`;
    } else {
        return `${daysAgo} days ago`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyEventListeners();
});
