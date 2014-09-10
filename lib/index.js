module.exports = function($rootScope, $log, $ionicPlatform, PushHandler) {

    if (!window.cordova) {

        $log.warn('Cordova not detected, disabling Push notifications');

        return;
    }

    window.onNotificationAPN = PushHandler.push;

    var registerForPushNotifications = function() {

        var pushNotification = window.plugins.pushNotification;

        pushNotification.register(PushHandler.register, PushHandler.error, {
            "badge": "true",
            "sound": "true",
            "alert": "true",
            "ecb": "onNotificationAPN"
        });
    };

    $rootScope.$on('user:init', registerForPushNotifications);

    $ionicPlatform.ready(registerForPushNotifications);
};
