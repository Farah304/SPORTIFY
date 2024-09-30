// Function to search bookings by date
function searchBookingsByDate(searchDate) {
  const bookingContainer = document.querySelector('#guestList');
  bookingContainer.innerHTML = ''; // Clear previous data

  firebase.auth().onAuthStateChanged(user => {
      if (user) {
          db.collection("stadiums").where('createdBy', '==', user.uid).get()
              .then((querySnapshot) => {
                  querySnapshot.forEach((stadiumDoc) => {
                      stadiumDoc.ref.collection('bookings').where('date', '>=', new Date(searchDate)).get()
                          .then((bookingSnapshot) => {
                              bookingSnapshot.forEach((bookingDoc) => {
                                  const bookingData = bookingDoc.data();
                                  // Create a table row for each booking
                                  const row = document.createElement('tr');
                                  row.innerHTML = `
                                      <td>${bookingData.name}</td>
                                      <td>${new Date(bookingData.date.seconds * 1000).toLocaleString()}</td>
                                      <td>${bookingData.phone_number}</td>
                                      <td>${formatTime(bookingData.start_time)}</td>
                                      <td>${formatTime(bookingData.end_time)}</td>
                                      <td><button onclick="viewProof('${bookingData.image_url}')">View Proof</button></td>
                                      <td><button onclick="deleteRow('${stadiumDoc.id}', '${bookingDoc.id}', this)">Delete</button></td>
                                  `;
                                  bookingContainer.appendChild(row);
                              });
                          })
                          .catch((error) => {
                              console.error("Error fetching bookings: ", error);
                          });
                  });
              })
              .catch((error) => {
                  console.error("Error fetching stadiums: ", error);
              });
      } else {
          console.log('No user is signed in.');
      }
  });
}

// Add event listener for search button
document.getElementById('searchButton').addEventListener('click', function() {
  const searchDate = document.getElementById('searchDate').value;
  if (searchDate) {
      searchBookingsByDate(searchDate);
  } else {
      alert("Please enter a date to search.");
  }
});
