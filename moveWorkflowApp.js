var workflowManagerApp = angular.module('workflowManagerApp', []);

workflowManagerApp.config(['$httpProvider', function ($httpProvider) {
    jsonURLConverter($httpProvider);
}]);

workflowManagerApp.factory('AW_READY_STEPS', ['$window', function ($window) {

    var AW_READY_STEPS = $window.AW_READY_STEPS;

    if (AW_READY_STEPS === '' || typeof (AW_READY_STEPS) === 'undefined') {
        AW_READY_STEPS = '5095110';
    }

    return AW_READY_STEPS;
}]);

workflowManagerApp.factory('AW_AUDIT_LOG_WORKFLOW', ['$window', function ($window) {

    var AW_AUDIT_LOG_WORKFLOW = $window.AW_AUDIT_LOG_WORKFLOW;

    if (AW_AUDIT_LOG_WORKFLOW === '' || typeof (AW_AUDIT_LOG_WORKFLOW) === 'undefined') {
        AW_AUDIT_LOG_WORKFLOW = '20776480';
    }

    return AW_AUDIT_LOG_WORKFLOW;
}]);

workflowManagerApp.factory('AW_U_RS_ACTION_WF_EVAL', ['$window', function ($window) {

    var AW_U_RS_ACTION_WF_EVAL = $window.AW_U_RS_ACTION_WF_EVAL;

    if (AW_U_RS_ACTION_WF_EVAL === '' || typeof (AW_U_RS_ACTION_WF_EVAL) === 'undefined') {
        AW_U_RS_ACTION_WF_EVAL = '20777946';
    }

    return AW_U_RS_ACTION_WF_EVAL;
}]);

workflowManagerApp.factory('AW_I_RS_WF_AUDIT_LOG', ['$window', function ($window) {

    var AW_I_RS_WF_AUDIT_LOG = $window.AW_I_RS_WF_AUDIT_LOG;

    if (AW_I_RS_WF_AUDIT_LOG === '' || typeof (AW_I_RS_WF_AUDIT_LOG) === 'undefined') {
        AW_I_RS_WF_AUDIT_LOG = '19282266';
    }

    return AW_I_RS_WF_AUDIT_LOG;
}]);

workflowManagerApp.factory('AW_RANDOM_WF', ['$window', function ($window) {

    var AW_RANDOM_WF = $window.AW_RANDOM_WF;

    if (AW_RANDOM_WF === '' || typeof (AW_RANDOM_WF) === 'undefined') {
        AW_RANDOM_WF = '20854181';
    }

    return AW_RANDOM_WF;
}]);

workflowManagerApp.factory('CURRENT_USER', ['$window', function ($window) {

    var CURRENT_USER = $window.CURRENT_USER;

    if (CURRENT_USER === '' || typeof (CURRENT_USER) === 'undefined') {
        CURRENT_USER = '19282266';
    }

    return CURRENT_USER;
}]);

workflowManagerApp.factory('processButtons', [function () {

    function provideButtons(stepName, ACTION_TYPE) {

        var buttons, stepNumber = stepName.substr(0, 2);

        // PUT ON AOARD TRACK
        if (stepNumber === "IH") {

            buttons = [{ buttonName: "Send On", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "01") {

            buttons = [{ buttonName: "Evaluations Complete", EVALUATIONS: { EVAL_NEXT_STEP: "Scheduler", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "02") {

            buttons = [{ buttonName: "Documents Complete", EVALUATIONS: { EVAL_NEXT_STEP: "Scheduler", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "03") {

            if (ACTION_TYPE == "non_contracting") {
                buttons = [{ buttonName: "Send to RPF/PK", EVALUATIONS: { EVAL_NEXT_STEP: "Outgoing MFD", EVAL_PA_KICKBACK_TO_PO: "Yes", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                    { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO", EVAL_PA_KICKBACK_TO_PO: "Yes", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
                ];
            }
            else {
                buttons = [{ buttonName: "Send to RPF/PK", EVALUATIONS: { EVAL_NEXT_STEP: "Team Lead", EVAL_PA_KICKBACK_TO_PO: "Yes", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                    { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO", EVAL_PA_KICKBACK_TO_PO: "Yes", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
                ];
            }
        }

        if (stepNumber === "04") {

            buttons = [{ buttonName: "Send for Certification", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "No", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "Yes", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "05") {

            buttons = [{ buttonName: "PR is Certified", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "06") {

            buttons = [{ buttonName: "Return to PA", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "07") {

            buttons = [{ buttonName: "Send to Buyer", EVALUATIONS: { EVAL_NEXT_STEP: "Buyer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO - Team Lead", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PA", EVALUATIONS: { EVAL_NEXT_STEP: "PA - Team Lead", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Send for Review", EVALUATIONS: { EVAL_NEXT_STEP: "Cancelled - Team Lead", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Cancel PR", EVALUATIONS: { EVAL_NEXT_STEP: "Cancelled - Team Lead", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "08") {

            buttons = [{ buttonName: "Send to PK Officer", EVALUATIONS: { EVAL_NEXT_STEP: "PK Officer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO - Buyer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PA", EVALUATIONS: { EVAL_NEXT_STEP: "PA - Buyer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to Team Lead", EVALUATIONS: { EVAL_NEXT_STEP: "Team Lead", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Cancel PR", EVALUATIONS: { EVAL_NEXT_STEP: "Cancelled - Buyer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "09") {

            buttons = [{ buttonName: "Send to Distribution", EVALUATIONS: { EVAL_NEXT_STEP: "Distribution", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Send for Review", EVALUATIONS: { EVAL_NEXT_STEP: "PK Review - PK Officer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to Buyer", EVALUATIONS: { EVAL_NEXT_STEP: "Buyer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO - PK Officer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PA", EVALUATIONS: { EVAL_NEXT_STEP: "PA - PK Officer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to Team Lead", EVALUATIONS: { EVAL_NEXT_STEP: "Team Lead", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Cancel PR", EVALUATIONS: { EVAL_NEXT_STEP: "Cancelled - PK Officer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "10") {

            buttons = [{ buttonName: "Return to Sender", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "11") {

            buttons = [{ buttonName: "Return to Sender", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "12") {

            buttons = [{ buttonName: "Return to Sender", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "13") { // SEE determineEVAL_NEXT_STEP_PA_PO() for kickback determined

            buttons = [{ buttonName: "Return to Sender", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "14") { // SEE determineEVAL_NEXT_STEP_PA_PO() for kickback determined

            buttons = [{ buttonName: "Return to Sender", EVALUATIONS: { EVAL_NEXT_STEP: "", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "15") {

            buttons = [{ buttonName: "File Award", EVALUATIONS: { EVAL_NEXT_STEP: "File Award", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PKO", EVALUATIONS: { EVAL_NEXT_STEP: "PK Officer", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "16") {

            buttons = [{ buttonName: "PR is Certified", EVALUATIONS: { EVAL_NEXT_STEP: "AOARD Upload Award", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO - AOARD", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "17") {

            buttons = [{ buttonName: "File Award", EVALUATIONS: { EVAL_NEXT_STEP: "CertPR", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true },
                { buttonName: "Kick Back to PO", EVALUATIONS: { EVAL_NEXT_STEP: "PO - AOARD Upload Award", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "18") {

            buttons = [{ buttonName: "PK Review Complete", EVALUATIONS: { EVAL_NEXT_STEP: "MFD Review Complete", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "19") {

            buttons = [{ buttonName: "File Documents", EVALUATIONS: { EVAL_NEXT_STEP: "Finance Complete", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "20") {

            buttons = [{ buttonName: "Funding Decommitted", EVALUATIONS: { EVAL_NEXT_STEP: "Decommitted", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "21") {

            buttons = [{ buttonName: "Return to Sender", EVALUATIONS: { EVAL_NEXT_STEP: "PO", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        if (stepNumber === "22") {

            buttons = [{ buttonName: "STINFO Review Complete", EVALUATIONS: { EVAL_NEXT_STEP: "CertPR", EVAL_PA_KICKBACK_TO_PO: "", EVAL_DIVISION_REVIEW: "", EVAL_LEGAL_REVIEW: "", EVAL_POLICY_REVIEW: "" }, showButton: true }
            ];
        }

        return buttons;
    }

    return function (rows) {

        var rowNumber = 0, buttons;

        for (; rowNumber < rows.length; rowNumber++) {
            buttons = provideButtons(rows[rowNumber].SUBWORKTASK_TITLE, rows[rowNumber].ACTION_TYPE);
            rows[rowNumber].buttons = buttons;

            if (rows[rowNumber].SUBWORKTASK_TITLE.substr(0, 2) === "05") {
                rows[rowNumber].SUBWORKTASK_TITLE = "05. PA Uploads Certified Funding Documents";
            }
        }

        return rows;
    }
}]);

workflowManagerApp.factory('retrieveRandomWF', ['$http', '$q', 'AW_RANDOM_WF', function ($http, $q, AW_RANDOM_WF) {

    var workflowData = {
        func: "ll"
        , objAction: "RunReport"
        , objID: AW_RANDOM_WF
        , inputLabel1: ""
    };

    return {
        retrieveData: function (WF_TYPE) {

            var workflowDeferred = $q.defer();

            workflowData.inputLabel1 = WF_TYPE;

            $http.post("/livelink/llisapi.dll", workflowData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data.myRows = [];
                }

                workflowDeferred.resolve(data.myRows);
            });

            return workflowDeferred.promise;
        }
    };
}]);

workflowManagerApp.factory('retrieveStepServer', ['$http', '$q', 'AW_READY_STEPS', 'processButtons', function ($http, $q, AW_READY_STEPS, processButtons) {

    var workflowData = {
        func: "ll"
        , objAction: "RunReport"
        , objID: AW_READY_STEPS
        , inputLabel1: ""
    };

    return {
        retrieveData: function (WORK_WORKID) {

            var workflowDeferred = $q.defer();

            workflowData.inputLabel1 = WORK_WORKID;

            $http.post("/livelink/llisapi.dll", workflowData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data.myRows = [];
                }

                workflowDeferred.resolve(processButtons(data.myRows));
            });

            return workflowDeferred.promise;
        }
    };
}]);

workflowManagerApp.factory("createNewWorkflow", ['$http', '$q', function ($http, $q) {

    var newWFData = {
        func: "ll",
        objAction: "RunReport",
        objID: "20529398", // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT RECODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        nextURL: "/livelink/llisapi.dll?func=Personal.Assignments",
        inputLabel1: "", // WF NAME
        _1_1_13_1: "",
        _1_1_3_1: "", //FK_CLARITY_PROJECT_ID
        _1_1_5_1: "Action",
        _1_1_6_1: "",
        _1_1_7_1: "",
        _1_1_8_1: "",
        _1_1_9_1_ID: "",
        _1_1_9_1_SavedName: "",
        _1_1_9_1_Name: "",
        _1_1_10_1_ID: "",
        _1_1_10_1_SavedName: "",
        _1_1_10_1_Name: "",
        _1_1_11_1_ID: "",
        _1_1_11_1_SavedName: "",
        _1_1_11_1_Name: "",
        _1_1_12_1_ID: "",
        _1_1_12_1_SavedName: "",
        _1_1_12_1_Name: "",
        _1_1_14_1: "", //FK_CLARITY_PROFILE_ID
        _1_1_15_1: "",
        _1_1_16_1: "",
        _1_1_17_1: "",
        _1_1_18_1: "",
        _1_1_19_1: "",
        _1_1_20_1: "",
        _1_1_21_1: "",
        _1_1_22_1: "",
        _1_1_23_1: "",
        _1_1_24_1: "",
    };

    return function (workflowName, FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID) {

        newWFData.inputLabel1 = workflowName;
        newWFData._1_1_3_1 = FK_CLARITY_PROJECT_ID;
        newWFData._1_1_14_1 = FK_CLARITY_PROFILE_ID

        return $http.post("/livelink/llisapi.dll", newWFData);
    }

}]);

workflowManagerApp.factory('findNewWorkflow', ['$http', '$q', function ($http, $q) {

    var findWFData = {
        func: "ll",
        objAction: "RunReport",
        objID: "20811758", // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IMPORTANT FIX THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        inputLabel1: "", // FK_CLARITY_PROJECT_ID
        inputLabel2: "", // FK_CLARITY_PROFILE_ID
    };

    return function (FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID) {

        findWFData.inputLabel1 = FK_CLARITY_PROJECT_ID;
        findWFData.inputLabel2 = FK_CLARITY_PROFILE_ID;

        return $http.post("/livelink/llisapi.dll", findWFData);
    }

}]);

workflowManagerApp.factory("restartWorkflow", ['$http', '$q', "deleteWorkflow", "createNewWorkflow", "findNewWorkflow", function ($http, $q, deleteWorkflow, createNewWorkflow, findNewWorkflow) {

    return function (SubWorkID, workflowName, FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID) {

        var restartDeferred = $q.defer();

        deleteWorkflow.stopWorkflow(SubWorkID, "stop").success(function () {
            deleteWorkflow.deleteWorkflow(SubWorkID, "delete").success(function () {
                createNewWorkflow(workflowName, FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID).success(function () {
                    findNewWorkflow(FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID).success(function (data) {
                        restartDeferred.resolve(data.myRows);
                    });
                });
            });
        });

        return restartDeferred.promise;
    }
}]);

workflowManagerApp.factory("deleteWorkflow", ['$http', '$q', function ($http, $q) {

    var wfStatusData = {
        func: "work.MultimanageStatus"
        , NewStatus: "stop"
        , nextURL: "/livelink/llisapi.dll?func=Personal.Assignments"
        , SelectedWF: ""
        , SubWorkID: ""
    };

    return {
        stopWorkflow: stopWorkflow,
        deleteWorkflow: deleteWorkflow,
        fullDeleteWorkflow: function (SubWorkID) {

            var fullDeleteDeferred = $q.defer();

            stopWorkflow(SubWorkID, "stop").then(function () {
                deleteWorkflow(SubWorkID, "delete").then(function () {
                    fullDeleteDeferred.resolve();
                })
            });

            return fullDeleteDeferred.promise;
        }
    }

    function stopWorkflow(SubWorkID, NewStatus) {

        wfStatusData.NewStatus = "stop";
        wfStatusData.SelectedWF = SubWorkID;
        wfStatusData.SubWorkID = SubWorkID;

        return $http.post("/livelink/llisapi.dll", wfStatusData);
    }

    function deleteWorkflow(SubWorkID, NewStatus) {

        wfStatusData.NewStatus = "delete";
        wfStatusData.SelectedWF = SubWorkID;
        wfStatusData.SubWorkID = SubWorkID;

        return $http.post("/livelink/llisapi.dll", wfStatusData);
    }

}])

workflowManagerApp.factory('retrieveAuditServer', ['$http', '$q', 'AW_AUDIT_LOG_WORKFLOW', function ($http, $q, AW_AUDIT_LOG_WORKFLOW) {

    var auditData = {
        func: "ll"
        , objAction: "RunReport"
        , objID: AW_AUDIT_LOG_WORKFLOW
        , inputLabel1: ""
        , inputLabel2: ""
        , inputLabel3: ""
    };

    return {
        retrieveData: function (WORK_WORKID) {

            var auditDeferred = $q.defer();
            auditData.inputLabel1 = WORK_WORKID;

            $http.post("/livelink/llisapi.dll", auditData).success(function (data) {

                if (!data.hasOwnProperty("myRows")) {
                    data.myRows = [];
                }

                auditDeferred.resolve(data.myRows);
            });

            return auditDeferred.promise;
        }
    };
}]);

workflowManagerApp.factory('insertAuditServer', ['$http', '$q', 'AW_I_RS_WF_AUDIT_LOG', 'CURRENT_USER', function ($http, $q, AW_I_RS_WF_AUDIT_LOG, CURRENT_USER) {

    var auditData = {
        func: "ll"
        , objAction: "RunReport"
        , objID: AW_I_RS_WF_AUDIT_LOG
        , inputLabel1: ""
        , inputLabel2: ""
        , inputLabel3: ""
        , inputLabel4: CURRENT_USER
        , inputLabel5: ""
        , inputLabel6: ""
        , inputLabel7: ""
    };

    return {
        insertData: function (VOULUMEID, STEPNAME, BUTTONNAME) {

            var insertDeferred = $q.defer();

            auditData.inputLabel2 = VOULUMEID;
            auditData.inputLabel3 = STEPNAME.substr(4);
            auditData.inputLabel5 = BUTTONNAME;

            $http.post("/livelink/llisapi.dll", auditData).success(function (data) {
                insertDeferred.resolve();
            });

            return insertDeferred.promise;
        }
    };

}]);

workflowManagerApp.factory('updateRS_ACTION_WF_EVAL_Server', ['$http', '$q', 'AW_U_RS_ACTION_WF_EVAL', function ($http, $q, AW_U_RS_ACTION_WF_EVAL) {

    var updateData = {
        func: "ll"
        , objAction: "RunReport"
        , objID: AW_U_RS_ACTION_WF_EVAL
        , VOLUMEID: ""
        , EVAL_NEXT_STEP: ""
        , EVAL_PA_KICKBACK_TO_PO: ""
        , EVAL_DIVISION_REVIEW: ""
        , EVAL_LEGAL_REVIEW: ""
        , EVAL_POLICY_REVIEW: ""
    };

    return {
        updateData: function (VOLUMEID, EVALUATIONS) {

            var updateDeferred = $q.defer();

            updateData.VOLUMEID = VOLUMEID;
            updateData.EVAL_NEXT_STEP = EVALUATIONS.EVAL_NEXT_STEP;
            updateData.EVAL_PA_KICKBACK_TO_PO = EVALUATIONS.EVAL_PA_KICKBACK_TO_PO;
            updateData.EVAL_DIVISION_REVIEW = EVALUATIONS.EVAL_DIVISION_REVIEW;
            updateData.EVAL_LEGAL_REVIEW = EVALUATIONS.EVAL_LEGAL_REVIEW;
            updateData.EVAL_POLICY_REVIEW = EVALUATIONS.EVAL_POLICY_REVIEW;

            $http.post("/livelink/llisapi.dll", updateData).success(function (data) {
                updateDeferred.resolve();
            });

            return updateDeferred.promise;
        }
    };
}]);

workflowManagerApp.factory('moveWorkflowServer', ['$http', '$q', function ($http, $q) {

    return {
        updateWorkflow: function (VOLUMEID, SUBWORKTASK_TASKID) {

            var updateDeferred = $q.defer(), updateData = {};

            updateData.func = "work.taskdone";
            updateData.workid = VOLUMEID;
            updateData.subworkid = VOLUMEID;
            updateData.taskid = SUBWORKTASK_TASKID;
            updateData.xAction = "SendOn";
            updateData.Disposition = "999999";
            updateData.NextURL = "/livelink/llisapi.dll?func=Personal.Assignments";
            updateData.authenticateValue = 0;

            $http.post("/livelink/llisapi.dll", updateData).success(function (data) {
                updateDeferred.resolve();
            });

            return updateDeferred.promise;
        }
    };
}]);

workflowManagerApp.controller('workflowController', ['$q', '$scope', 'retrieveStepServer', 'retrieveAuditServer', 'updateRS_ACTION_WF_EVAL_Server', 'moveWorkflowServer', 'insertAuditServer', "restartWorkflow", "deleteWorkflow", "retrieveRandomWF", "createNewWorkflow", "findNewWorkflow", function ($q, $scope, retrieveStepServer, retrieveAuditServer, updateRS_ACTION_WF_EVAL_Server, moveWorkflowServer, insertAuditServer, restartWorkflow, deleteWorkflow, retrieveRandomWF, createNewWorkflow, findNewWorkflow) {

    var globalStep, globalButton;

    $scope.submissionActive = false;
    $scope.emptyWorkflowResults = false;
    $scope.reviewSteps = false;
    $scope.displaySteps = true;
    $scope.displayRestartWF = false;
    $scope.currentWorkflow = "";

    $scope.$watch("currentWorkflow", function (newValue, oldValue) {

        if (newValue == "") {
            $scope.currentSteps = [];
            $scope.auditRecords = [];
            $scope.workflowID = "";
            $scope.displayRestartWF = false;
            $scope.submissionActive = false;
        }
        else {
            $scope.workflowID = newValue;
        }

    });

    $scope.startRandom = function (actionType) {

        retrieveRandomWF.retrieveData(actionType).then(function (data) {

            var workflowName = 'AFOSR Award Action Workflow - ', FK_CLARITY_PROJECT_ID = data[0].FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID = data[0].FK_CLARITY_PROFILE_ID;

            $scope.submissionActive = true;

            if (actionType == 'basic') {
                workflowName = workflowName + data[0].PROPOSAL_NUMBER + ' - Basic (DEF)';
            }

            if (actionType == 'incremental') {
                workflowName = workflowName + data[0].PROPOSAL_NUMBER + ' - Incremental';
            }

            if (actionType == 'option') {
                workflowName = workflowName + data[0].PROPOSAL_NUMBER + ' - Option';
            }

            if (actionType == 'admin') {
                workflowName = workflowName + data[0].PROPOSAL_NUMBER + ' - Administrative';
            }

            if (actionType == 'additional') {
                workflowName = workflowName + data[0].PROPOSAL_NUMBER + ' - Additional Funding';
            }

            createNewWorkflow(workflowName, FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID).then(function () {

                findNewWorkflow(FK_CLARITY_PROJECT_ID, FK_CLARITY_PROFILE_ID).then(function (data) {

                    $scope.currentWorkflow = data.data.myRows[0].VOLUMEID;
                    $scope.workflowID = $scope.currentWorkflow;
                    $scope.retrieveWorkflow();
                });
            });
        });
    };

    $scope.retrieveWorkflow = function () {

        var retrieveDeferred = $q.defer(), stepRetrieve, auditRetrieve, stepCount = 0, buttonCount = 0;

        $scope.currentWorkflow = $scope.workflowID;

        retrieveAuditServer.retrieveData($scope.currentWorkflow).then(function (data) {

            $scope.auditRecords = data;
            $scope.emptyAuditResults = displayNoDataMessage($scope.auditRecords);

            retrieveStepServer.retrieveData($scope.currentWorkflow).then(function (data) {

                $scope.currentSteps = data;
                $scope.emptyWorkflowResults = displayNoDataMessage($scope.currentSteps);

                if (!$scope.emptyWorkflowResults) {
                    $scope.displayRestartWF = true;

                    if (!$scope.step5Complete($scope.auditRecords)) {
                        for (; stepCount < $scope.currentSteps.length; stepCount++) {
                            if ($scope.currentSteps[stepCount].SUBWORKTASK_TITLE.substr(0, 2) == "07" || $scope.currentSteps[stepCount].SUBWORKTASK_TITLE.substr(0, 2) == "08" || $scope.currentSteps[stepCount].SUBWORKTASK_TITLE.substr(0, 2) == "09") {

                                for (; buttonCount < $scope.currentSteps[stepCount].buttons.length; buttonCount++) {

                                    if ($scope.currentSteps[stepCount].buttons[buttonCount].buttonName == "Cancel PR") {
                                        $scope.currentSteps[stepCount].buttons[buttonCount].showButton = false;
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    $scope.displayRestartWF = false;
                }

                $scope.toggleReviewSteps();
            });
        });
    }


    $scope.step5Complete = function (auditRecords) {

        var step5Complete = false, auditCount = 0;

        for (; auditCount < auditRecords.length; auditCount++) {
            if (auditRecords[auditCount].STEP_NAME == "PA Uploads Certified Funding Documents") {
                step5Complete = true;
            }
        }

        return step5Complete;
    };

    $scope.restartWorkflow = function () {
        // ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        $scope.submissionActive = true;

        restartWorkflow($scope.currentWorkflow, $scope.currentSteps[0].SUBWORK_TITLE, $scope.currentSteps[0].FK_CLARITY_PROJECT_ID, $scope.currentSteps[0].FK_CLARITY_PROFILE_ID).then(function (data) {

            $scope.currentWorkflow = data[0].VOLUMEID;
            $scope.workflowID = $scope.currentWorkflow;
            $scope.retrieveWorkflow();
        });
    }

    $scope.deleteWorkflow = function () {

        $scope.submissionActive = true;

        deleteWorkflow.fullDeleteWorkflow($scope.currentWorkflow).then(function () {
            $scope.currentWorkflow = "";
        });
    }

    $scope.submitStep = function (step, button) {
        $scope.submissionActive = true;

        if (determineReviewButton(button)) {
            globalStep = step;
            globalButton = button;
            return;
        }

        reviewStepPrepare(step, button);

        determineEVAL_NEXT_STEP_PA_PO(step, button);
        determineEVAL_NEXT_STEP_IOA(step, button);

        $scope.SendOn(step, button);
    };

    $scope.SendOn = function (step, button) {

        updateRS_ACTION_WF_EVAL_Server.updateData(step.SUBWORK_SUBWORKID, button.EVALUATIONS).then(function () {
            //SEND WORKFLOW ON
            moveWorkflowServer.updateWorkflow(step.SUBWORK_SUBWORKID, step.SUBWORKTASK_TASKID).then(function () {
                //INSERT AUDIT TABLE
                insertAuditServer.insertData(step.RS_ACTION_WF_ID, step.SUBWORKTASK_TITLE, button.buttonName);
                //NOW REFESH
                $scope.retrieveWorkflow();
            });
        });
    };

    $scope.sendReview = function () {

        if ($scope.Division) {
            globalButton.EVALUATIONS.EVAL_DIVISION_REVIEW = "Yes";
        }

        if ($scope.Policy) {
            globalButton.EVALUATIONS.EVAL_POLICY_REVIEW = "Yes";
        }

        if ($scope.Legal) {
            globalButton.EVALUATIONS.EVAL_LEGAL_REVIEW = "Yes";
        }

        $scope.SendOn(globalStep, globalButton)
    }

    $scope.toggleReviewSteps = function () {
        $scope.submissionActive = false;
        $scope.reviewSteps = false;
        $scope.displaySteps = true;
    };

    function determineReviewButton(button) {

        if (button.buttonName == "Send for Review") {
            $scope.reviewSteps = true;
            $scope.displaySteps = false;
            return true;
        }
        else {
            return false;
        }
    }

    function reviewStepPrepare(step, button) {

        if (step.SUBWORKTASK_TITLE == "10. PK Division Review") {
            button.EVALUATIONS.EVAL_DIVISION_REVIEW = "";

            if (step.EVAL_NEXT_STEP.split("-").length > 1) {
                button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP.split("-")[1].substr(1);
            }
            else {
                button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP;
            }
        }

        if (step.SUBWORKTASK_TITLE == "11. PK Policy Review") {
            button.EVALUATIONS.EVAL_POLICY_REVIEW = "";

            if (step.EVAL_NEXT_STEP.split("-").length > 1) {
                button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP.split("-")[1].substr(1);
            }
            else {
                button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP;
            }
        }

        if (step.SUBWORKTASK_TITLE == "12. JA Legal Review") {
            button.EVALUATIONS.EVAL_LEGAL_REVIEW = "";

            if (step.EVAL_NEXT_STEP.split("-").length > 1) {
                button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP.split("-")[1].substr(1);
            }
            else {
                button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP;
            }
        }

    }

    function determineEVAL_NEXT_STEP_PA_PO(step, button) {

        if (step.SUBWORKTASK_TITLE === '13. PO Reworks Package for PK' || step.SUBWORKTASK_TITLE === '14. PA Reworks PR for PK' || step.SUBWORKTASK_TITLE === '21. PO Reworks Package for AOARD RPF') {
            button.EVALUATIONS.EVAL_NEXT_STEP = step.EVAL_NEXT_STEP.split("-")[1].substr(1);
        }
    }

    function determineEVAL_NEXT_STEP_IOA(step, button) {

        if (step.SUBWORKTASK_TITLE == 'IH - 01. Copy Clarity Data & Create Attachment Folders') {

            if (step.OFFICE === "IOA") {
                button.EVALUATIONS.EVAL_NEXT_STEP = "AOARD";
            }
        }
    }

    function displayNoDataMessage(stepData) {

        if (stepData.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
}]);

workflowManagerApp.directive('openWorkflow', ['$window', function ($window) {

    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                $window.open("llisapi.dll?func=work.StatusHeader&WorkID=" + $scope.currentWorkflow + "&SubWorkID=" + $scope.currentWorkflow, "resizable=1,scrollbars=1,menubar=1,toolbar=1,location=1,titlebar=1", false);
            });
        }
    };
}]);

workflowManagerApp.directive('openStep', ['$window', function ($window) {

    return {
        restrict: "A",
        link: function ($scope, element, attrs) {
            element.bind('click', function () {
                $window.open("llisapi.dll?func=work.EditTask&WorkID=" + $scope.currentWorkflow + "&SubWorkID=" + $scope.currentWorkflow + "&TaskID=" + attrs.taskid + "&paneindex=0&NextURL=");
            });
        }
    };
}]);
