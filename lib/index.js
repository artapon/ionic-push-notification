module.exports = function($ionicPlatform, $log, PushHandler) {

    if (!window.cordova) {

        $log.warn('Cordova not detected, disabling Push notifications');

        return;
    }

    window.onNotificationAPN = PushHandler.push;

    $ionicPlatform.ready(function registerForPushNotifications() {

        var pushNotification = window.plugins.pushNotification;

        pushNotification.register(PushHandler.register, PushHandler.error, {
            "badge": "true",
            "sound": "true",
            "alert": "true",
            "ecb": "onNotificationAPN"
        });
    });
};
