'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HEADER_PREVIEW = 'img/muffin-grey.svg';
  var TypePhotoOptions = {
    WIDTH: 70,
    HEIGHT: 70,
    BORDER_RADIUS: 5
  };

  var userPhotoChooser = document.querySelector('.ad-form__field input[type=file]');
  var userPhotoImage = document.querySelector('.ad-form-header__preview img');
  var typePhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var typePhotoImage = document.querySelector('.ad-form__photo');

  var changeUserPhoto = function (result) {
    userPhotoImage.src = result;
  };

  var changeTypePhoto = function (result) {
    var newPhoto = document.createElement('img');
    newPhoto.src = result;
    newPhoto.width = TypePhotoOptions.WIDTH;
    newPhoto.height = TypePhotoOptions.HEIGHT;
    newPhoto.style.borderRadius = TypePhotoOptions.BORDER_RADIUS + 'px';
    typePhotoImage.appendChild(newPhoto);
  };

  var loadImage = function (element, action) {
    var file = element.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var hasMatchedFileType = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (hasMatchedFileType) {
        var reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          action(evt.target.result);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var onUserPhotoChange = function () {
    loadImage(userPhotoChooser, changeUserPhoto);
  };
  var onTypePhotoChange = function () {
    loadImage(typePhotoChooser, changeTypePhoto);
  };

  userPhotoChooser.addEventListener('change', onUserPhotoChange);
  typePhotoChooser.addEventListener('change', onTypePhotoChange);

  var removeImage = function () {
    userPhotoImage.src = HEADER_PREVIEW;
    var typePhotos = typePhotoImage.querySelectorAll('img');
    if (typePhotos) {
      typePhotos.forEach(function (item) {
        item.remove();
      });
    }
  };

  window.photo = {
    remove: removeImage
  };
})();
