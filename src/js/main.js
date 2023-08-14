import { hotelsData } from "../utils/url_request.js";
import { selectFlag } from "./filtros.js";
import { hotelsPrices } from "./filtros.js";

const mainTag = document.createElement("main");
mainTag.setAttribute("class", "main");

export function printHotels(hotels) {
  mainTag.innerHTML = "";
  hotels.forEach((element) => {
    const cardHotel = document.createElement("div");
    cardHotel.setAttribute("class", "cardHotel");

    const containerCard = document.createElement("div");
    containerCard.setAttribute("class", "containerCard");

    const titleHotel = document.createElement("h3");
    titleHotel.setAttribute("class", "card__title");
    titleHotel.textContent = element.name;

    const descriptionHotel = document.createElement("p");
    descriptionHotel.setAttribute("class", "card__description");
    descriptionHotel.textContent = element.description;

    const containerInfoCard = document.createElement("div");
    containerInfoCard.setAttribute("class", "containerInfoCard");

    const containerCountry = document.createElement("div");
    containerCountry.setAttribute("class", "containerCountry");

    const paisHotel = document.createElement("p");
    paisHotel.setAttribute("class", "card__pais");
    paisHotel.textContent = element.country;

    const flagCountry = document.createElement("img");
    flagCountry.setAttribute("class", "flag__conuntry");
    flagCountry.src = `${selectFlag(element.country)}`;
    flagCountry.setAttribute("alt", "Flag of ${element.country");

    const containerRooms = document.createElement("div");
    containerRooms.setAttribute("class", "containerRooms");

    const roomsHotel = document.createElement("p");
    roomsHotel.setAttribute("class", "card__rooms");
    roomsHotel.textContent = element.rooms + " rooms-";

    const priceHotel = document.createElement("p");
    priceHotel.setAttribute("class", "card__price");
    priceHotel.textContent = hotelsPrices(element.price);

    const imageHotel = document.createElement("img");
    imageHotel.setAttribute("class", "card__image");
    imageHotel.setAttribute("src", element.photo);
    imageHotel.setAttribute("alt", "imagen del hotel" + element.name);

    const containerButton = document.createElement("div");
    containerButton.setAttribute("class", "containerButton");

    const bookCardButton = document.createElement("button");
    bookCardButton.setAttribute("class", "bookCardButton");
    bookCardButton.textContent = "Book it!";

    mainTag.appendChild(cardHotel);
    cardHotel.appendChild(containerCard);
    cardHotel.appendChild(descriptionHotel);
    cardHotel.appendChild(imageHotel);
    containerCard.appendChild(titleHotel);
    containerCard.appendChild(containerInfoCard);
    containerCard.appendChild(containerButton);
    containerInfoCard.appendChild(containerCountry);
    containerInfoCard.appendChild(containerRooms);
    containerCountry.appendChild(flagCountry);
    containerCountry.appendChild(paisHotel);
    containerRooms.appendChild(roomsHotel);
    containerRooms.appendChild(priceHotel);
    containerButton.appendChild(bookCardButton);
  });
}
export const main = async () => {
  app.appendChild(mainTag);
  const respuesta = await hotelsData();
  printHotels(respuesta);

  const footer = document.createElement("footer");
  app.appendChild(footer);
};
