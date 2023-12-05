const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (validateInputs()) {
    const formData = new FormData(form);
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const existingGender = formData.get('gender');
    if (selectedGender && !existingGender) {
      formData.append('gender', selectedGender.value);
    }
    const payload = new URLSearchParams(formData);
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: payload,
      })
      .then(res => res.json())
      .then(data => {
        window.location.href = 'result.html';
      })
      .catch(error => console.error('Error submitting form:', error));
  }
});

function validateInputs() {
  const fullnameVal = fullname.value.trim();
  const usernameVal = username.value.trim();
  const emailVal = email.value.trim();
  const numberVal = number.value.trim();
  const passwordVal = password.value.trim();
  const cpasswordVal = cpassword.value.trim();
  let success = true;
  if (fullnameVal === '') {
    success = false;
    setError(fullname, "fullname is required")
  } else {
    setSuccess(fullname)
  }
  if (usernameVal === '') {
    success = false;
    setError(username, "username is required")
  } else {
    setSuccess(username)
  }
  if (emailVal === '') {
    success = false;
    setError(email, "email is required")
  } else if (!validateEmail(emailVal)) {
    success = false;
    setError(email, 'email is not valid')
  } else {
    setSuccess(email)
  }
  if (numberVal === '') {
    success = false;
    setError(number, 'number is required');
  } else if (!validatePhoneNumber(numberVal)) {
    success = false;
    setError(number, 'Invalid phone number');
  } else {
    setSuccess(number);
  }
  if (passwordVal === '') {
    success = false;
    setError(password, 'password is required')
  } else if (passwordVal.length < 8) {
    success = false;
    setError(password, 'password must be 8 char')
  } else {
    setSuccess(password)
  }
  if (cpasswordVal === '') {
    success = false;
    setError(cpassword, 'confirm password is required')
  } else if (cpasswordVal !== passwordVal) {
    success = false;
    setError(cpassword, "password doest not match")
  } else {
    setSuccess(cpassword)
  }
  return success;
}

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector('.error')
  errorElement.innerText = message;
  inputGroup.classList.add('error');
  inputGroup.classList.remove('success');
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector('.error')
  errorElement.innerText = '';
  inputGroup.classList.add('success');
  inputGroup.classList.remove('error');
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validatePhoneNumber = (phoneNumber) => {
  const regx = /^[6-9]\d{9}$/;
  return regx.test(phoneNumber);
};

function fetchData() {
  const dataContainer = document.getElementById('data-container');
  fetch('http://localhost:3000/api/register')
    .then(response => response.json())
    .then(data => {
      dataContainer.innerHTML = '';
      data.forEach((item) => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
                <p><strong>Full Name:</strong> ${item.fullname}</p>
                <p><strong>Username:</strong> ${item.username}</p>
                <p><strong>Email:</strong> ${item.email}</p>
                <p><strong>Phone Number:</strong> ${item.number}</p>
                <p><strong>Gender:</strong> ${item.gender}</p>
                <hr>
            `;
        dataContainer.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}
fetchData();
