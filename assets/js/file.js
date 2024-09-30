

document.getElementById('file').addEventListener('change', function() {
    const files = this.files;
    const allowedTypes = ['image/jpeg', 'image/png'];
    const acceptedFiles = [];
    
    for (let i = 0; i < files.length; i++) {
        if (allowedTypes.includes(files[i].type)) {
            acceptedFiles.push(files[i]);
        }
    }
    
    if (acceptedFiles.length !== files.length) {
        alert('Please select PNG or JPEG files only.');
        this.value = ''; 
    }
});

