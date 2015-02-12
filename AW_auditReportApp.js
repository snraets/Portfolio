var auditReportModule = angular.module('auditReportModule', []);

auditReportModule.config(['$httpProvider', function ($httpProvider) {
    jsonURLConverter($httpProvider);

}]);

auditReportModule.factory('FK_CLARITY_PROFILE_ID', ['$window', function ($window) {

    var FK_CLARITY_PROFILE_ID = $window.FK_CLARITY_PROFILE_ID;

    if (FK_CLARITY_PROFILE_ID === '' || typeof (FK_CLARITY_PROFILE_ID) === 'undefined') {
        FK_CLARITY_PROFILE_ID = '5095110';
    }

    return FK_CLARITY_PROFILE_ID;
}]);

auditReportModule.factory('AW_AUDIT_REPORT_CLARITY_DATA_OBJID', ['$window', function ($window) {

    var AW_AUDIT_REPORT_CLARITY_DATA_OBJID = $window.AW_AUDIT_REPORT_CLARITY_DATA;

    if (AW_AUDIT_REPORT_CLARITY_DATA_OBJID === '' || typeof (AW_AUDIT_REPORT_CLARITY_DATA_OBJID) === 'undefined') {
        AW_AUDIT_REPORT_CLARITY_DATA_OBID = '20654953';
    }

    return AW_AUDIT_REPORT_CLARITY_DATA_OBJID;
}]);

auditReportModule.factory('retrieveAuditReportServer', ['$http', '$q', 'AW_AUDIT_REPORT_CLARITY_DATA_OBJID', 'FK_CLARITY_PROFILE_ID', function ($http, $q, AW_AUDIT_REPORT_CLARITY_DATA_OBJID, FK_CLARITY_PROFILE_ID) {

    var auditData = {
        func: "ll"
        , objAction: "RunReport"
        , objID: AW_AUDIT_REPORT_CLARITY_DATA_OBJID
        , FK_CLARITY_PROFILE_ID: FK_CLARITY_PROFILE_ID
    };

    return {
        retrieveData: function () {

            var auditDeferred = $q.defer();

            $http.post("/livelink/llisapi.dll", auditData).success(function (data) {

                auditDeferred.resolve(data.myRows);
            });

            return auditDeferred.promise;
        }
    };
}]);

auditReportModule.controller('ReportController', ['$scope', 'retrieveAuditReportServer', '$location', function ($scope, retrieveAuditReportServer, $location) {

    retrieveAuditReportServer.retrieveData().then(function (data) {

        $scope.auditColumn = 'MY_TIMECOMPLETED';
        $scope.auditColumnOrder = false;

        $scope.auditRecords = data;

        if (typeof ($scope.auditRecords) != 'undefined' && $scope.auditRecords.length > 0) {
            $scope.auditList = true;

            $scope.subWorkTitle = function () {
                var x;
                x = $scope.auditRecords[0].SUBWORK_TITLE;
                return x;
            };
        }
        else {
            $scope.message = true;
        }
    });

    var host, splitHost, currentEnvironment, llHomeNickname;
    host = $location.host();
    splitHost = host.split(".");
    currentEnvironment = splitHost[1];
    llHomeNickname = "llisapi.dll/open/AwardManagementSystem";

    if (currentEnvironment == "build") { $scope.homeClarity = "https://grants.build.devebs.afrl.af.mil/niku/nu"; $scope.homeLiveLink = llHomeNickname }
    if (currentEnvironment == "int") { $scope.homeClarity = "https://grants.int.devebs.afrl.af.mil/niku/nu"; $scope.homeLiveLink = llHomeNickname }
    if (currentEnvironment == "prepebs") { $scope.homeClarity = "https://grants.prepebs.afrl.af.mil/niku/nu"; $scope.homeLiveLink = llHomeNickname }
    if (currentEnvironment == "prod") { $scope.homeClarity = "https://grants.ebs.afrl.af.mil/niku/nu"; $scope.homeLiveLink = llHomeNickname }

    $scope.homeHelp = 'https://livelink.ebs.afrl.af.mil/livelink/llisapi.dll?func=ll&objId=27408695&objAction=browse&viewType=1';
    $scope.homeSharePoint = 'https://org2.eis.afmc.af.mil/sites/afosr/default.aspx';
}]);
