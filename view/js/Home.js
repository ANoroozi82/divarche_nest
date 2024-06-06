const switchToPageLogin = document.getElementById("switchPageLogin");
const switchToPageSignUp = document.getElementById("switchPageSignUp");
const buttonSignup = document.getElementById("signup");
const buttonLogin = document.getElementById("Login");
const switchPageLogout = document.getElementById("switchPageLogout");
const ulTag = document.getElementById('category')
if (switchPageLogout) {
  switchPageLogout.addEventListener("click", () => {
    async function putData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "put", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    putData("http://localhost:3030/user/logout").then((data) => {
      alert(JSON.stringify(data.data)); // JSON data parsed by `data.json()` call
    });
  });
}
if (switchToPageSignUp) {
  switchToPageLogin.addEventListener("click", () => {
    window.location.href = "user/login";
  });
}
if (switchToPageSignUp) {
  switchToPageSignUp.addEventListener("click", () => {
    window.location.href = "user/signup";
  });
}
if (buttonSignup) {
  buttonSignup.addEventListener("click", async (e) => {
    e.preventDefault();

    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    const fullName = document.getElementById("typeFullNameX");
    const userName = document.getElementById("typeUsernameX");
    const password = document.getElementById("typePasswordX");
    const phoneNumber = document.getElementById("typePhoneNumberX");
    const cityId = document.getElementById("cityId");
    postData("http://localhost:3030/user/signup", {
      "full_name": `${fullName.value}`,
      "phone_number": `${phoneNumber.value}`,
      "city_id": `${cityId.value}`,
      "role_name": "admin",
      "username": `${userName.value}`,
      "password": `${password.value}`
    }).then((data) => {
      alert(JSON.stringify(data.data)); // JSON data parsed by `data.json()` call
    });
  });
}
if (buttonLogin) {
  buttonLogin.addEventListener("click", async (e) => {
    e.preventDefault();

    async function putData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    const userName = document.getElementById("typeUsernameX");
    const password = document.getElementById("typePasswordX");
    putData("http://localhost:3030/user/login", {
      "username": `${userName.value}`,
      "password": `${password.value}`
    }).then((data) => {
      alert(JSON.stringify(data.data)); // JSON data parsed by `data.json()` call
    });
  });
}

if (window.location.href=='http://localhost:63342/divarche_nest/view/'){
  console.log(ulTag);
  async function getData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url// body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  getData("http://localhost:3030/products/category").then((data) => {

    const category = data.data

    for (let i = 0; i <category.length ; i++) {
      const newli = document.createElement('li')
      newli.id = category[i].category_id
      newli.innerText = category[i].category_name
      newli.classList='list-group-item'
      // newli.addEventListener('click',())
      ulTag.append(newli)
    }
  });

}