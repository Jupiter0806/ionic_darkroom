angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, imageService) {
    $timeout(function () {
      var darkroom = new Darkroom('#myimg', {
        // Canvas initialization size
        minWidth: 170,
        minHeight: 170,
        maxWidth: 400,
        maxHeight: 400,

        // Plugins options
        plugins: {
          crop: {
            minHeight: 125,
            minWidth: 125,
            ratio: 1
          },

          save: {
            callback: function () {
              this.darkroom.selfDestroy();

              $scope.newImage = darkroom.canvas.toDataURL();

              var file1 = new File([$scope.newImage], "file1");

              $scope.newImageLength = $scope.newImage.length;

              $scope.$apply();

              $('body').append("<img id='we400c4' src='" + darkroom.canvas.toDataURL() + "' hidden>");


              imageService.resize($('#we400c4')[0], 500, 50).then(function (resizedImage) {
                $scope.resizedImage = resizedImage.currentSrc;

                $scope.resizedImageLength = resizedImage.currentSrc.length;

                var file2 = new File([$scope.resizedImage], "file2");

              });
            }
          }
        }
      });
    }, 500)
  })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, MyImageEditorService) {

    var options = new MyImageEditorService.ImageEditorOptions('account-img');

    var handler = null;

   MyImageEditorService.newEditor(options, function (resizedImage, handler3) {
    $scope.resultImage = resizedImage;
     handler = handler3;
  }, function (errorMsg) {
    alert(errorMsg);
  });
});





























