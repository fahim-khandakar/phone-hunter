const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  //   clear phone container
  phoneContainer.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllBtn = document.getElementById("show-all-btn");
  if (phones.length > 24) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  // display only first 24
  phones = phones.slice(0, 24);

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
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });

  //   hide loading spinner
  loadingSpinner(false);
};

// handle search event
const handleSearch = () => {
  loadingSpinner(true);
  const inputField = document.getElementById("input-field");
  const inputText = inputField.value;
  loadPhone(inputText);
};

const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("loading-spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// loadPhone();
