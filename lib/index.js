module.exports = function($ionicPlatform, $rootScope, apiEndpoint, $http, PushHandler) {

    function registerForPush() {

        if (!window.cordova) {

            console.log('Cordova not detected, disabling Push notifications');
            return;
        }

        var rawUser = localStorage.getItem('user');

        if (!rawUser) {

            console.log("User not found aborting push registration");

            return;
        }

        var user = JSON.parse(rawUser);

        var pushNotification = window.plugins.pushNotification;

        function tokenHandler(token) {

            $http
                .put(apiEndpoint + '/users/' + user._id, {
                    pushToken: token,
                    type: 'ios'
                });
        };

        function errorHandler(error) {
            console.log(JSON.stringify(error));
        };

        pushNotification.register(tokenHandler, errorHandler, {
            "badge": "true",
            "sound": "true",
            "alert": "true",
            "ecb": "onNotificationAPN"
        });
    }

    window.onNotificationAPN = PushHandler.push;

    $ionicPlatform.ready(registerForPush);
};
