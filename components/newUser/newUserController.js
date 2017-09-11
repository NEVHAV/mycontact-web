/**
 * Created by NEVHAV on 12/07/17.
 */
angular.module('contact')
    .controller ('newUserController', function ($scope, $http, $state, $timeout) {
        $scope.goHome = goHome;
        function goHome() {
            $state.go('home');
        }
        $scope.back = {};
        $scope.newUser = {};
        $scope.createUser = function () {
            var url = "http://localhost:8080/contacts/new";
            $http({
                method: 'POST',
                url: url,
                data: $scope.newUser
            }).then(function (response) {
                console.log(response);
                console.log('success');
                Materialize.toast('New user has been created!', 4000);
                $timeout(goHome, 5000);
            }, function (error) {
                console.log('error');
                if (error.status === 404)
                {
                    Materialize.toast('This username has had! Please choose another username!', 4000);
                }
            });
        }
    });