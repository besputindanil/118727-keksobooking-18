'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PRIMARY_MAIN_PIN_X = 570;
  var PRIMARY_MAIN_PIN_Y = 375;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ARROW_HEIGHT = 22;

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var setDisabled = function () {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  setDisabled();

  var setAddressCoords = function () {
    addressInput.value = (PRIMARY_MAIN_PIN_X + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (PRIMARY_MAIN_PIN_Y + Math.floor(MAIN_PIN_HEIGHT / 2) + ARROW_HEIGHT);
  };

  var getActivePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].removeAttribute('disabled');
    }
    setAddressCoords();
  };

  mapPinMain.addEventListener('mousedown', function () {
    getActivePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      getActivePage();
    }
  });
})();
