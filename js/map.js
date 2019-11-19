'use strict';

(function () {
  var MAIN_PIN_HEIGHT = 65;
  var ARROW_HEIGHT = 22;

  var PinSizes = {
    MAIN_PIN_WITH_POINT_HIGHT: MAIN_PIN_HEIGHT + ARROW_HEIGHT,
    MAIN_PIN_WIDTH: 65
  };

  var PrimaryMapPinCoords = {
    X: 570,
    Y: 375
  };

  var IntervalCoords = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');

  var setDefaultCoords = function () {
    addressInput.value = (PrimaryMapPinCoords.X + Math.floor(PinSizes.MAIN_PIN_WIDTH / 2)) + ', ' + (PrimaryMapPinCoords.Y + Math.floor(MAIN_PIN_HEIGHT / 2));
  };

  setDefaultCoords();

  var setPrimaryCoords = function () {
    addressInput.value = (PrimaryMapPinCoords.X + Math.floor(PinSizes.MAIN_PIN_WIDTH / 2)) + ', ' + (PrimaryMapPinCoords.Y + PinSizes.MAIN_PIN_WITH_POINT_HIGHT);
  };

  var setAddressCoords = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  var getActivePage = function () {
    map.classList.remove('map--faded');
    window.data.loadPins();
    window.form.activate();
    setPrimaryCoords();
    window.form.changePricePlaceholder();
    window.form.changeRoomCapacity();
  };

  var onMapPinMainMouseDown = function (evt) {
    evt.preventDefault();
    getActivePage();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var correctedX;
    var correctedY;

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

      correctedX = Math.floor(mapPinMain.offsetLeft - shift.x + PinSizes.MAIN_PIN_WIDTH / 2);
      if (correctedX >= IntervalCoords.X_MIN && correctedX <= IntervalCoords.X_MAX) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      correctedY = mapPinMain.offsetTop - shift.y + PinSizes.MAIN_PIN_WITH_POINT_HIGHT;
      if (correctedY >= IntervalCoords.Y_MIN && correctedY <= IntervalCoords.Y_MAX) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      setAddressCoords(correctedX, correctedY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

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
    setDefaultCoords();
    mapPinMain.style.left = PrimaryMapPinCoords.X + 'px';
    mapPinMain.style.top = PrimaryMapPinCoords.Y + 'px';
  };

  window.map = {
    element: map,
    getPinMainPrimaryPosition: getPinMainPrimaryPosition
  };
})();
