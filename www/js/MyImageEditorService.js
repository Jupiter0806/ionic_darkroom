/**
 * Created by jupiterli on 21/07/2016.
 *
 * Libraries used:
 *  1. darkroom, to edit an image, //https://github.com/MattKetmo/darkroomjs
 *  2. imageService, to resize an image //https://gist.github.com/fisch0920/37bac5e741eaec60e983
 *  3. jquery
 *
 * Files needed:
 *  1. darkroom.js
 *  2. darkroom.css
 *  3. fabric.js // darkroom dependency
 *  4. imageService.js
 *
 * Install:
 *  1. include darkroom.css
 *  2. include fabric.js and then darkroom.js at the last line within body tag
 *    (if these two file included at the header, then an error will occurred which will say and find element.body.appendChild)
 *  3. include imageService.js after ionic or angular including instruction
 *  4. include MyImageEditorService after ionic or angular including instruction
 *  5. add sen into app.js application module dependencies list
 *
 */

(function () {
  angular.module('sen', ['fisch0920'])
    .service('MyImageEditorService', ['imageService', '$timeout', MyImageEditorService]);

  function MyImageEditorService(imageService, $timeout) {

    function ImageEditorOptions (imgID) {
      this.imgID = imgID || ''; // the id of the img tag
      this.canvasSize = {
        minWidth: 170,
        minHeight: 170,
        maxWidth: 400,
        maxHeight: 400
      };
      this.cropOptions = {
        minWidth: 125,
        minHeight: 125,
        ratio : 1
      };
      this.saveOptions = {
        callback: null // callback when save button clicked
      };
      this.outputSize = {
        width: 125,
        height: 125
      }; // the final output image size
    }

    return {
      newEditor : function (options, onSuccess, onError) {
        $timeout(function () {
          $('#' + options.imgID).parent().css('padding-top', '50px');
          new Darkroom('#' + options.imgID, {
            // Canvas initialization size
            minWidth : options.canvasSize.minWidth,
            minHeight : options.canvasSize.minHeight,
            maxWidth : options.canvasSize.maxWidth,
            maxHeight : options.canvasSize.maxHeight,

            // Plugins options
            plugins : {
              crop: {
                minHeight : options.cropOptions.minHeight,
                minWidth : options.cropOptions.minWidth,
                ratio : options.cropOptions.ratio
              },

              save : {
                callback : options.saveOptions.callback || defaultSaveCallback
              }
            }

          });

        }, 200);

        function defaultSaveCallback() {
          var darkroom = this.darkroom;

          $('#' + options.imgID).parent().parent().css('padding-top', '0');

          darkroom.selfDestroy();

          $('body').append("<img id='hidden_img_for_resize_di9s8839s9c' src='" + darkroom.canvas.toDataURL() + "' hidden>");
          imageService.resize($('#hidden_img_for_resize_di9s8839s9c')[0], options.outputSize.width, options.outputSize.height)
            .then(function (resizedImage) {
              onSuccess(resizedImage.currentSrc, darkroom);
            }, function (error) {
              onError(error);
            });

        }

      },

      ImageEditorOptions : ImageEditorOptions
    }

  }

})();





























