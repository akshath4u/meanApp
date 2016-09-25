'use strict';

angular.module('meanAppApp')
  .controller('UsersCtrl', function ($scope,$modal,$http,toaster) {
    var self=this;

    self.sortType     = 'name'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    self.searchUser   = '';     // set the default search/filter term

    //load the registered users
    self.loadRegisteredusers = function() {
        self.loader = true;
        $http.get('/api/users').success(function(users) {
            self.userList = users;
            self.loader = false;
        });
    };

    self.convert=function(date){
        date = new Date(date);
    };

    self.loadRegisteredusers();
    self.user={address:[{}]};
    self.selectedUser={};
    
    self.open=function(user,type){

        if(angular.equals(type,'edit')){
        self.selectedUser.type='edit';
        self.user= user;
        self.user.dob=new Date(self.user.dob);
        }else{
        self.selectedUser.type='register';
        }

        self.modalInstance=$modal.open({
        templateUrl: '../app/users/users.modal.html',
        scope: $scope,
        controller: 'UsersCtrl',
        size: 'md',
        resolve: {
            user: function () {
            return self.user;
            }
        }
        });
    }

    self.register = function() {
        self.user.role='user';
        $http.post('/api/users', self.user).success(function(user) {
        self.modalInstance.dismiss('cancel');
        toaster.pop('success', 'Success', 'Succesfully Registered!');
        self.userList.push(user);
        self.user={};
        }).error(function(err){
            toaster.pop('Oops!', 'Warning', 'Something went wrong. Please try again!');
        });
    };

    self.cancel = function() {
        self.modalInstance.dismiss('cancel');
        self.user={};
    };


    self.deleteConfirm=function(user){
        self.user=user;
        self.deleteModalInstance=$modal.open({
        template: '<div class="modal-header"><h4 class="modal-title">Delete user</h4></div> <div class="modal-body">Are you sure you want to delete?</div><div class="modal-footer"><button class="btn btn-primary" type="button" ng-click="userCtrl.deleteUser()">Yes</button><button class="btn btn-primary" type="button" ng-click="userCtrl.cancelConfirm()">No</button></div>',
        scope: $scope,
        controller: 'UsersCtrl',
        size: 'sm',
        resolve: {
            user: function () {
            return self.user;
            }
        }
        });
        
    };

    self.deleteUser=function(){
        self.deleteModalInstance.dismiss('cancel');
        $http.delete('/api/users/'+self.user._id).success(function(user) {
        self.loadRegisteredusers();
        toaster.pop('success', 'Success', 'Succesfully Deleted!');
        }).error(function(err){
            toaster.pop('Oops!', 'Warning', 'Something went wrong. Please try again!');
        });
    };

    self.cancelConfirm=function(){
        self.deleteModalInstance.dismiss('cancel');
    };

    self.update = function() {
        $http.put('/api/users/'+self.user._id, self.user).success(function(user) {
        self.modalInstance.dismiss('cancel');
        self.user={};
        self.loadRegisteredusers();
        toaster.pop('success', 'Success', 'Succesfully Updated!');
        }).error(function(err){
            toaster.pop('Oops!', 'Warning', 'Something went wrong. Please try again!');
        });
    };

    self.fetchUsers = function(){
        console.log(self.searchUser);
        if(self.searchUser === ''){
            self.loadRegisteredusers();
        }else{
            $http.get('/api/users/search/' + self.searchUser).success(function(users) {
                self.userList = users;
            }).error(function(err){
                toaster.pop('Oops!', 'Warning', 'Something went wrong. Please try again!');
            });
        }
    };
});
