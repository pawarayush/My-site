// Toggle Menu Icon and Navbar Active State
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Toggle "Read More" Button for Skills Section
document.getElementById('read-more-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('skills-content').classList.toggle('expanded');
});

// Formspree Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const submitButton = form.querySelector('input[type="submit"]');
    const formMessage = document.createElement('p');
    formMessage.classList.add('form-message');
    form.appendChild(formMessage);

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        submitButton.value = 'Sending...';
        submitButton.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.style.color = 'green';
                form.reset(); // Clear the form
            } else {
                response.json().then(data => {
                    if (data.errors) {
                        formMessage.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formMessage.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    formMessage.style.color = 'red';
                });
            }
        }).catch(() => {
            formMessage.textContent = 'Oops! There was a problem submitting your form.';
            formMessage.style.color = 'red';
        }).finally(() => {
            submitButton.value = 'Send Message';
            submitButton.disabled = false;
        });
    });
});