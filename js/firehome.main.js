  
        // Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyCdPXhfGyTxUHiPQDc3_ToZ5vcKF3miNtc",
            authDomain: "wwew-fa4b6.firebaseapp.com",
            projectId: "wwew-fa4b6",
            storageBucket: "wwew-fa4b6.appspot.com",
            messagingSenderId: "66751097136",
            appId: "1:66751097136:web:2d89b8a4cfb72e60be40f5"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        const db = firebase.firestore();

        // Listen for auth state changes
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in, now you can fetch the stadiums
                fetchUserStadiums();
            } else {
                // No user is signed in, handle it accordingly
                console.log('No user is signed in.');
            }
        });

        // Function to fetch and display stadiums created by the logged-in user
        function fetchUserStadiums() {
            const coursesContainer = document.getElementById('courses-container');
            const userUid = firebase.auth().currentUser.uid; // Get the UID of the logged-in user

            // Clear previous content
            coursesContainer.innerHTML = '';

            // Fetch stadiums collection from Firestore where 'createdBy' field matches the user's UID
            db.collection('stadiums').where('createdBy', '==', userUid).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                // Create stadium card
                const stadiumData = doc.data();
                const stadiumCard = document.createElement('div');
                stadiumCard.className = 'col-md-6 col-lg-3';
                stadiumCard.innerHTML = `
                    <div class="courses__item" style="cursor: pointer;">
                        <div class="courses__inner">
                          <a class="col-md-6 col-lg-3" href="user.html">
                            <div class="courses__img">
                                <img src="${stadiumData.imageUrl}" alt="Stadium Image">
                            </div>
                          
                            <h3 class="courses__title">${stadiumData.name}</h3>
                        </div>
                    </div>
                    </a>
                `;
                // Add click event to each stadium card
                stadiumCard.addEventListener('click', function() {
    // استخدم مسار الملف المحلي لـ user.html
    window.location.href = '';
});

                // Append stadium card to container
                coursesContainer.appendChild(stadiumCard);
            });
        })
        .catch(error => {
            console.error('Error fetching user stadiums: ', error);
        });
}
    