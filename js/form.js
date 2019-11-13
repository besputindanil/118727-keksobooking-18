'use strict';

(function () {
  var ROOM_CAPACITY_MESSAGE = 'Количество гостей не соответствует количеству комнат';

  var RoomCapacityRelation = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var TypePriceRelation = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var priceInput = adForm.querySelector('#price');
  var typeSelect = document.querySelector('[name=type]');
  var timeInSelect = document.querySelector('[name=timein]');
  var timeOutSelect = document.querySelector('[name=timeout]');
  var roomNumberSelect = document.querySelector('[name=rooms]');
  var capacitySelect = document.querySelector('[name=capacity]');

  window.util.setDisabled(adFormFieldset);

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.removeDisabled(adFormFieldset);
  };

  var deactivateForm = function () {
    window.util.setDisabled(adFormFieldset);
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
  };

  var onTypeChange = function (evt) {
    var minPrice = TypePriceRelation[evt.target.value.toUpperCase()];
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
    capacitySelect.setCustomValidity(RoomCapacityRelation[roomsNumber].includes(capacity) ? '' : ROOM_CAPACITY_MESSAGE);
  };

  roomNumberSelect.addEventListener('change', onRoomCapacityChange);
  capacitySelect.addEventListener('change', onRoomCapacityChange);

  var changePricePlaceholder = function () {
    priceInput.placeholder = TypePriceRelation.FLAT;
  };

  window.form = {
    activate: activateForm,
    deactivate: deactivateForm,
    changePricePlaceholder: changePricePlaceholder,
    changeRoomCapacity: onRoomCapacityChange
  };
})();
