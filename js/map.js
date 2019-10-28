'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var getActivePage = function () {
    map.classList.remove('map--faded');
    window.form.removeDisabled();
    window.form.setAddressCoords();
    if (window.data.pins.length === 0) {
      window.backend.load(window.data.onLoad, window.data.onError);
    }
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
