document.addEventListener('DOMContentLoaded', () => {
  const speakersContainer = document.getElementById('speakers-container');

  // Function to convert Google Drive link to direct link
  function convertGoogleDriveLink(url) {
    const fileIdPattern = /\/file\/d\/(.*?)\/view/;
    const match = url.match(fileIdPattern);
    if (match) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
    return url;
  }

  // Fetch speaker registrations data
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
          const profilePic = speaker.profilepicurl ? convertGoogleDriveLink(speaker.profilepicurl) : 'default-image-url.jpg';
          const company = speaker.company_name || 'No Company Provided';
          const lectureTitle = speaker.lecture_title || 'No Lecture Title Provided';
          const bio = speaker.pitch_story || 'No Bio Provided';

          card.innerHTML = `
            <img src="${profilePic}" alt="${fullName}">
            <h3>${fullName}</h3>
            <p><strong>Email:</strong> ${speaker.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${speaker.phone_number || 'N/A'}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Session Type:</strong> ${speaker.session_type || 'N/A'}</p>
            <p><strong>Website/Portfolio:</strong> <a href="${speaker.website_or_portfolio}" target="_blank">${speaker.website_or_portfolio || 'N/A'}</a></p>
            <p><strong>Twitter Handle:</strong> ${speaker.x_handle || 'N/A'}</p>
            <p><strong>Lecture Title:</strong> ${lectureTitle}</p>
            <p><strong>Category:</strong> ${speaker.category || 'N/A'}</p>
            <p><strong>Session Abstract:</strong> ${speaker.session_abstract || 'N/A'}</p>
            <p><strong>Web3 Role:</strong> ${speaker.web3_role || 'N/A'}</p>
            <p><strong>Available Any Day:</strong> ${speaker.available_at_any_day ? 'Yes' : 'No'}</p>
            <p><strong>Location:</strong> ${speaker.location || 'N/A'}</p>
            <p><strong>Telegram ID:</strong> ${speaker.telegram_id || 'N/A'}</p>
            <p><strong>Pitch Story:</strong> ${bio}</p>
            <p><strong>Spoken at Web3 Before:</strong> ${speaker.spoken_at_web3_before ? 'Yes' : 'No'}</p>
            <p><strong>Gender:</strong> ${speaker.gender || 'N/A'}</p>
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
