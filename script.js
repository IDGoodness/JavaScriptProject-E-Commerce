const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the page from refreshing
  await getData();
});

async function getData() {
    // Collect all inputs
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const image = document.getElementById('image').files[0];
    const address = document.getElementById('address').value

    // Read image from html
    const reader = new FileReader();
    await new Promise(resolve => {
        reader.onload = resolve;
        reader.readAsDataURL(image);
    })
    const imageData = reader.result;
    const userData = {
        firstname,
        lastname,
        email,
        image: imageData,
        address
    }

    // console.log(userData)

    const storedData = localStorage.getItem('userData');
    localStorage.setItem('userData', JSON.stringify(userData))

    window.location.href = 'dashboard.html';

};