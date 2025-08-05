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
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    console.log('Data loaded:', data);
    const container = document.getElementById('worksContainer');

    data.forEach((work, index) => {
      const card = document.createElement('div');
      card.classList.add('work-card');
      card.style.zIndex = index + 1; // Set z-index dynamically - newer cards on top

      card.innerHTML = `
        <img src="${work.images[0]}" alt="${work.title}" onerror="this.src='https://via.placeholder.com/600x300/cccccc/666666?text=Project+Image'">
        <h3>${work.title}</h3>
        <p>${work.description}</p>
      `;

      container.appendChild(card);

      // Create intersection observer for each card
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
            // Don't remove visible class to maintain stacking effect
          });
        },
        {
          root: null,
          rootMargin: '0px 0px -50% 0px',
          threshold: 0.1
        }
      );

      observer.observe(card);
    });
  })
  .catch(error => {
    console.error('Error loading works data:', error);
  });