const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the page from refreshing
  await getData();
});

// Collect data and store in local storage

async function getData() {
    // Collect all inputs
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const image = document.getElementById('image').files[0];
    const address = document.getElementById('address').value
    // console.log(firstname)

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

    // Clear the input field

    document.getElementById('image').value = '';
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
    

};

// Fetch and display data from the local storage.

function showData() {
    const displayData = document.getElementById('userDisplay')
    const userData = JSON.parse(localStorage.getItem('userData'))
    // console.log(userData);

    // userData.forEach(Data => {
    //     const displayfname = document.getElementById('firstname')
    //     displayfname.innerHTML += `${Data.firstname}`
    // });

    const displayimage = document.getElementById('image');
    displayimage.src = userData.image;
    displayimage.style.width = '100px';
    displayimage.style.height = '100px';
    displayimage.style.borderRadius = '50%';


    const displayfname = document.getElementById('firstname')
    displayfname.innerHTML += `${userData.firstname}`
    const displaylname = document.getElementById('lastname');
    displaylname.innerHTML += userData.lastname;
    const displayemail = document.getElementById('email')
    displayemail.innerHTML += userData.email;
    const displayaddress = document.getElementById('address')
    displayaddress.innerHTML += userData.address;
}

// Collect data from API

async function fetchEcomData(){

    const displayData = document.getElementById('displayData')

    try {
        const fetchedData = await fetch('https://fakestoreapi.com/products');
        const parsedData = await fetchedData.json()
        localStorage.setItem('productData', JSON.stringify(parsedData))
        // console.log(parsedData)

        const productData = JSON.parse(localStorage.getItem('productData'))

        parsedData.forEach(productData => {
            displayData.innerHTML +=
            
            `
            <div class="col-12 col-sm-4 col-lg-3 p-2 mb-sm-0">
                <div class="card border-dark h-100">
                    <img src="${productData.image}" class="card-img-top" alt="ProductPic" id="img" style="height: 180px; width: 180px; margin-left: 20%;">
                    <div class="bg-light card-body border">
                        <h5 class="card-title">${productData.title}</h5>
                        <h6 style="color: red;">$${productData.price} <del style="color: black;">$1000</del> </h6>
                        <h6><span style="color: gold;">&#x2605 &#x2605 &#x2605 &#x2605 &#x2605 &#x2605</span> (${productData.rating.count})</h6>
                        <!-- <p class="card-text h-60">${productData.description}</p> -->
                    </div>
                </div>
            </div>
            `


        });
        // const displayimage = document.getElementById('img')
        // displayimage.src = `${productData.image}`
        
    } catch (err) {
        console.log("Emergency! Check this -->", err)
    }
}

// const logoutButton = document.getElementById('out');

// logoutButton.addEventListener('click', () => {
//     localStorage.clear();
    
//     window.location.href = ('index.html');
// })

function logOut() {
    localStorage.clear();
    console.log("Clear!")
    
    window.location.href = 'index.html';
    console.log("Clear here too!")
}
