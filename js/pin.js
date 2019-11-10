'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PINS_COUNT = 5;

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.alt = pin.offer.title;

    var onPinElementClick = function () {
      deactivatePin();
      pinElement.classList.add('map__pin--active');
      window.card.remove();
      window.card.render(pin);
    };

    var onPinElementEnterPress = function (evt) {
      window.util.onEnterPress(evt, onPinElementClick);
    };

    pinElement.addEventListener('click', onPinElementClick);
    pinElement.addEventListener('keydown', onPinElementEnterPress);

    return pinElement;
  };

  var render = function (data) {
    var takeNumber = data.length > PINS_COUNT ? PINS_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderPin(data[i]));
    }
  };

  var removePin = function () {
    var mapPinElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinElements.forEach(function (item) {
      item.remove();
    });
  };

  var deactivatePin = function () {
    var mapActivePin = document.querySelector('.map__pin--active');
    if (mapActivePin) {
      mapActivePin.classList.remove('map__pin--active');
    }
  };

  window.pin = {
    render: render,
    remove: removePin,
    deactivate: deactivatePin
  };
})();
