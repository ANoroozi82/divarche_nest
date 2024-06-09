const switchToPageLogin = document.getElementById("switchPageLogin");
const switchToPageSignUp = document.getElementById("switchPageSignUp");
const buttonSignup = document.getElementById("signup");
const buttonLogin = document.getElementById("Login");
const switchPageLogout = document.getElementById("switchPageLogout");
const divCategory = document.getElementById("category");
const divProduct = document.getElementById("product");
const addProduct = document.getElementById('create')
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

if (window.location.href == "http://localhost:63342/divarche_nest/view/") {

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
      referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url// body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function DelData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "Delete", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url// body data type must match "Content-Type" header
      body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  getData("http://localhost:3030/products/category").then((data) => {

    const category = data.data;

    for (let i = 0; i < category.length; i++) {
      const newul = document.createElement("ul");
      const newdiv = document.createElement("div");
      const newBtn = document.createElement("button");
      newdiv.classList = "dropdown col";
      newBtn.classList = "btn btn-primary dropdown-toggle";
      newBtn.innerHTML = category[i].category_name;
      newBtn.type = "button";
      newBtn.id = "dropdownMenuButton" + category[i].category_id;
      newBtn.ariaExpanded = "false";
      newBtn.setAttribute("data-bs-toggle", "dropdown");
      newul.id = category[i].category_id;
      newul.classList = "dropdown-menu";
      newdiv.append(newBtn);
      newdiv.append(newul);
      divCategory.append(newdiv);

    }
    getData("http://localhost:3030/products/categories").then((data) => {
      const categories = data.data;
      let uls = document.getElementsByClassName("dropdown-menu");
      for (let i = 0; i < category.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (uls[i].id == categories[j].category_id) {
            const newli = document.createElement("li");
            const newA = document.createElement("a");
            newli.id = categories[j].categories_id;
            newA.innerText = categories[j].categories_name;
            newA.classList = "dropdown-item";
            newli.append(newA);
            uls[i].append(newli);
          }
        }
      }
    });
  });

  getData("http://localhost:3030/products/products").then((data) => {

    const products = data.data;

    for (let i = 0; i < products.length; i++) {
      const newDiv = document.createElement("div");
      const newImage = document.createElement("img");
      const cardbody = document.createElement("div");
      const title = document.createElement("h5");
      const description = document.createElement("p");
      const price = document.createElement("h6");
      const addres = document.createElement("h6");
      const status = document.createElement("h6");
      const delbtn = document.createElement("button");
      const updatebtn = document.createElement("button");

      const col = document.createElement("div");
      newDiv.id = products[i].product_id;
      newDiv.classList = "card mx-2";
      newDiv.style = "width: 18rem";
      console.log(products.pathImages);
      newImage.src = "image/1.webp";
      newImage.classList = "card-img-top";
      cardbody.classList = "card-body";
      title.classList = "card-title";
      title.innerHTML = products[i].title;
      description.innerHTML = products[i].description;
      description.classList = "card-text";
      price.innerHTML = "قیمت:" + products[i].price;
      price.classList = "card-text";
      addres.innerHTML = "آدرس:" + products[i].address;
      addres.classList = "card-text";
      status.innerHTML = "وضعیت:" + products[i].status;
      col.classList = "col";
      updatebtn.classList = "btn btn-outline-warning rounded";
      updatebtn.innerHTML = "update";
      delbtn.classList = "btn btn-outline-danger rounded";
      delbtn.innerHTML = "delete";

      delbtn.addEventListener("click", (event) => {

        DelData("http://localhost:3030/products/product", { product_id: products[i].product_id }).then((data) => {
          const divt = document.getElementById(products[i].product_id);
          divt.remove();
        });
      });

      cardbody.append(title);
      cardbody.append(description);
      cardbody.append(price);
      cardbody.append(addres);
      cardbody.append(status);
      col.append(updatebtn);
      col.append(delbtn);
      cardbody.append(col);
      newDiv.append(newImage);
      newDiv.append(cardbody);
      divProduct.append(newDiv);

    }


  });

}
if(addProduct){
  addProduct.addEventListener('click',()=>{
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
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url// body data type must match "Content-Type" header
        body:JSON.stringify(data)
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }
    const title =document.getElementById('title')
    const description =document.getElementById('description')
    const price =document.getElementById('price')
    const address = document.getElementById('address')
    const status = document.getElementById('status')
    const formFileMultiple =document.getElementById('formFileMultiple')
    const categoryChoose = document.getElementById('categoryChoose')

    postData('http://localhost:3030/products/product',{
      "title": title.value,
      "description": description.value,
      "price": price.value,
      "address": address.value,
      "status": status.value,
      "data": {
        "سال تولید": "1395",
        "برند": "پژو",
        "رنگ": "نقره ای",
        "وضعیت شاسی": "سالم",
        "نوع سوخت": "بنزین",
        "گیربکس": "دنده ای",
        "بیمه": "6 ماه",
        "مدل": "405SLX"
      },
      "user_id": "1",
      "pathImages":[formFileMultiple.value],
      "categories_id": categoryChoose.value
    }).then((data)=>{
      alert(JSON.stringify(data.data))
    })

  })
}