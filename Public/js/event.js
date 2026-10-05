const eventDetails = document.getElementById('event-details');
const registrationSection =
    document.getElementById('registration-section');


// Get the event ID from the URL
const params = new URLSearchParams(window.location.search);
const eventId = params.get('id');


if (!eventId) {
    eventDetails.innerHTML = '<p>Event not found.</p>';
} else {

    // Retrieve the selected event from the API
    fetch(`/api/events/${eventId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Event not found');
            }

            return response.json();
        })
        .then(event => {
            displayEvent(event);
        })
        .catch(error => {
            console.error('Error:', error);

            eventDetails.innerHTML =
                '<p>Unable to load this event.</p>';
        });
}


// Display event information
function displayEvent(event) {

    const eventDate =
        new Date(event.event_date).toLocaleDateString('en-AU');

    let ticketInformation;

    if (Number(event.ticket_price) === 0) {
        ticketInformation = 'Free';
    } else {
        ticketInformation =
            `$${Number(event.ticket_price).toFixed(2)}`;
    }

    eventDetails.innerHTML = `
        <h3>${event.event_name}</h3>

        <p><strong>Category:</strong> ${event.category_name}</p>

        <p><strong>Date:</strong> ${eventDate}</p>

        <p><strong>Time:</strong> ${event.start_time}</p>

        <p><strong>Location:</strong> ${event.location}</p>

        <p><strong>Description:</strong> ${event.description}</p>

        <p><strong>Ticket Price:</strong> ${ticketInformation}</p>

        <h3>Fundraising Progress</h3>

        <p>
            <strong>Goal:</strong>
            $${Number(event.fundraising_goal).toFixed(2)}
        </p>

        <p>
            <strong>Amount Raised:</strong>
            $${Number(event.amount_raised).toFixed(2)}
        </p>
    `;

    registrationSection.style.display = 'block';
}


// Registration functionality
document
    .getElementById('register-button')
    .addEventListener('click', () => {

        alert('This feature is currently under construction.');

    });