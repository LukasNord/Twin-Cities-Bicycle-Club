myApp.service('AdminService', ['$http', '$location', '$mdDialog', function ($http, $location, $mdDialog) {
    console.log('AdminService Loaded');
    let self = this;
    self.pendingApprovedRides = {
        list: []
    };
    self.getUserRoles = {
        list: []
    };
    self.riderInfo = {
        list: []
    };

    self.rider = {
        first_name: '',
        last_name: '',
        member_id: ''
    };

    self.roleChange = {
        list: {}
    };

    self.pastMemberRides = {
        list: {}
    };

    self.getPendingApprovedRides = function () {
        return $http.get('/rides/admin/pendingApprovedRides')
            .then((response) => {
                console.log('Service, rides pending approval came back: ', response.data);
                response.data.forEach(ride => {
                    let momentDate = moment(ride.rides_date);
                    ride.date = momentDate.format('MM/DD/YYYY');
                    ride.time = momentDate.format('hh:mm A');
                    self.pendingApprovedRides.list.push(ride);
                });
                return response.data;
            })
            .catch((err) => {
                console.log('Error getting rides pending approval: ', err);
            })
    }

    self.getRoles = function () {
        return $http.get('/member/userRole')
            .then((response) => {
                console.log('got user roles:', response.data);
                self.getUserRoles.list = response.data;
                return response.data;
            })
            .catch((err) => {
                console.log('getting user roles failed:', err);
            })
    }
    self.findRider = function (rider) {
        if (rider.member_id == '') {
            rider.member_id = 0
        }
        if (rider.first_name == '') {
            rider.first_name = 'First';
        }
        if (rider.last_name == '') {
            rider.last_name = 'Last';
        }
        return $http.get(`/member/findRider/riderInfo/${rider.first_name}/${rider.last_name}/${rider.member_id}`)
            .then((response) => {
                console.log('search member response ', response);
                self.riderInfo.list = response.data;
                self.rider = {
                    first_name: '',
                    last_name: '',
                    member_id: ''
                }
            })
            .catch((err) => {
                console.log('getting role failed:', err);
            })
    }

    self.changeRole = function (role_name, member_id) {
        console.log('role name', role_name);
        return $http.put(`/member/changeRole/${member_id}`, role_name)
            .then((response) => {
                if (response) {
                    swal(`User role was successfully updated!`, {
                        icon: "success",
                    });
                    self.roleChange.list = response;
                    return response;
                }
            })
            .catch((err) => {
                swal('Error updating user role.', '', 'error');
                // console.log('role change failed: ', err);
            });
    }

    self.adminViewMemberPastRides = function (member_id) {
        console.log('member is ', member_id);
        return $http.put(`./member/adminViewMemberPastRides/${member_id}`)
            .then((response) => {
                self.pastMemberRides.list = response;
                return response
            })
            .catch((err) => {
                console.log('past ride data GET failed ', err);
            })
    }


    self.adminViewMemberPastRides = function (member, ev) {
        $mdDialog.show({
            controller: MyPastRidesController,
            controllerAs: 'vm',
            templateUrl: '../views/admin/templates/view-member-past-rides-modal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            resolve: {
                item: function () {
                    return member;
                }
            }
        })
    }

    function MyPastRidesController($mdDialog, item, AdminService) {
        const self = this;
        self.member = item;
        self.closeModal = function () {
            self.hide();
        }
    }













    self.changePassword = function(user){

        return $http.post('/api/user/admin/changePassword', user)
            .then((result)=>{
                return result;
            })
            .catch((err)=>{
                console.log('error with password change API call ', err);
                 
            })
    }

}]);