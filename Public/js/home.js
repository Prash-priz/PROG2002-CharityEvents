fetch('/api/events')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to retrieve events');
        }

        return response.json();
    })
    .then(events => {
        const container = document.getElementById('events-container');

        container.innerHTML = '';

        if (events.length === 0) {
            container.innerHTML = '<p>No upcoming events are currently available.</p>';
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement('div');

            const eventDate = new Date(event.event_date).toLocaleDateString();

            eventCard.innerHTML = `
                <h3>${event.event_name}</h3>
                <p><strong>Category:</strong> ${event.category_name}</p>
                <p><strong>Date:</strong> ${eventDate}</p>
                <p><strong>Time:</strong> ${event.start_time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>

                <a href="event.html?id=${event.event_id}">
                    View Event Details
                </a>
            `;

            container.appendChild(eventCard);
        });
    })
    .catch(error => {
        console.error('Error:', error);

        document.getElementById('events-container').innerHTML =
            '<p>Unable to load events. Please try again later.</p>';
    });