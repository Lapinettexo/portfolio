console.log("hi");

document.getElementById('linkedinBtn').addEventListener('click', () => {
  window.open('https://www.linkedin.com/in/rezk-kallah-amina-a63310376/', '_blank');
});

document.getElementById('githubBtn').addEventListener('click', () => {
  window.open('https://github.com/Lapinettexo', '_blank');
});

document.getElementById('contactBtn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('cvBtn').addEventListener('click', () => {
  window.open('data/cv.pdf', '_blank'); 
});

fetch('data/works.json')
  .then(response => response.json())
  .then(data => {
    const track = document.getElementById('scrollTrack');

    function createCard(item) {
      const div = document.createElement('div');
      div.classList.add('infinite-scroll-card');
      div.innerHTML = `
        <div class="card-content">
          <img src="${item.images[0]}" alt="${item.title}" class="card-image">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>`;
      return div;
    }

    // Generate cards from JSON
    data.forEach(item => track.appendChild(createCard(item)));

    // Duplicate for seamless scroll
    data.forEach(item => track.appendChild(createCard(item)));

    // ✅ Wait for DOM to render so we can measure size
    requestAnimationFrame(() => {
      const firstCard = document.querySelector('.infinite-scroll-card');
      const cardWidth = firstCard.offsetWidth; // actual width in px
      const gap = parseInt(getComputedStyle(track).gap); // CSS gap in px
      const totalCards = data.length;
      const totalWidth = (cardWidth * totalCards) + (gap * (totalCards - 1));

      // ✅ Animation duration proportional to number of cards
      const duration = totalCards * 5; // 5s per original set
      track.style.animation = `scroll-cards ${duration}s linear infinite`;

      // ✅ Inject dynamic keyframes based on real size
      const style = document.createElement('style');
      style.innerHTML = `
        @keyframes scroll-cards {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${totalWidth}px); }
        }
      `;
      document.head.appendChild(style);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));
