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

  var setAddressCoords = function (x, y) {
    addressInput.value = x + ', ' + y;
  };

  var setPrimaryCoords = function (isActivePage) {
    var deactivatedX = PrimaryMapPinCoords.X + Math.floor(PinSizes.MAIN_PIN_WIDTH / 2);
    var deactivatedY = PrimaryMapPinCoords.Y + Math.floor(MAIN_PIN_HEIGHT / 2);
    var activatedY = PrimaryMapPinCoords.Y + PinSizes.MAIN_PIN_WITH_POINT_HIGHT;

    if (isActivePage) {
      setAddressCoords(deactivatedX, activatedY);
    } else {
      setAddressCoords(deactivatedX, deactivatedY);
    }
  };

  setPrimaryCoords();

  var setCurrentCoords = function () {
    var changedX = parseInt(mapPinMain.style.left, 10) + Math.floor(PinSizes.MAIN_PIN_WIDTH / 2);
    var changedY = parseInt(mapPinMain.style.top, 10) + PinSizes.MAIN_PIN_WITH_POINT_HIGHT;

    setAddressCoords(changedX, changedY);
  };

  var getActivePage = function () {
    map.classList.remove('map--faded');
    window.data.loadPins();
    window.form.activate();
    setPrimaryCoords(true);
    window.form.validateRoomCapacity();
  };

  var onMapPinMainMouseDown = function (evt) {
    evt.preventDefault();
    getActivePage();

    var startCoords = {
      x: evt.clientX - mapPinMain.getBoundingClientRect().left,
      y: evt.clientY - mapPinMain.getBoundingClientRect().top
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var newCoords = {
        x: moveEvt.clientX - startCoords.x - map.getBoundingClientRect().left,
        y: moveEvt.clientY - startCoords.y - map.getBoundingClientRect().top
      };

      if (newCoords.y < IntervalCoords.Y_MIN - PinSizes.MAIN_PIN_WITH_POINT_HIGHT) {
        newCoords.y = IntervalCoords.Y_MIN - PinSizes.MAIN_PIN_WITH_POINT_HIGHT;
      } else if (newCoords.y > IntervalCoords.Y_MAX - PinSizes.MAIN_PIN_WITH_POINT_HIGHT) {
        newCoords.y = IntervalCoords.Y_MAX - PinSizes.MAIN_PIN_WITH_POINT_HIGHT;
      }

      if (newCoords.x < IntervalCoords.X_MIN + Math.floor(PinSizes.MAIN_PIN_WIDTH / 2)) {
        newCoords.x = IntervalCoords.X_MIN - Math.floor(PinSizes.MAIN_PIN_WIDTH / 2);
      } else if (newCoords.x > IntervalCoords.X_MAX - Math.floor(PinSizes.MAIN_PIN_WIDTH / 2)) {
        newCoords.x = IntervalCoords.X_MAX - Math.floor(PinSizes.MAIN_PIN_WIDTH / 2);
      }

      mapPinMain.style.left = newCoords.x + 'px';
      mapPinMain.style.top = newCoords.y + 'px';

      setCurrentCoords();
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
    setPrimaryCoords();
    mapPinMain.style.left = PrimaryMapPinCoords.X + 'px';
    mapPinMain.style.top = PrimaryMapPinCoords.Y + 'px';
  };

  window.map = {
    element: map,
    getPinMainPrimaryPosition: getPinMainPrimaryPosition
  };
})();
