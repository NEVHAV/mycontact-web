/**
 * Created by NEVHAV on 04/07/17.
 */
angular.module('contact')
    .controller('homeController', function ($scope, $http, $state) {
        $scope.gotoContact = gotoContact;
        $scope.newUser = newUser;
        $scope.user = {};

        function gotoContact() {
            $state.go('contact');
        }
        function newUser() {
            $state.go('newUser');
        }

        $(document).ready(function(){
            $('.parallax').parallax();
        });
        $(document).ready(function(){
            $('.slider').slider();
        });

        $scope.signIn = function () {
            $(document).ready(function() {
                $('#signIn').modal('open');
            });
        };

        $scope.sign = function () {
          var url = "http://localhost:8080/contacts/log";
          $http({
              method: 'POST',
              url: url,
              data: $scope.user
          }).then(function (response) {
              console.log(response);
              console.log('success');
              gotoContact();
          }, function (error) {
              console.log("error: method post, sign");
              Materialize.toast('Your username hasn\'t had or your password is wrong!', 4000);
          });
        };
    });