document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('postsContainer');
  const searchInput = document.getElementById('searchInput');

  const API_URL = 'https://dummyjson.com/posts';

  
  async function fetchPosts() {
      try {
          const response = await fetch(API_URL);
          const data = await response.json();
          return data.posts;
      } catch (error) {
          console.error('Error fetching posts:', error);
          return [];
      }
  }

  
  function renderPosts(posts) {
      postsContainer.innerHTML = '';
      posts.forEach(post => {
          const likes = Math.floor(post.reactions * 0.6); 
          const dislikes = post.reactions - likes; 

          const postCard = document.createElement('div');
          postCard.classList.add('post-card');
          postCard.innerHTML = `
              <h2 class="post-title">${post.title}</h2>
              <p class="post-body">${post.body}</p>
              <div class="post-tags">
                  ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
              </div>
              <div class="post-footer">
                  <div class="left">
                      <span class="icon like-icon">👍</span> ${likes}
                      <span class="icon dislike-icon">👎</span> ${dislikes}
                  </div>
                  <div class="right">
                      <span class="icon view-icon">👁️</span> ${post.views || 0}
                  </div>
              </div>
          `;
          postsContainer.appendChild(postCard);
      });
  }


  function filterPosts(posts, query) {
      return posts.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
  }

  // Initialize the app
  async function init() {
      const posts = await fetchPosts();
      renderPosts(posts);

      // Add event listener for search
      searchInput.addEventListener('input', (e) => {
          const filteredPosts = filterPosts(posts, e.target.value);
          renderPosts(filteredPosts);
      });
  }

  init();
});
