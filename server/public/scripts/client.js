var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log('myApp -- config')
  $routeProvider
  // USERS 
  .when('/', {
    redirectTo: 'home'
  })
  .when('/ride-leader/my-rides', {
    templateUrl: '/views/ride-leader/templates/rideLeader.myRides.html',
    controller: 'RideLeaderController as vm',
    //resolve when users fleshed out more
    // resolve: {
    //   getuser : function(UserService){
    //     return UserService.getuser();
    //   }
    // }
  })
  .when('/home', {
    templateUrl: '/views/shared/home.html',
    controller: 'HomeController as vm',
  })
  .when('/register', {
    templateUrl: '/views/user/templates/register.html',
    controller: 'LoginController as vm'
  })
  .when('/user', {
    templateUrl: '/views/user/templates/user.html',
    controller: 'UserController as vm',
    resolve: {
      getuser : function(UserService){
          return UserService.getuser();
        }
    }
  })
  .when('/my-rides', {
    templateUrl: '/views/user/templates/member.myRides.html',
    controller: 'MemberMyRidesController as vm',
    //resolve when users fleshed out more
    // resolve: {
    //   getuser : function(UserService){
    //     return UserService.getuser();
    //   }
    // }
  })
  .when('/home', {
    templateUrl: '/views/shared/home.html',
    controller: 'HomeController as vm',
  })
  .when('/register', {
    templateUrl: '/views/user/templates/register.html',
    controller: 'LoginController as vm'
  })
  .when('/user', {
    templateUrl: '/views/user/templates/user.html',
    controller: 'UserController as vm',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/info', {
    templateUrl: '/views/user/templates/info.html',
    controller: 'InfoController as vm',
    resolve: {
      getuser : function(UserService){
        return UserService.getuser();
      }
    }
  })
  .when('/login', {
    templateUrl: '/views/shared/login.html',
    controller: 'LoginController as vm',
  })
  .otherwise({
    template: '<h1>404</h1>'
  })
  
  
}]);
