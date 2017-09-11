/**
 * Created by NEVHAV on 03/07/17.
 */
angular.module('contact', [
    'oc.lazyLoad',
    'ui.router'
    ])

.constant('API_URL', 'http://localhost:8080/contacts/public/')

.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider ) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'components/home/homeView.html',
            controller: 'homeController',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            files: ['components/home/homeController.js']
                        }
                    )
                }
            }
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'components/contact/contactView.html',
            controller: 'contactController',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            files: ['components/contact/contactController.js']
                        }
                    )
                }
            }
        })

        .state('newUser', {
            url: '/newUser',
            templateUrl: 'components/newUser/newUserView.html',
            controller: 'newUserController',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            files: ['components/newUser/newUserController.js']
                        }
                    )
                }
            }
        })
}]);