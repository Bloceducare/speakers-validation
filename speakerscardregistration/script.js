document.addEventListener('DOMContentLoaded', () => {
  const speakersContainer = document.getElementById('speakers-container');

  fetch('https://web3lagosbackend.onrender.com/api/speaker-registrations/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        data.forEach(speaker => {
          const card = document.createElement('div');
          card.className = 'card';

          card.innerHTML = `
            <img src="${speaker.imageUrl || 'default-image-url.jpg'}" alt="${speaker.name}">
            <h3>${speaker.name || 'No Name Provided'}</h3>
            <p>${speaker.title || 'No Title Provided'}</p>
            <p>${speaker.bio || 'No Bio Provided'}</p>
          `;

          speakersContainer.appendChild(card);
        });
      } else {
        console.error('Expected an array of speakers, but received:', data);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});
