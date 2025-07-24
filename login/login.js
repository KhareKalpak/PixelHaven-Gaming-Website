function showLoginMethod(method) {
    // Hide all forms
    const forms = document.querySelectorAll('.login-form');
    forms.forEach(form => {
        form.style.display = 'none';
    });

    // Show the selected login form based on the method
    const selectedForm = document.getElementById(`${method}-login`);
    if (selectedForm) {
        selectedForm.style.display = 'block';
    }
}

document.getElementById('logo-link').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default anchor behavior
  const logoLink = this;
  
  // Add the "shrink" class to trigger the animation
  logoLink.querySelector('.logo-image').classList.add('shrink');
  
  // Wait for the animation to finish, then navigate to the desired page
  setTimeout(function() {
    window.location.href = 'D:\project mark 2\home.html'; // Change to your homepage URL
  }, 500); // Match this to the duration of the CSS transition
});
