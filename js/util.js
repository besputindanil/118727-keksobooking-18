'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  window.util = {
    onEnterPress: function (evt, func) {
      if (evt.keyCode === ENTER_KEYCODE) {
        func();
      }
    },
    onEscPress: function (evt, func) {
      if (evt.keyCode === ESC_KEYCODE) {
        func();
      }
    },
    setDisabled: function (element) {
      for (var i = 0; i < element.length; i++) {
        element[i].setAttribute('disabled', 'disabled');
      }
    },
    removeDisabled: function (element) {
      for (var i = 0; i < element.length; i++) {
        element[i].removeAttribute('disabled', 'disabled');
      }
    }
  };
})();
