'use strict';
(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PINS_COUNT = 5;

  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var pinItem = pinTemplate.cloneNode(true);

    pinItem.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinItem.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinItem.querySelector('img').src = pin.author.avatar;
    pinItem.alt = pin.offer.title;

    var onPinItemClick = function () {
      deactivatePin();
      pinItem.classList.add('map__pin--active');
      window.card.remove();
      window.card.render(pin);
    };

    var onPinItemEnterPress = function (evt) {
      window.util.pressEnter(evt, onPinItemClick);
    };

    pinItem.addEventListener('click', onPinItemClick);
    pinItem.addEventListener('keydown', onPinItemEnterPress);

    return pinItem;
  };

  var render = function (pins) {
    var pinFragment = document.createDocumentFragment();
    var preparedPinsArray = pins.slice(0, PINS_COUNT);

    for (var i = 0; i < preparedPinsArray.length; i++) {
      pinFragment.appendChild(renderPin(pins[i]));
    }

    mapPins.appendChild(pinFragment);
  };

  var removePin = function () {
    var mapPinItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinItems.forEach(function (item) {
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
    count: PINS_COUNT,
    render: render,
    remove: removePin,
    deactivate: deactivatePin
  };
})();
