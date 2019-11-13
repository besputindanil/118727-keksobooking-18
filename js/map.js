'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var ARROW_HEIGHT = 22;
  var PRIMARY_MAIN_PIN_X = 570;
  var PRIMARY_MAIN_PIN_Y = 375;

  var IntervalCoords = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');

  var setPrimaryCoords = function () {
    addressInput.value = (PRIMARY_MAIN_PIN_X + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (PRIMARY_MAIN_PIN_Y + Math.floor(MAIN_PIN_HEIGHT / 2));
  };

  setPrimaryCoords();

  var setAddressCoords = function (x, y) {
    addressInput.value = (x + Math.floor(MAIN_PIN_WIDTH / 2)) + ', ' + (y + MAIN_PIN_HEIGHT + ARROW_HEIGHT);
  };

  var getActivePage = function () {
    map.classList.remove('map--faded');
    window.data.loadPins();
    window.form.activate();
    setAddressCoords(mapPinMain.offsetLeft, mapPinMain.offsetTop);
    window.form.changePricePlaceholder();
    window.form.changeRoomCapacity();
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
        top: IntervalCoords.Y_MIN - mapPinMain.offsetHeight - ARROW_HEIGHT,
        right: IntervalCoords.X_MAX - mapPinMain.offsetWidth / 2,
        bottom: IntervalCoords.Y_MAX - mapPinMain.offsetHeight - ARROW_HEIGHT,
        left: IntervalCoords.X_MIN - mapPinMain.offsetWidth / 2
      };

      if (mapPinMainCoords.x >= restrictions.left && mapPinMainCoords.x <= restrictions.right) {
        mapPinMain.style.left = mapPinMainCoords.x + 'px';
      }
      if (mapPinMainCoords.y >= restrictions.top && mapPinMainCoords.y <= restrictions.bottom) {
        mapPinMain.style.top = mapPinMainCoords.y + 'px';
      }

      setAddressCoords(mapPinMainCoords.x, mapPinMainCoords.y);
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
    window.util.pressEnter(evt, getActivePage);
  };

  mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  mapPinMain.addEventListener('keydown', onMapPinMainEnterPress);

  var getPinMainPrimaryPosition = function () {
    setPrimaryCoords();
    mapPinMain.style.left = PRIMARY_MAIN_PIN_X + 'px';
    mapPinMain.style.top = PRIMARY_MAIN_PIN_Y + 'px';
  };

  window.map = {
    element: map,
    getPinMainPrimaryPosition: getPinMainPrimaryPosition
  };
})();
