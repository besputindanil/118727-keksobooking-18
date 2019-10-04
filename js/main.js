'use strict';

var ADS_COUNT = 8;

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var TITLES = ['Заголовок предложения 1', 'Заголовок предложения 2', 'Заголовок предложения 3'];

var PRICE_MIN = 100;

var PRICE_MAX = 100000;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];

var ROOMS = [1, 2, 3, 4];

var GUESTS = [1, 2, 3, 4];

var CHECKIN = ['12:00', '13:00', '14:00'];

var CHECKOUT = ['12:00', '13:00', '14:00'];

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3'];

var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var X_MIN = 0;

var X_MAX = 1200;

var Y_MIN = 130;

var Y_MAX = 630;

var PIN_WIDTH = 40;

var PIN_HEIGHT = 40;

var ENTER_KEYCODE = 13;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (array) {
  return array.filter(function () {
    return getRandomNumber(0, array.length - 1);
  });
};

var pins = [];
for (var i = 0; i < ADS_COUNT; i++) {
  pins.push({
    author: {
      avatar: AVATARS[i]
    },
    offer: {
      title: TITLES[getRandomNumber(0, TITLES.length - 1)],
      address: 'getRandomNumber(X_MIN, X_MAX), getRandomNumber(Y_MIN, Y_MAX)',
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: TYPES[getRandomNumber(0, TYPES.length - 1)],
      rooms: ROOMS[getRandomNumber(0, ROOMS.length - 1)],
      guests: GUESTS[getRandomNumber(0, GUESTS.length - 1)],
      checkin: CHECKIN[getRandomNumber(0, CHECKIN.length - 1)],
      checkout: CHECKOUT[getRandomNumber(0, CHECKOUT.length - 1)],
      features: getRandomArray(FEATURES),
      description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
      photos: getRandomArray(PHOTOS),
    },
    location: {
      x: getRandomNumber(X_MIN, X_MAX),
      y: getRandomNumber(Y_MIN, Y_MAX)
    }
  });
}

// var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var adElement = pinTemplate.cloneNode(true);

  adElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  adElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  adElement.querySelector('img').src = pin.author.avatar;
  adElement.alt = pin.offer.title;

  return adElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

// mapPins.appendChild(fragment);

/* Задание: подробности */

var PRIMARY_MAIN_PIN_X = 570;
var PRIMARY_MAIN_PIN_Y = 375;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var ARROW_HEIGHT = 22;

var ROOM_CAPACITY_RELATION = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
var ROOM_CAPACITY_MESSAGE = 'Количество гостей не соответствует количеству комнат';

var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var addressInput = adForm.querySelector('#address');
var roomNumberSelect = adForm.querySelector('[name=rooms]');
var capacitySelect = adForm.querySelector('[name=capacity]');

var insertDisabled = function () {
  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].setAttribute('disabled', 'disabled');
  }
};

insertDisabled();

var setAddressCoordinates = function () {
  addressInput.value = (PRIMARY_MAIN_PIN_X + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (PRIMARY_MAIN_PIN_Y + Math.floor(MAIN_PIN_HEIGHT / 2) + ARROW_HEIGHT);
};

var getActivePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].removeAttribute('disabled');
  }

  setAddressCoordinates();
};

mapPinMain.addEventListener('mousedown', function () {
  getActivePage();
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    getActivePage();
  }
});

var validateCapacity = function () {
  var roomsNumber = roomNumberSelect.value;
  var capacity = parseInt(capacitySelect.value, 10);
  capacitySelect.setCustomValidity(ROOM_CAPACITY_RELATION[roomsNumber].includes(capacity) ? '' : ROOM_CAPACITY_MESSAGE);
};

roomNumberSelect.addEventListener('change', validateCapacity);

capacitySelect.addEventListener('change', validateCapacity);
