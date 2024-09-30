    

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyCdPXhfGyTxUHiPQDc3_ToZ5vcKF3miNtc",
        authDomain: "wwew-fa4b6.firebaseapp.com",
        projectId: "wwew-fa4b6",
        storageBucket: "wwew-fa4b6.appspot.com",
        messagingSenderId: "66751097136",
        appId: "1:66751097136:web:2d89b8a4cfb72e60be40f5",
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore();
    const storage = firebase.storage();

    document.getElementById('stadium_form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const stadiumName = document.getElementById('stadiumName').value;
        const price = document.getElementById('price').value;
        const openTime = document.getElementById('openTime').value;
        const closeTime = document.getElementById('closeTime').value;
        const location = document.getElementById('location').value;
        const stadiumDetails = document.getElementById('stadiumDetails').value;
        const stadiumImages = document.getElementById('stadiumImages').files;
        const stadiumType = document.querySelector('input[name="stadiumType"]:checked').value;
        const lockers = document.querySelector('input[name="lockers"]:checked').value;

        // Generate random ID for the stadium
        const stadiumId = generateId();

        // Generate time slots between open and close time
        const timeSlots = generateTimeSlots(openTime, closeTime);

        // Get current user UID
        const userUid = firebase.auth().currentUser.uid;

        // Upload images to Firebase Storage
        const storageRefs = [];
        for (let i = 0; i < stadiumImages.length; i++) {
            const imageRef = storage.ref('stadiums/' + stadiumId + '/' + stadiumImages[i].name);
            storageRefs.push(imageRef.put(stadiumImages[i]));
        }

        // After all images uploaded, get their download URLs and save stadium data
        Promise.all(storageRefs).then(results => {
            const imageUrls = [];
            results.forEach(result => {
                imageUrls.push(result.ref.getDownloadURL());
            });

            return Promise.all(imageUrls);
        }).then(downloadURLs => {
            // Save stadium data to Firestore
            db.collection('stadiums').doc(stadiumId).set({
                stadium_id: stadiumId, // Save the generated stadium ID
                name: stadiumName,
                price: price,
                openTime: openTime,
                closeTime: closeTime,
                location: location,
                details: stadiumDetails,
                type: stadiumType,
                lockers: lockers,
                imageUrl: downloadURLs,
                availableTimeSlots: timeSlots,
                createdBy: userUid // Save the UID of the user who created the stadium
            }).then(() => {
                console.log('Stadium added with ID: ', stadiumId);
                // Clear form fields
                document.getElementById('stadium_form').reset();
            }).catch(error => {
                console.error('Error adding stadium: ', error);
            });
        });
    });

    // Function to generate random ID
    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Function to generate time slots between open and close time
    function generateTimeSlots(openTime, closeTime) {
        const timeSlots = [];
        let currentTime = openTime;
        while (currentTime < closeTime) {
            timeSlots.push(currentTime);
            // Increment time by 1 hour
            currentTime = incrementTime(currentTime);
        }
        return timeSlots;
    }

    // Function to increment time by 1 hour
    function incrementTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const newMinutes = (minutes + 60) % 60;
        const newHours = (hours + Math.floor((minutes + 60) / 60)) % 24;
        return `${pad(newHours)}:${pad(newMinutes)}`;
    }

    // Function to pad single digit numbers with leading zero
    function pad(num) {
        return num.toString().padStart(2, '0');
    }
