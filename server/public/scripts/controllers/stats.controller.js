myApp.controller('MyStatsController', ['MyProfileService', '$location','$http','RideDetailService', function (MyProfileService, $location, $http, RideDetailService) {
    // console.log('MyProfileController created');
    let self = this;
    self.viewProfile = {};
    self.goal = {};
    self.totalMiles = {};

    self.viewProfile = function () {
        MyProfileService.viewProfile().then((res) => {
            // console.log('back from database', res);
            self.viewProfile = res[0];
        })
    }
    self.viewProfile();
    self.statsView = function (){
        $location.path('/stats')
    }

    self.getGoalData = function(){
        $http.get('/member/stats/goal')
            .then((response)=>{
                self.goal.currentGoal = response.data[0].goal;
                RideDetailService.getMileageForMember()
                    .then((res)=>{
                        console.log('response on mileage: ', res);
                        self.totalMiles = res.sum;
                    goalProgress.refresh(self.totalMiles,response.data[0].goal);
                        
                    })
                
            })
            .catch((err)=>{
                console.log('error getting stats: ', err);   
            })

    }
    self.getGoalData();

    self.setGoal = function(newGoal){
        console.log('new Goal: ', newGoal);
        $http.put('/member/stats/goal', newGoal)
            .then((response)=>{
                console.log('response on goal POST: ', response);
                self.getGoalData();
                swal('Goal Updated!','', 'success')
                self.goal.setGoal = '';
            })
            .catch((err)=>{
                console.log('error with goal post: ', err);
                
            })
    }
    var goalProgress = new JustGage({
        id: "bigfella",
        value: 0,
        min: 0,
        max: 100,
        title: "Goal Progress",
        titlePosition: 'below',
        pointer: true,
        gaugeWidthScale: 1,
        relativeGaugeSize: true,
        levelColors: [
            "#ff0000",
            "#ffff66",
            "#ccff99",
            "#33cc33"
        ]
    
          
      });
   
    


    


}]);