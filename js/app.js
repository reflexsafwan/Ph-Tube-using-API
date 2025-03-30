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
const showCategories = (categories) => {
  const liContainer = document.getElementById("li-container");

  categories.map((category) => {
    const li = document.createElement("li");
    li.classList.add(
      "btn",
      "btn-sm",
      "text-lg",
      "hover:bg-red-600",
      "hover:text-white"
    );
    li.innerText = category.category;
    liContainer.appendChild(li);
  });
};

const loadAllVedios = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/phero-tube/videos"
    );
    const data = await res.json();
    const vedios = data.videos;
    showVedios(vedios);
  } catch (error) {
    console.log(error);
  }
};

const showVedios = (vedios) => {
  const cardContainer = document.getElementById("card-container");
  console.log(cardContainer);
  vedios.map((vedio) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
                <figure>
                    <img class="h-65 rounded" src=${vedio.thumbnail} />
                </figure>
                <div class="card-body">
                    <div class="card-title flex items-center ">
                        <img  width="50px"  class= "mr-3 rounded-full" src=${vedio.authors[0].profile_picture}>
                        <h2>${vedio.title}</h2>
                    </div>
                  
                    <p>${vedio.authors[0].profile_name}</p>
                    <p>${vedio.others.views}</p>
                </div>
            </div>
    `;
    cardContainer.appendChild(div);
  });
};

loadCatagories();
loadAllVedios();
