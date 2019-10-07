'use strict';

(function () {
  var ROOM_CAPACITY_RELATION = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var ROOM_CAPACITY_MESSAGE = 'Количество гостей не соответствует количеству комнат';

  var roomNumberSelect = document.querySelector('[name=rooms]');
  var capacitySelect = document.querySelector('[name=capacity]');

  var validateCapacity = function () {
    var roomsNumber = roomNumberSelect.value;
    var capacity = parseInt(capacitySelect.value, 10);
    capacitySelect.setCustomValidity(ROOM_CAPACITY_RELATION[roomsNumber].includes(capacity) ? '' : ROOM_CAPACITY_MESSAGE);
  };

  roomNumberSelect.addEventListener('change', validateCapacity);

  capacitySelect.addEventListener('change', validateCapacity);
})();
