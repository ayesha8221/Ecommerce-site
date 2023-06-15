let categories = [
    {
        name: "Serums",
        link: "/pages/products.html",
        img: "https://i.postimg.cc/htp9jrK9/8a4e1051-5e14-4960-bd5e-cfdcea8c58d2.webp",
        class: "serum",
    },
    {
      name: "Masks",
      link: "/pages/products.html",
      img: "https://i.postimg.cc/kX9kxJd7/eb5ad520-a946-4e59-8503-9340deec60ff.webp",
      class: "masks"
    },
    {
        name: "Facial Cleansers",
        link: "/pages/products.html",
        img: "https://i.postimg.cc/wv6ZJzP1/9c3bcbc8-43b3-4db0-bd74-437ef5d35927.webp",
        class: "FC"
    },
  ];
  
  let dispCategories = document.getElementById("categories");
   categories.forEach((data) => {
    dispCategories.innerHTML += `
    <div class="container">
    <div class="card" style="width: 18rem;">
    <img src="${data.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <a href="${data.link}" class="btn">${data.name}</a>
    </div>
  </div><br>
  </div>`;
  });