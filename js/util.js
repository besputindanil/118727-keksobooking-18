'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    pressEnter: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    pressEsc: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
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
