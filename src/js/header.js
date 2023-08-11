import { price } from "./filtros.js";
import { rooms } from "./filtros.js";
import { country } from "./filtros.js";
import { filterHotelsPrice } from "./filtros.js";
import { printHotels } from "./main.js";
import { hotelsData } from "../utils/url_request.js";
import { filterHotelsDates } from "./filtros.js";
import { hotelsPrices } from "./filtros.js";

const respuesta = await hotelsData();
console.log(respuesta);

export const header = () => {
  const app = document.getElementById("app");

  const header = document.createElement("header");
  header.setAttribute("class", "header");
  app.appendChild(header);

  const imgHeader = document.createElement("img");
  imgHeader.src = "./src/resources/cover.png";
  imgHeader.alt = "logo hotels";
  imgHeader.setAttribute("class", "imgHeader");
  header.appendChild(imgHeader);

  const containerHeader = document.createElement("div");
  containerHeader.setAttribute("class", "containerHeader");
  header.appendChild(containerHeader);

  const tituloHeader = document.createElement("h1");
  tituloHeader.setAttribute("class", "tituloHeader");
  containerHeader.appendChild(tituloHeader);
  tituloHeader.textContent = "Book it!";

  //button

  const barraHeader = document.createElement("div");
  containerHeader.appendChild(barraHeader);
  barraHeader.setAttribute("class", "barraHeader");

  const allCountrysInput = document.createElement("select");
  barraHeader.appendChild(allCountrysInput);
  allCountrysInput.setAttribute("class", "allCountrysInput");

  const imgIconoCountry = document.createElement("img");
  imgIconoCountry.setAttribute("class", "imgIconoCountry");
  imgIconoCountry.setAttribute("src", "");
  imgIconoCountry.setAttribute("alt", "icono country");

  const defaultCountry = document.createElement("option");
  defaultCountry.value = "";
  defaultCountry.textContent = "All Countrys";
  allCountrysInput.appendChild(defaultCountry);

  country.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    allCountrysInput.appendChild(option);
  });

  const checkInInput = document.createElement("input");
  barraHeader.appendChild(checkInInput);
  checkInInput.setAttribute("class", "checkIn");
  checkInInput.setAttribute("type", "date");
  checkInInput.setAttribute("min", "2023-08-01");
  checkInInput.addEventListener("input", filterHotelsDates);

  const checkOutInput = document.createElement("input");
  barraHeader.appendChild(checkOutInput);
  checkOutInput.setAttribute("class", "checkOut");
  checkOutInput.setAttribute("type", "date");
  checkOutInput.setAttribute("min", "2023-08-02");
  checkOutInput.addEventListener("input", filterHotelsDates);

  const allPriceSelect = document.createElement("select");
  barraHeader.appendChild(allPriceSelect);
  allPriceSelect.setAttribute("class", "allPriceSelect");

  const defaultPrice = document.createElement("option");
  defaultPrice.value = "";
  defaultPrice.textContent = "All Price";
  allPriceSelect.appendChild(defaultPrice);

  price.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = hotelsPrices(element);
    allPriceSelect.appendChild(option);
  });

  // const selectElement
  allPriceSelect.addEventListener("change", function () {
    const priceSelected = parseInt(allPriceSelect.value);
    filterHotelsPrice(priceSelected);
  });

  const allSizesInput = document.createElement("select");
  barraHeader.appendChild(allSizesInput);
  allSizesInput.setAttribute("class", "allSizesInput");

  const defaultRooms = document.createElement("option");
  defaultRooms.value = "";
  defaultRooms.textContent = "All Rooms";
  allSizesInput.appendChild(defaultRooms);

  rooms.forEach((element) => {
    const option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    allSizesInput.appendChild(option);
  });

  const clearButton = document.createElement("button");
  barraHeader.appendChild(clearButton);
  clearButton.setAttribute("class", "clearButton");
  clearButton.textContent = "Clear";
  clearButton.addEventListener("click", (e) => {
    printHotels(respuesta);
  });

  const containerHeaderParagraph = document.createElement("div");
  containerHeader.appendChild(containerHeaderParagraph);

  const captionHeader = document.createElement("h3");
  captionHeader.setAttribute("class", "captionHeader");
  containerHeaderParagraph.appendChild(captionHeader);
  captionHeader.textContent = "We have found for you...";

  const paragraphHeader = document.createElement("p");
  containerHeaderParagraph.appendChild(paragraphHeader);
  paragraphHeader.textContent =
    "All sizes hotels of all category prices,in all countries";
};
