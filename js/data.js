'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var housingType = filters.querySelector('#housing-type');
  var main = document.querySelector('main');

  var removePins = function () {
    var mapPin = document.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPin.length; i++) {
      window.pin.mapPins.removeChild(mapPin[i]);
    }
  };

  var updatePins = function () {
    var sameTypes = pins.slice().filter(function (pin) {
      return housingType.value === 'any' || pin.offer.type === housingType.value;
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

  var closeError = function () {
    var error = document.querySelector('.error');
    error.remove();
    document.removeEventListener('keydown', onErrorEscPress)
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

  var onSuccess = function (){
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
