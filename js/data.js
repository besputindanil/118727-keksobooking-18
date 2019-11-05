'use strict';

(function () {
  var priceRestrictions = {
    LOWER: 10000,
    UPPER: 50000
  };

  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var housingPrice = filters.querySelector('#housing-price');
  var housingRooms = filters.querySelector('#housing-rooms');
  var housingGuests = filters.querySelector('#housing-guests');
  var housingFeatures = filters.querySelector('#housing-features');
  var main = document.querySelector('main');

  var filterType = function (pin) {
    return housingType.value === 'any' || pin.offer.type === housingType.value;
  };

  var filterPrice = function (pin) {
    if (housingPrice.value === 'any') {
      return true;
    } else if (housingPrice.value === 'low') {
      return pin.offer.price < priceRestrictions.LOWER;
    } else if (housingPrice.value === 'middle') {
      return pin.offer.price >= priceRestrictions.LOWER && pin.offer.price <= priceRestrictions.UPPER;
    } else if (housingPrice.value === 'high') {
      return pin.offer.price > priceRestrictions.UPPER;
    }
    return true;
  };

  var filterRooms = function (pin) {
    return housingRooms.value === 'any' || pin.offer.rooms === parseInt(housingRooms.value, 10);
  };

  var filterGuests = function (pin) {
    return housingGuests.value === 'any' || pin.offer.guests === parseInt(housingGuests.value, 10);
  };

  var filterFeauters = function (pin) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return [].every.call(checkedFeatures, function (element) {
      return pin.offer.features.includes(element.value);
    });
  };

  var updatePins = function () {
    var pinsCopy = pins.slice();
    var filterPins = pinsCopy.filter(filterType).filter(filterPrice).filter(filterRooms).filter(filterGuests).filter(filterFeauters);
    window.pin.render(filterPins);
  };

  var onFilterChange = window.debounce(function () {
    window.pin.remove();
    window.card.remove();
    updatePins();
  });

  filters.addEventListener('change', onFilterChange);

  var pins = [];

  var onLoad = function (data) {
    pins = data;
    window.pin.render(pins);
  };

  var closeError = function () {
    var error = document.querySelector('.error');
    error.remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onErrorClick = function () {
    closeError();
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCode.ESC_KEYCODE) {
      closeError();
    }
  };

  var onError = function () {
    var errorPopup = document.querySelector('#error').content.querySelector('.error');
    main.insertAdjacentElement('afterbegin', errorPopup);
    var closeBtnError = document.querySelector('.error__button');
    closeBtnError.addEventListener('click', onErrorClick);
    errorPopup.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var loadPins = function () {
    if (pins.length === 0) {
      window.backend.load(onLoad, onError);
    }
  };

  var closeSuccess = function () {
    var success = document.querySelector('.success');
    success.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.keyCode.ESC_KEYCODE) {
      closeSuccess();
    }
  };

  var onSuccess = function () {
    var successPopup = document.querySelector('#success').content.querySelector('.success');
    document.body.insertAdjacentElement('afterbegin', successPopup);
    successPopup.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var onFormSuccessSubmit = function () {
    onSuccess();
    window.map.classList.add('map--faded');
    window.form.deactivateForm();
    window.pin.remove();
    window.card.remove();
    window.map.getPinMainPrimaryCoords();
  };

  var adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onFormSuccessSubmit, onError);
    evt.preventDefault();
  });

  window.data = {
    loadPins: loadPins,
  };
})();
