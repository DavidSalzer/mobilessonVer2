MetronicApp.factory('httpRequest', ['$http', '$q', function ($http, $q) {
    return {
        sendRequest: function (method, queryString, request) {
            var deferred = $q.defer();

            $http({
                url: domain + queryString,
                method: method,
                data: request
            }).
            success(function (data, status, header, config) {
                if (data.status == 'error' && data.errorMsg == 'noLogin') {
                    window.location.replace(cmsOrigin + 'templates/admin4/login.html');
                }
                deferred.resolve(data);
            }).
            error(function (data, status, header, config) {
                deferred.reject(data);
            })

            return deferred.promise;
        }
    }
} ])