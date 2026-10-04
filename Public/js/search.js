const searchForm = document.getElementById('search-form');
const resultsContainer = document.getElementById('search-results');
const categorySelect = document.getElementById('category');
const clearButton = document.getElementById('clear-button');


// Load categories into the dropdown
fetch('/api/categories')
    .then(response => response.json())
    .then(categories => {
        categories.forEach(category => {
            const option = document.createElement('option');

            option.value = category.category_id;
            option.textContent = category.category_name;

            categorySelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error loading categories:', error);
    });


// Search when the form is submitted
searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const category = categorySelect.value;

    const params = new URLSearchParams();

    if (date) {
        params.append('date', date);
    }

    if (location) {
        params.append('location', location);
    }

    if (category) {
        params.append('category', category);
    }

    fetch(`/api/events/search?${params.toString()}`)
        .then(response => response.json())
        .then(events => {
            displayResults(events);
        })
        .catch(error => {
            console.error('Error searching events:', error);

            resultsContainer.innerHTML =
                '<p>Unable to search events. Please try again.</p>';
        });
});


// Display the returned events
function displayResults(events) {
    resultsContainer.innerHTML = '';

    if (events.length === 0) {
        resultsContainer.innerHTML =
            '<p>No events were found.</p>';
        return;
    }

    events.forEach(event => {
        const eventCard = document.createElement('div');

        const eventDate =
            new Date(event.event_date).toLocaleDateString('en-AU');

        eventCard.innerHTML = `
            <h3>${event.event_name}</h3>
            <p><strong>Category:</strong> ${event.category_name}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Location:</strong> ${event.location}</p>

            <a href="event.html?id=${event.event_id}">
                View Event Details
            </a>
        `;

        resultsContainer.appendChild(eventCard);
    });
}


// Clear all search filters
clearButton.addEventListener('click', () => {
    searchForm.reset();

    resultsContainer.innerHTML =
        '<p>Use the filters above to search for events.</p>';
});