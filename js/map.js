'use strict';

(function () {
  var PRIMARY_MAIN_PIN_X = 570;
  var PRIMARY_MAIN_PIN_Y = 375;

  var intervalCoords = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 120,
    Y_MAX: 630
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  window.form.setAddressCoords(PRIMARY_MAIN_PIN_X, PRIMARY_MAIN_PIN_Y);

  var getActivePage = function () {
    map.classList.remove('map--faded');
    window.filter.activate();
    window.form.activate();
    window.data.loadPins();
  };

  var onMapPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinMainCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      var restrictions = {
        top: intervalCoords.Y_MIN + mapPinMain.offsetHeight,
        right: intervalCoords.X_MAX - mapPinMain.offsetWidth,
        bottom: intervalCoords.Y_MAX - mapPinMain.offsetHeight,
        left: intervalCoords.X_MIN
      };

      if (mapPinMainCoords.x >= restrictions.left && mapPinMainCoords.x <= restrictions.right) {
        mapPinMain.style.left = mapPinMainCoords.x + 'px';
      }
      if (mapPinMainCoords.y >= restrictions.top && mapPinMainCoords.y <= restrictions.bottom) {
        mapPinMain.style.top = mapPinMainCoords.y + 'px';
      }

      window.form.setAddressCoords(mapPinMainCoords.x, mapPinMainCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      getActivePage();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMapPinMainEnterPress = function (evt) {
    window.util.onEnterPress(evt, getActivePage);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnterPress);

  var getPinMainPrimaryCoords = function () {
    window.form.setAddressCoords(PRIMARY_MAIN_PIN_X, PRIMARY_MAIN_PIN_Y);
    mapPinMain.style.left = PRIMARY_MAIN_PIN_X + 'px';
    mapPinMain.style.top = PRIMARY_MAIN_PIN_Y + 'px';
  };

  window.map = {
    element: map,
    getPinMainPrimaryCoords: getPinMainPrimaryCoords
  };
})();
