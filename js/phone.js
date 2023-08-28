const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  const showError = document.getElementById("show-error");
  phoneContainer.textContent = "";
  showError.textContent = "";
  // throw en error
  if (!phones.length > 0) {
    showError.innerHTML = `<h1 class = "text-center text-3xl mt-10" >No Data Available! Please Search Again!</h1>`;
  }
  //   clear phone container

  // display show all button if there are more than 12 phones
  const showAllBtn = document.getElementById("show-all-btn");
  if (phones.length > 12 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // display only first 12
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phones) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card  bg-gray-100 shadow-xl mt-10 p-10`;
    phoneCard.innerHTML = `
        <figure>
        <img
          src="${phones.image}"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phones.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center my-5">
          <button onclick= "handleShowDetails('${phones.slug}')" class="btn btn-primary">Show All</button>
        </div>
      </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });

  //   hide loading spinner
  loadingSpinner(false);
};

// handle show details
const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  show_details_modal.showModal();

  const phoneDetailsContainer = document.getElementById(
    "phone-details-container"
  );
  phoneDetailsContainer.innerHTML = `
  <img class= "width-1/2 mx-auto" src="${phone.image}" alt="">
      <h1 class = text-3xl>${phone?.name || " No Name Available!"}</h1>
      <p class = "my-5">${
        phone?.releaseDate || " No Release Date Available!"
      }</p>
      <p class = "my-5">${
        phone?.mainFeatures?.chipSet || " No ChipSet Data Available!"
      }</p>
      <p class = "my-5">${
        phone?.mainFeatures?.memory || " No Memory Data Available!"
      }</p>
      <p class = "mt-5">${
        phone?.mainFeatures.storage || " No Storage Data Available!"
      }</p>

  `;
};

// handle search event
const handleSearch = (isShowAll) => {
  loadingSpinner(true);
  const inputField = document.getElementById("input-field");
  const inputText = inputField.value;
  loadPhone(inputText, isShowAll);
};

const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// show all button
const showAllBtn = () => {
  handleSearch(true);
};
// loadPhone();
