'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var getActivePage = function () {
    map.classList.remove('map--faded');
    window.form.removeDisabled();
    window.form.setAddressCoords();
    window.data.loadPins();
  };

  mapPinMain.addEventListener('mousedown', function () {
    getActivePage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.keyCode.ENTER_KEYCODE) {
      getActivePage();
    }
  });
})();
