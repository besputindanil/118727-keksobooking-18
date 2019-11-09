'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HEADER_PREVIEW = 'img/muffin-grey.svg';
  var typePhotoOptions = {
    WIDTH: 70,
    HEIGHT: 70,
    BORDER_RADIUS: 5
  };

  var userPhotoChooser = document.querySelector('.ad-form__field input[type=file]');
  var userPhotoImage = document.querySelector('.ad-form-header__preview img');
  var typePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var typePhotoImage = document.querySelector('.ad-form__photo');

  var onUserPhotoChange = function () {
    var file = userPhotoChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          userPhotoImage.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var onTypePhotoChange = function () {
    var file = typePhotoChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var newPhoto = document.createElement('img');
          newPhoto.src = reader.result;
          newPhoto.width = typePhotoOptions.WIDTH;
          newPhoto.height = typePhotoOptions.HEIGHT;
          newPhoto.style.borderRadius = typePhotoOptions.BORDER_RADIUS + 'px';
          typePhotoImage.appendChild(newPhoto);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  userPhotoChooser.addEventListener('change', onUserPhotoChange);

  typePhotoChooser.addEventListener('change', onTypePhotoChange);

  var removeImage = function () {
    userPhotoImage.src = HEADER_PREVIEW;
    var addTypePhotos = typePhotoImage.querySelectorAll('img');
    if (addTypePhotos) {
      addTypePhotos.forEach(function (it) {
        it.remove();
      });
    }
  };

  window.photo = {
    remove: removeImage
  };
})();
