const tabButtons = document.querySelectorAll(".tab-btn");

const forms = document.querySelectorAll(".form");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn => btn.classList.remove("active"));

        forms.forEach(form => form.classList.remove("active-form"));

        button.classList.add("active");

        document
            .getElementById(button.dataset.tab + "Form")
            .classList.add("active-form");
    });
});





const toggleIcons = document.querySelectorAll(".toggle-password");

toggleIcons.forEach(icon => {

    icon.addEventListener("click", () => {

        const input = icon.previousElementSibling;

        if (input.type === "password") {

            input.type = "text";

            icon.classList.replace("fa-eye", "fa-eye-slash");

        } else {

            input.type = "password";

            icon.classList.replace("fa-eye-slash", "fa-eye");
        }
    });
});





const country = document.getElementById("country");

const city = document.getElementById("city");

const cities = {

    Ukraine: ["Kyiv", "Lviv", "Chernivtsi"],

    Poland: ["Warsaw", "Krakow", "Gdansk"],

    Germany: ["Berlin", "Munich", "Hamburg"]
};

country.addEventListener("change", () => {

    city.innerHTML = '<option value="">Select City</option>';

    if (country.value !== "") {

        city.disabled = false;

        cities[country.value].forEach(item => {

            const option = document.createElement("option");

            option.value = item;

            option.textContent = item;

            city.appendChild(option);
        });

    } else {

        city.disabled = true;
    }
});





function showError(input, message) {

    input.classList.add("error-input");

    input.classList.remove("success");

    input.parentElement.querySelector(".error").textContent = message;
}

function showSuccess(input) {

    input.classList.remove("error-input");

    input.classList.add("success");

    input.parentElement.querySelector(".error").textContent = "";
}





const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let valid = true;

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const phone = document.getElementById("phone");
    const birthDate = document.getElementById("birthDate");
    const countryField = document.getElementById("country");
    const cityField = document.getElementById("city");



   

    if (
        firstName.value.trim().length < 3 ||
        firstName.value.trim().length > 15
    ) {

        showError(firstName, "First name must be 3-15 characters");

        valid = false;

    } else {

        showSuccess(firstName);
    }



  

    if (
        lastName.value.trim().length < 3 ||
        lastName.value.trim().length > 15
    ) {

        showError(lastName, "Last name must be 3-15 characters");

        valid = false;

    } else {

        showSuccess(lastName);
    }



   

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {

        showError(email, "Invalid email");

        valid = false;

    } else {

        showSuccess(email);
    }



    

    if (password.value.length < 6) {

        showError(password, "Password must be at least 6 characters");

        valid = false;

    } else {

        showSuccess(password);
    }



   

    if (confirmPassword.value !== password.value) {

        showError(confirmPassword, "Passwords do not match");

        valid = false;

    } else {

        showSuccess(confirmPassword);
    }



    

    const phoneRegex =
        /^\+380\d{9}$/;

    if (!phoneRegex.test(phone.value.trim())) {

        showError(phone, "Invalid Ukrainian phone number");

        valid = false;

    } else {

        showSuccess(phone);
    }



   

    const selectedDate = new Date(birthDate.value);

    const today = new Date();

    let age =
        today.getFullYear() - selectedDate.getFullYear();

    if (selectedDate > today) {

        showError(birthDate, "Birth date cannot be in future");

        valid = false;

    } else if (age < 12) {

        showError(birthDate, "User must be at least 12 years old");

        valid = false;

    } else {

        showSuccess(birthDate);
    }



  

    const sex =
        document.querySelector('input[name="sex"]:checked');

    if (!sex) {

        alert("Please select sex");

        valid = false;
    }



  

    if (countryField.value === "") {

        showError(countryField, "Select country");

        valid = false;

    } else {

        showSuccess(countryField);
    }



    

    if (cityField.value === "") {

        showError(cityField, "Select city");

        valid = false;

    } else {

        showSuccess(cityField);
    }



  

    if (valid) {

        const formData = new FormData(registerForm);

        for (let pair of formData.entries()) {

            console.log(pair[0], pair[1]);
        }

        document.getElementById("successMessage")
            .textContent =
            "Registration successful!";

        registerForm.reset();

        city.disabled = true;
    }
});





const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let valid = true;

    const username =
        document.getElementById("loginUsername");

    const loginPassword =
        document.getElementById("loginPassword");



    if (username.value.trim() === "") {

        showError(username, "Username required");

        valid = false;

    } else {

        showSuccess(username);
    }



    if (loginPassword.value.length < 6) {

        showError(
            loginPassword,
            "Password must be at least 6 characters"
        );

        valid = false;

    } else {

        showSuccess(loginPassword);
    }



    if (valid) {

        const formData = new FormData(loginForm);

        for (let pair of formData.entries()) {

            console.log(pair[0], pair[1]);
        }

        document.getElementById("successMessage")
            .textContent =
            "Login successful!";

        loginForm.reset();
    }
});
