'use strict';

(function () {
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
  var addressInput = adForm.querySelector('#address');

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

  var setAddressCoords = function () {
    addressInput.value = (PRIMARY_MAIN_PIN_X + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (PRIMARY_MAIN_PIN_Y + Math.floor(MAIN_PIN_HEIGHT / 2) + ARROW_HEIGHT);
  };

  var roomNumberSelect = document.querySelector('[name=rooms]');
  var capacitySelect = document.querySelector('[name=capacity]');

  var validateCapacity = function () {
    var roomsNumber = roomNumberSelect.value;
    var capacity = parseInt(capacitySelect.value, 10);
    capacitySelect.setCustomValidity(ROOM_CAPACITY_RELATION[roomsNumber].includes(capacity) ? '' : ROOM_CAPACITY_MESSAGE);
  };

  roomNumberSelect.addEventListener('change', validateCapacity);

  capacitySelect.addEventListener('change', validateCapacity);

  window.form = {
    removeDisabled: removeDisabled,
    setAddressCoords: setAddressCoords
  }
})();
