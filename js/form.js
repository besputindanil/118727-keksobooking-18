'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ARROW_HEIGHT = 22;
  var ROOM_CAPACITY_MESSAGE = 'Количество гостей не соответствует количеству комнат';

  var roomCapacityRelation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var typePriceRelation = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var priceInput = adForm.querySelector('#price');
  var addressInput = adForm.querySelector('#address');
  var typeSelect = document.querySelector('[name=type]');
  var timeInSelect = document.querySelector('[name=timein]');
  var timeOutSelect = document.querySelector('[name=timeout]');
  var roomNumberSelect = document.querySelector('[name=rooms]');
  var capacitySelect = document.querySelector('[name=capacity]');

  var setDisabled = function () {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  setDisabled();

  var removeDisabled = function () {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].removeAttribute('disabled');
    }
  };

  var setAddressCoords = function (x, y) {
    addressInput.value = (x + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (y + Math.floor(MAIN_PIN_HEIGHT / 2) + ARROW_HEIGHT);
  };


  var onTypeChange = function (evt) {
    var minPrice = typePriceRelation[evt.target.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  typeSelect.addEventListener('change', onTypeChange);

  var onTimeInSelectChange = function (evt) {
    timeOutSelect.value = evt.target.value;
  };

  var onTimeOutSelectChange = function (evt) {
    timeInSelect.value = evt.target.value;
  };

  timeInSelect.addEventListener('change', onTimeInSelectChange);
  timeOutSelect.addEventListener('change', onTimeOutSelectChange);

  var onRoomCapacityChange = function () {
    var roomsNumber = roomNumberSelect.value;
    var capacity = parseInt(capacitySelect.value, 10);
    capacitySelect.setCustomValidity(roomCapacityRelation[roomsNumber].includes(capacity) ? '' : ROOM_CAPACITY_MESSAGE);
  };

  roomNumberSelect.addEventListener('change', onRoomCapacityChange);
  capacitySelect.addEventListener('change', onRoomCapacityChange);

  window.form = {
    removeDisabled: removeDisabled,
    setAddressCoords: setAddressCoords
  };
})();
