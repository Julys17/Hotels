import { hotelsData } from "../utils/url_request.js";
import { printHotels } from "./main.js";

//filtro para trer precios
const response = await hotelsData();

const filterPrice = () => {
  const listPrice = [...new Set(response.map((element) => element.price))];
  return listPrice.sort();
};
export const price = await filterPrice();

export const hotelsPrices = (element) => {
  switch (element) {
    case 1:
      return "$";
      break;
    case 2:
      return "$$";
      break;
    case 3:
      return "$$$";
      break;
    case 4:
      return "$$$$";
      break;
  }
};

//filtro para traer paises
const filterCountry = () => {
  const listCountry = [...new Set(response.map((element) => element.country))];
  return listCountry.sort();
};
export const country = await filterCountry();

export const selectFlag = (element) => {
  switch (element) {
    case "Argentina":
      return "src/resources/imgs/argentina.png";
      break;
    case "Brasil":
      return "src/resources/imgs/brasil.png";
      break;

    case "Chile":
      return "src/resources/imgs/chile.png";
      break;

    case "Uruguay":
      return "src/resources/imgs/uruguay.png";
      break;
  }
};

//filtro para traer habitaciones
const compare = (a, b) => {
  return a - b;
};

const filterRooms = () => {
  const listRooms = [...new Set(response.map((element) => element.rooms))];
  return listRooms.sort(compare);
};
export const rooms = await filterRooms();

export function filterHotelsPrice(priceSelected) {
  const filterHotels = response.filter(
    (element) => element.price == priceSelected
  );
  printHotels(filterHotels);
}

const todayValue = new Date();
function zeroPrinter(dateValue) {
  const text = "" + dateValue;
  console.log(dateValue);
  if (text.length == 1) {
    return "0" + dateValue;
  } else {
    return dateValue;
  }
}

export function checkinDate() {
  return (
    todayValue.getFullYear() +
    "-" +
    zeroPrinter(todayValue.getMonth() + 1) +
    "-" +
    zeroPrinter(todayValue.getDate())
  );
}

export function checkoutDate() {
  return (
    todayValue.getFullYear() +
    "-" +
    zeroPrinter(todayValue.getMonth() + 1) +
    "-" +
    zeroPrinter(todayValue.getDate() + 1)
  );
}

export function filterHotelsDates() {
  const dateIn = document.querySelector(".checkIn").value;
  const dateOut = document.querySelector(".checkOut").value;
  const existDates = dateIn && dateOut;
  const fechaHoy = new Date().setHours(0, 0, 0, 0);

  function dateDefault(date) {
    return date == false ? fechaHoy : date;
  }

  const dateCheckIn = new Date(dateDefault(dateIn));
  const dateCheckInLocal = new Date(
    dateCheckIn.getTime() + dateCheckIn.getTimezoneOffset() * 60000
  );
  const dateCheckOut = new Date(dateDefault(dateOut));
  const dateCheckOutLocal = new Date(
    dateCheckOut.getTime() + dateCheckOut.getTimezoneOffset() * 60000
  );

  const filterDate = response.filter(({ availabilityFrom, availabilityTo }) => {
    const availabilityHoltes = fechaHoy + availabilityFrom;

    const availabilityDays = availabilityHoltes + availabilityTo;
    return (
      dateCheckInLocal.getTime() >= availabilityHoltes &&
      dateCheckOutLocal.getTime() <= availabilityDays
    );
  });

  if (filterDate.length > 0) {
    printHotels(filterDate);
  } else {
    document.querySelector(".main").innerHTML =
      "We're sorry, there are no hotels available on these dates";
  }
}
