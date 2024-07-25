document.addEventListener('DOMContentLoaded', () => {
  const speakersContainer = document.getElementById('speakers-container');

  fetch('https://web3lagosbackend.onrender.com/api/speaker-registrations/')
    .then(response => {
      console.log('Fetch response:', response); // Log the response
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data); // Log the received data
      if (Array.isArray(data)) {
        data.forEach(speaker => {
          const card = document.createElement('div');
          card.className = 'card';

          const fullName = `${speaker.firstname || ''} ${speaker.other_name || ''} ${speaker.last_name || ''}`.trim();
          const profilePic = speaker.profilepicurl || 'default-image-url.jpg';
          const company = speaker.company_name || 'No Company Provided';
          const lectureTitle = speaker.lecture_title || 'No Lecture Title Provided';
          const bio = speaker.pitch_story || 'No Bio Provided';

          card.innerHTML = `
            <img src="${profilePic}" alt="${fullName}">
            <h3>${fullName}</h3>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Lecture:</strong> ${lectureTitle}</p>
            <p>${bio}</p>
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
