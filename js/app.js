const removeActiveClass = () => {
  const activeClass = document.getElementsByClassName("active");
  console.log(activeClass);
  for (let btn of activeClass) {
    btn.classList.remove("active");
  }
};

const loadCatagories = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/categories"
    );
    const data = await response.json();
    const categories = data.categories;
    showCategories(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const loadAllVedios = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    const data = await res.json();
    const vedios = data.videos;
    removeActiveClass();
    const btnAll = document.getElementById("btn-all");
    btnAll.classList.add("active");
    showVedios(vedios);
  } catch (error) {
    console.log(error);
  }
};

const loadCatagoryVedios = async (id) => {
  console.log(id);
  try {
    const res = await fetch(
      ` https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    );
    const data = await res.json();

    const vedios = data.category;
    removeActiveClass();
    const clickedButton = document.getElementById(`btn-${id}`);
    clickedButton.classList.add("active");

    showVedios(vedios);
  } catch (error) {
    console.log(error);
  }
};

const showCategories = (categories) => {
  const liContainer = document.getElementById("li-container");

  categories.map((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <li id="btn-${category.category_id}"  onclick = "loadCatagoryVedios(${category.category_id})" class="btn btn-sm text-lg hover:bg-red-700 hover:text-white">${category.category}</li>
    `;
    liContainer.appendChild(div);
  });
};

const showVedios = (vedios) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  if (vedios.length == 0) {
    cardContainer.innerHTML = `
     <div class="col-span-full text-center flex flex-col justify-center items-center mt-20">
                <img class="w-40" src="./assets/Icon.png" alt="">
                <h2 class="text-2xl font-bold mt-10">Oops!! Sorry, There is no content here</h2>
            </div>
    
    `;

    return;
  }
  vedios.map((vedio) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img class=" w-full h-65 rounded object-cover" src=${vedio.thumbnail} />
                    <p></p>
                </figure>
                <div class="card-body">
                    <div class="card-title flex items-center ">
                         <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                      <img src=${vedio.authors[0].profile_picture}/>
                    </div>
                  </div>
                        <h2>${vedio.title}</h2>
                    </div>
                  
                    <p>${vedio.authors[0].profile_name} </p>
                    <p>${vedio.others.views}</p>
                </div>
            </div>
    `;
    cardContainer.appendChild(div);
  });
};

loadCatagories();
