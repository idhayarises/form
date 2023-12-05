document.addEventListener('DOMContentLoaded', function() {
    const resultContainer = document.getElementById('result-container');

    fetch('http://localhost:3000/api/register') 
        .then(response => response.json())
        .then(data => {
            
            resultContainer.innerHTML = '';
      
            data.forEach(item => {
                const listItem = document.createElement('div');
                listItem.innerHTML = `
                    <p><strong>Full Name:</strong> ${item.fullname}</p>
                    <p><strong>Username:</strong> ${item.username}</p>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Phone Number:</strong> ${item.number}</p>
                    <p><strong>Gender:</strong> ${item.gender}</p>
                    <hr>
                `;
                resultContainer.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching form data:', error));
});

