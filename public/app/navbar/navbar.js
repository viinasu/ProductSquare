angular.module("myApp").directive("navBar", ['$window', "auth", "data", "imageUpload", '$location', function($window, auth, data, imageUpload, $location) {

  return {
    restrict: 'E',
    templateUrl: 'app/navbar/navbar.html',
    link: function(scope, elem, attrs) {
      auth.authLogin(scope);
      
      scope.changeRoute = function(){
        $('#profileCompleteModal').modal('hide');
        $location.path('/projects');
      };

      //put the newuserSubmit function here.
      scope.newUserSubmit = function(realName, email, password) {
        auth.newUser(realName, email, password, scope);
      };

      console.log(localStorage.userID);
      if (localStorage.userID !== undefined) {
        console.log("userID!", localStorage.userID);
        scope.userID = localStorage.userID;
      }

      scope.uploadUserProfileImage = function() {
        console.log("selectedFile!!!");
        console.log("event", event);
        imageUpload.userImage("dswright", event, function(url){
          scope.userProfileImage = url;
          scope.$apply();
        }); //run the userImage upload from the imageUpload factory.
      };

      scope.saveUserImage = function() {
        console.log("saving image in scope..!");
        data.setUserProfileImage(scope.userProfileImage, localStorage.userID);
        $('#profileImageModal').modal('hide'); //hide the signup modal.
        $('#profileCompleteModal').modal('show'); //show the uploadImage modal.
      };

      scope.$on('userCreated', function (event, user){ //when a user is created
        $('#signUpModal').modal('hide'); //hide the signup modal.
        $('#profileImageModal').modal('show'); //show the uploadImage modal.
        console.log("user created!", user);
        scope.userProfileImage = user.profileImage; //set profileimage to default image to start.
        scope.$apply();
      });

      scope.close = function() {
        scope.submission = false;
      };
      scope.login = function(email, password) {
        auth.authWithPass(email, password, scope);
      };

      scope.logout = function(){
        scope.loggedIn = false;
        auth.logout();
      };
    }
  }
}])


