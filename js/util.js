'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    pressEnter: function (evt, func) {
      if (evt.keyCode === ENTER_KEYCODE) {
        func();
      }
    },
    pressEsc: function (evt, func) {
      if (evt.keyCode === ESC_KEYCODE) {
        func();
      }
    },
    setDisabled: function (elements) {
      elements.forEach(function (item) {
        item.disabled = true;
      });
    },
    removeDisabled: function (elements) {
      elements.forEach(function (item) {
        item.disabled = false;
      });
    },
  };
})();
