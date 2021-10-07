// const { get } = require("grunt");

// Add active class for header on scroll
$(window).scroll(function () {
  const headerEl = $(".header");
  const scrollTop = $(window).scrollTop();
  const sliderHeight = $(".slider").innerHeight();
  const bannerHeight = $(".banner").innerHeight();
  const headerHeight = $(".header").innerHeight();
  if (
    scrollTop > sliderHeight - headerHeight ||
    scrollTop > bannerHeight - headerHeight
  ) {
    headerEl.addClass("active");
  } else {
    headerEl.removeClass("active");
  }
});

// Banner Slider
const bannerSlider = $(".slider__item-wrapper");

bannerSlider.flickity({
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  on: {
    change: function (index) {
      const pageNumberEl = $(".current-page");
      const pageIndex = (index + 1).toString();
      pageNumberEl.text(pageIndex.padStart(2, "0"));
    },
  },
});

// Tech Slider
const sliderContainer = $(".slider__img-list");
const sliderPrevBtn = $(".slider__btn-prev");
const sliderNextBtn = $(".slider__btn-next");
const sliderTextbox = $(".slider__textbox");
sliderContainer.flickity({
  cellAlign: "left",
  contain: true,
  wrapAround: true,
  prevNextButtons: false,
  pageDots: false,
  autoPlay: false,
  on: {
    change: function (eq) {
      let textBoxIndex = eq + 1;
      sliderTextbox.removeClass("active");
      $(`.slider__textbox--${textBoxIndex}`).addClass("active");
      const sliderNumber = $(".slider__number-current");
      const sliderIndex = (eq + 1).toString();
      sliderNumber.text(sliderIndex.padStart(2, "0"));
    },
  },
});

sliderPrevBtn.click(function () {
  sliderContainer.flickity("previous");
});

sliderNextBtn.click(function () {
  sliderContainer.flickity("next");
});

// Product Slider
const productSlider = $(".products__container");
productSlider.flickity({
  cellAlign: "center",
  contain: true,
  wrapAround: true,
  watchCSS: true,
  prevNextButtons: false,
  pageDots: false,
  initialIndex: 1,
});

// Category Product Slider
const categorySlider = $(".category__items-list");
const categoryNextBtn = $(".category__next-btn");

categorySlider.flickity({
  cellAlign: "left",
  contain: true,
  wrapAround: false,
  prevNextButtons: false,
  pageDots: false,
});

categoryNextBtn.click(function () {
  categorySlider.flickity("next");
});

// Accordion:
$(document).on("click", ".accordion", function () {
  $(".accordion").next().not($(this).next()).slideUp();
  $(this).next().slideToggle();
  $(".accordion").children("span").text("+");
  $(this).children("span").text("-");
});

// Init AOS
AOS.init();

// Tabs Component
const tab = $(".tab");
tab.click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  let id = $(this).data("tab");
  $(`.tab-content--${id}`).addClass("active").siblings().removeClass("active");
});

// active icons
const typeIcon = $(".search__options--type .option-icon");
const licenseIcon = $(".search__options--engine .option-icon");
const styleIcon = $(".search__options--style .option-icon");

function activeIcon() {
  $(this).addClass("active").siblings().removeClass("active");
}
typeIcon.click(activeIcon);
licenseIcon.click(activeIcon);
styleIcon.click(activeIcon);

// Min max price range slider
const inputLeft = document.getElementById("input-left");
const inputRight = document.getElementById("input-right");

const thumbleft = document.querySelector(".range-slider > .thumb.left");
const thumbRight = document.querySelector(".range-slider > .thumb.right");
const range = document.querySelector(".range-slider > .range");

function setLeftValue() {
  if (!inputLeft) return;
  const _this = inputLeft,
    min = parseInt(_this?.min),
    max = parseInt(_this?.max);

  _this.value = Math.min(parseInt(_this?.value), parseInt(inputRight.value));
  const percent = ((_this?.value - min) / (max - min)) * 100;
  thumbleft.style.left = percent + "%";
  range.style.left = percent + "%";
}
setLeftValue();

function setRightValue() {
  if (!inputRight) return;
  const _this = inputRight,
    min = parseInt(_this.min),
    max = parseInt(_this.max);

  _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value));
  const percent = ((_this.value - min) / (max - min)) * 100;
  thumbRight.style.right = 100 - percent + "%";
  range.style.right = 100 - percent + "%";
}
setRightValue();

inputLeft?.addEventListener("input", setLeftValue);
inputRight?.addEventListener("input", setRightValue);

inputLeft?.addEventListener("mouseover", function () {
  thumbleft.classList.add("hover");
});

inputLeft?.addEventListener("mouseout", function () {
  thumbleft.classList.remove("hover");
});

inputLeft?.addEventListener("mousedown", function () {
  thumbleft.classList.add("active");
});

inputLeft?.addEventListener("mouseup", function () {
  thumbleft.classList.remove("active");
});

inputRight?.addEventListener("mouseover", function () {
  thumbRight.classList.add("hover");
});

inputRight?.addEventListener("mouseout", function () {
  thumbRight.classList.remove("hover");
});

inputRight?.addEventListener("mousedown", function () {
  thumbRight.classList.add("active");
});

inputRight?.addEventListener("mouseup", function () {
  thumbRight.classList.remove("active");
});

// Nav bar
const navCloseBtn = document.querySelector(".nav__close-btn");
console.log(navCloseBtn);
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
const headerNavBtn = document.querySelector(".header__hamburger");
navCloseBtn?.addEventListener("click", function () {
  nav.classList.remove("active");
  overlay.classList.remove("active");
});

headerNavBtn?.addEventListener("click", function () {
  nav.classList.add("active");
  overlay.classList.add("active");
});

overlay?.addEventListener("click", function () {
  nav.classList.remove("active");
  overlay.classList.remove("active");
});

// Stores & Service Centers
const citiesBtn = document.querySelector(".select-input.s1");
const citiesList = document.querySelector(".select-input.s1 .list-tab");
const districtBtn = document.querySelector(".select-input.s2");
const districtList = document.querySelector(".select-input.s2 .list-tab");
const citiAPI = "http://zuzo.xyz/api/v1/regions";

citiesBtn?.addEventListener("click", function () {
  citiesList.classList.toggle("active");
});

districtBtn?.addEventListener("click", function () {
  districtList.classList.toggle("active");
});

function renderCities(res) {
  const cities = res.data;
  cities.forEach((city) => {
    const { id, name } = city;
    const markup = `<div class="tab" data-id="${id}">${name}</div>`;
    citiesList?.insertAdjacentHTML("beforeend", markup);
  });

  const citiesName = document.querySelectorAll(".select-input.s1 .tab");
  citiesName.forEach((city) => {
    city.addEventListener("click", () => {
      const citiesInput = document.querySelector(".select-input.s1 span");
      citiesInput.innerText = city.innerHTML;
      const districtAPI = `http://zuzo.xyz/api/v1/regions/${city.dataset.id}/cities`;
      getDistrict(districtAPI);
    });
  });
}

function renderDistrict(res) {
  const districts = res.data;
  districtList.innerHTML = "";
  districts.forEach((d) => {
    const { id, name } = d;
    const markup = `<div class="tab" data-id="${id}">
                    <span>${name}</span>
                    </div>`;
    districtList.insertAdjacentHTML("beforeend", markup);
  });

  const districtsName = document.querySelectorAll(".select-input.s2 .tab");
  districtsName.forEach((d) => {
    d.addEventListener("click", () => {
      const districtsInput = document.querySelector(".select-input.s2 span");
      districtsInput.textContent = d.innerText;
    });
  });
}

const getDistrict = async function (API) {
  try {
    const data = await fetch(API);
    const res = await data.json();
    renderDistrict(res);
  } catch (error) {
    console.log(error);
  }
};

const getCities = async function () {
  try {
    const data = await fetch(citiAPI);
    const res = await data.json();
    renderCities(res);
  } catch (error) {
    console.log(error);
  }
};

getCities();

const storeItems = document.querySelectorAll(".list-result .item");
const storeMap = document.querySelector(".box-right iframe");

storeItems.forEach((item) => {
  item.addEventListener("click", () => {
    storeMap.src = `https://www.google.com/maps/embed?pb=${item.dataset.id}`;
  });
});

// Change bike on details page
const bikeColors = document.querySelectorAll(".details .color");
const bikeImg = document.querySelector(".banner__bike img");

bikeColors.forEach((color) => {
  color.addEventListener("click", () => {
    if (color.dataset.color === "black") {
      bikeImg.src = "../images/kymco-bike-black.png";
    } else if (color.dataset.color === "green") {
      bikeImg.src = "../images/kymco-bike-green.png";
    } else if (color.dataset.color === "red") {
      bikeImg.src = "../images/kymco-bike-red.png";
    }
  });
});

// Register Form Validation
const registerForm = document.querySelector(".register__form");
const name = document.querySelector(".register__form #name");
const email = document.querySelector(".register__form #email");
const address = document.querySelector(".register__form #address");
const phone = document.querySelector(".register__form #phone");
const bikeNumber = document.querySelector(".register__form #bike-number");
const bikeName = document.querySelector(".register__form #bike-name");
const storeName = document.querySelector(".register__form #store");

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      input.classList.add("invalid");
    } else {
      input.classList.remove("invalid");
    }
  });
}
registerForm?.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([name, email, address, phone, bikeNumber, bikeName, storeName]);
});

// Paroller init
$(".paroller").paroller();

// Scalize init
$(".scalize").scalize({ width: 100, height: 100, selector: ".marker" });
