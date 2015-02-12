var routeControllers = angular.module('routeControllers', ['angular.filter']);

poModule.config(['$httpProvider', function ($httpProvider) {
    jsonURLConverter($httpProvider);
}]);

routeControllers.factory('retrieveDropDown', ['$http', '$q', function ($http, $q) {

    var subBPACData = {
        func: "ll",
        objAction: "RunReport",
        objID: 21058581
    };
    return {
        retrieveData: function () {

            var deferred = $q.defer();

            $http.post("/livelink/llisapi.dll", subBPACData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data = {};
                    data.myRows = [];
                }
                deferred.resolve(data.myRows);
            });
            return deferred.promise;
        }
    }
}]);

routeControllers.factory('retrieveProjectsSet1', ['$http', '$q', function ($http, $q) {

    var retrieveData = {
        func: "ll",
        objAction: "RunReport",
        objID: 21078904,
        inputLabel1: "",
        inputLabel2: "",
        inputLabel3: "",
        inputLabel4: "",
        inputLabel5: ""
    };

    return {
        retrieveData: function (subBpac) {

            var deferred = $q.defer();

            retrieveData.inputLabel1 = subBpac;
            //retrieveData.inputLabel5 = PROGRAM_ID;

            $http.post("/livelink/llisapi.dll", retrieveData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data = {};
                    data.myRows = [];
                }
                deferred.resolve(data.myRows);
            });
            return deferred.promise;
        }
    };
}]);

routeControllers.factory('retrieveProjectsSet2', ['$http', '$q', function ($http, $q) {

    var retrieveData = {
        func: "ll",
        objAction: "RunReport",
        objID: 21078820,
        inputLabel1: "",
        inputLabel2: "",
        inputLabel3: "",
        inputLabel4: "",
        inputLabel5: ""
    };

    return {
        retrieveData: function (subBpac, PROGRAM_ID) {

            var deferred = $q.defer();

            retrieveData.inputLabel1 = subBpac;
            retrieveData.inputLabel5 = PROGRAM_ID;

            $http.post("/livelink/llisapi.dll", retrieveData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data = {};
                    data.myRows = [];
                }
                deferred.resolve(data.myRows);
            });
            return deferred.promise;
        }
    };
}]);

routeControllers.factory('retrieveProposalsSet1', ['$http', '$q', function ($http, $q) {

    var retrieveData = {
        func: "ll",
        objAction: "RunReport",
        objID: 21058616,
        inputLabel1: "",
        inputLabel2: "",
        inputLabel3: "",
        inputLabel4: "",
        inputLabel5: ""
    };

    return {
        retrieveData: function (subBpac) {

            var deferred = $q.defer();

            retrieveData.inputLabel1 = subBpac;

            $http.post("/livelink/llisapi.dll", retrieveData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data = {};
                    data.myRows = [];
                }
                deferred.resolve(data.myRows);
            });
            return deferred.promise;
        }
    };
}]);


routeControllers.factory('retrieveProposalsSet2', ['$http', '$q', function ($http, $q) {

    var retrieveData = {
        func: "ll",
        objAction: "RunReport",
        objID: 21079382,
        inputLabel1: "",
        inputLabel2: "",
        inputLabel3: "",
        inputLabel4: "",
        inputLabel5: ""
    };

    return {
        retrieveData: function (subBpac, PROGRAM_ID) {

            var deferred = $q.defer();

            retrieveData.inputLabel1 = subBpac;
            retrieveData.inputLabel5 = PROGRAM_ID;

            $http.post("/livelink/llisapi.dll", retrieveData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data = {};
                    data.myRows = [];
                }
                deferred.resolve(data.myRows);
            });
            return deferred.promise;
        }
    };
}]);

routeControllers.controller('dropDowns', ['$scope', '$q', 'retrieveDropDown', 'retrieveProjectsSet1', 'retrieveProjectsSet2', 'retrieveProposalsSet1', 'retrieveProposalsSet2', function ($scope, $q, retrieveDropDown, retrieveProjectsSet1, retrieveProjectsSet2, retrieveProposalsSet1, retrieveProposalsSet2) {

    $scope.dropDownList = [];
    $scope.dataSet1 = [];
    $scope.dataSet2 = [];

    $scope.showResults = false;
    $scope.showDataSet1 = false;
    $scope.showDataSet2 = false;
    $scope.showDataSet3 = false;

    retrieveDropDown.retrieveData().then(function (data) {
        $scope.dropDownList = data;
    });

    $scope.retrieveProjectsProposals = function () {

        $scope.showResults = false;
        $scope.showDataSet1 = false;
        $scope.showDataSet2 = false;
        $scope.showDataSet3 = false;

        $q.all([retrieveProjectsSet1.retrieveData($scope.selectedDropDown.SUBBPAC), retrieveProjectsSet2.retrieveData($scope.selectedDropDown.SUBBPAC, $scope.selectedDropDown.PROGRAM_ID), retrieveProposalsSet1.retrieveData($scope.selectedDropDown.SUBBPAC), retrieveProposalsSet2.retrieveData($scope.selectedDropDown.SUBBPAC, $scope.selectedDropDown.PROGRAM_ID)]).then(function (data) {
            $scope.dataSet1 = data[0];
            //$scope.dataSet1 = $scope.dataSet1.concat(data[1]); //PROPOSALS
            //$scope.dataSet1 = $scope.dataSet1.concat(data[2]);
            //$scope.dataSet1 = $scope.dataSet1.concat(data[3]);
            $scope.dataSet2 = data[1];
            //$scope.dataSet2 = $scope.dataSet1.concat(data[3]); //PROPOSALS

            $scope.showResults = true;
            $scope.showDataSet1 = true;
            $scope.showDataSet2 = true;
            $scope.showDataSet3 = true;
        });
    };

    $scope.filterPRIMARY_SUBBPAC_Programs = function (item) {

        if (item.PROGRAM_NAME === $scope.selectedDropDown.PROGRAM_NAME && item.PRIMARY_SUBBPAC != null) {
            return true;
        }
        else {
            return false;
        }
    };

    $scope.filterPrograms = function (item) {

        if (item.PROGRAM_NAME === $scope.selectedDropDown.PROGRAM_NAME) {
            return false;
        }
        else {
            return true;
        }
    };

    $scope.filterPRIMARY_SUBBPAC = function (item) {

        if (item.PRIMARY_SUBBPAC == null) {
            return true;
        }
        else {
            return false;
        }
    };
}]);

routeControllers.controller('resultsController', ['$scope', function ($scope) {

    $scope.TestValue = "Results CONTROLLER IS WORKING";
}]);
