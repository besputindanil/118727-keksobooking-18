'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');

  var removePins = function () {
    var mapPin = document.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPin.length; i++) {
      window.pin.mapPins.removeChild(mapPin[i]);
    }
  };

  var updatePins = function () {
    var sameTypes = pins.filter(function (pin) {
      return ((housingType.value === 'any') ? true : (pin.offer.type === housingType.value));
    });
    window.pin.render(sameTypes);
  };

  var onTypeChange = function () {
    removePins();
    updatePins();
  };

  housingType.addEventListener('change', onTypeChange);

  var pins = [];

  var onLoad = function (data) {
    pins = data;
    window.pin.render(pins);
  };

  var onError = function (errorMessage) {
    var errorPopup = document.querySelector('#error').content.querySelector('.error');
    var errorText = errorPopup.querySelector('.error__message');
    errorText.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  window.data = {
    pins: pins,
    onLoad: onLoad,
    onError: onError
  };
})();
