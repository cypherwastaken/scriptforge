const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

async function loadGiveaways() {
  try {
    const response = await fetch('/publicapi/giveaways.json');
    const data = await response.json();
    const giveaways = data.giveaways;
    const container = document.getElementById('giveawaysContainer');
    
    giveaways.forEach(giveaway => {
      const card = document.createElement('div');
      card.className = 'giveaway-card';
      card.innerHTML = `
        <h3>${giveaway.GiveawayName}</h3>
        <p>${giveaway.GiveawayPrize}</p>
      `;
      container.appendChild(card);
      observer.observe(card);
    });
  } catch (error) {
    console.error('Error loading giveaways:', error);
    const fallbackGiveaways = [
      { GiveawayName: "Christmas Special", GiveawayPrize: "10000 Robux" },
      { GiveawayName: "Easter Event", GiveawayPrize: "5000 Robux" },
      { GiveawayName: "Summer Blast", GiveawayPrize: "Limited Item" }
    ];
    
    const container = document.getElementById('giveawaysContainer');
    fallbackGiveaways.forEach(giveaway => {
      const card = document.createElement('div');
      card.className = 'giveaway-card';
      card.innerHTML = `
        <h3>${giveaway.GiveawayName}</h3>
        <p>${giveaway.GiveawayPrize}</p>
      `;
      container.appendChild(card);
      observer.observe(card);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.credit-card').forEach(card => {
    observer.observe(card);
  });
  
  loadGiveaways();
  
  document.querySelector('.scroll-indicator').addEventListener('click', () => {
    document.querySelector('.giveaways').scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('.hero');
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;
  
  hero.style.setProperty('--mouse-x', mouseX);
  hero.style.setProperty('--mouse-y', mouseY);
  
  const title = document.querySelector('.title');
  title.style.transform = `
    translate(
      ${mouseX * 20}px,
      ${mouseY * 20}px
    )
  `;
});
