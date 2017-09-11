/**
 * Created by NEVHAV on 03/07/17.
 */
angular.module('contact')
    .controller('contactController', function ($scope, $http, API_URL) {

        $scope.title = 'My Contact';
        $http.get(API_URL + "contacts").then(function (response) {
            $scope.contacts = response.data.data;
        }, function (error) {});

        $scope.toggle = function (modal, id) {
          $scope.modal = modal;
          switch (modal) {
              case 'add':
                  $scope.form_title = "Add new contact";
                  console.log("adding");
                  $scope.contact={};
                  $scope.title = 'My Contact - New Contact';
                  break;
              case 'edit':
                  $scope.form_title = "Contact";
                  $scope.id = id;
                  $scope.contact = angular.copy(this.contact);
                  $scope.title = 'My Contact - Edit Contact';
                  // $http.get(API_URL + 'contacts/' + id).then(function (response) {
                  //     console.log(response);
                  //     $scope.contact = response.data.data;
                  // }, function (error) {
                  //     console.log("error: edit error");
                  // });
                  break;
              default:
                  console.log("fail");
                  break;
          }
          console.log(id);
          $(document).ready(function() {
                $('#contactModal').modal('open');
          });

        };

        $(".button-collapse").sideNav();
        $('.collapsible').collapsible();

        if ($('#contactModal').modal('close'))
        {
            $scope.title = 'My Contact';
        }

        $scope.dropdown = function () {
            $(document).ready(function () {
                $('.dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrainWidth: false, // Does not change width of dropdown to that of the activator
                        hover: true, // Activate on hover
                        gutter: 0, // Spacing from edge
                        belowOrigin: false, // Displays dropdown below the button
                        alignment: 'left', // Displays dropdown with edge aligned to the left of button
                        stopPropagation: false // Stops event propagation
                    }
                );
                // $('.dropdown-button').dropdown('open');
            });
        };

        $scope.save = function (modal, id) {
            var url = API_URL + 'contacts';
            if (modal === 'edit') {
             url +="/" + id;
             $http({
                    method: 'PUT',
                    url: url,
                    data: $scope.contact
                }).then(function (response) {
                    console.log(response);
                    location.reload();
                }, function (error) {
                    console.log("error: method put");
                    alert('error: post to server');
                });
            }

            else {
                $http({
                    method: 'POST',
                    url: url,
                    data: $scope.contact
                }).then(function (response) {
                    console.log(response);
                    location.reload();
                }, function (error) {
                    console.log("error: method post");
                    alert('error: post to server');
                });
                Materialize.toast('New contact has been added!', 4000);
            }
        };

        $scope.confirmDelete = function (id) {
          var isConfirmDelete = confirm('Are you sure to delete this contact?');
          if (isConfirmDelete) {
              $http({
                  method: 'DELETE',
                  url: API_URL + 'contacts/' +id
              }).then(function (data) {
                  console.log(data);
                  location.reload();
              }, function (error) {
                  console.log(data);
                  alert('error: delete to server');
              });
              Materialize.toast('Deleted!', 4000)
          }
          else {
              return false;
          }
        };
        
        $scope.contact_us = function () {
            $(document).ready(function() {
                $('#contact_us').modal('open');
            });
        };

        $scope.about = function () {
            $(document).ready(function() {
                $('#about').modal('open');
            });
        };

        $scope.order = 'name';
        $scope.sort = function () {
            if ($scope.order === 'name')
            {
                $scope.order = '-name';
            }
            else
            {
                $scope.order = 'name';
            }
        }
    });