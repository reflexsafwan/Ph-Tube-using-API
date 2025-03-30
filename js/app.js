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
  console.log(liContainer);
  categories.map((category) => {
    console.log(category.category);
    const li = document.createElement("li");
    li.classList.add("btn", "btn-sm", "text-lg", "hover:bg-red-600" ,"hover1");
    li.innerText = category.category;
    liContainer.appendChild(li);
  });
};

loadCatagories();
