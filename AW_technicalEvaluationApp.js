//NOTE: INSERT IS HANDLED INSIDE WEBREPORT "AW_TECH_EVAL_01_V3 - BAA Responses".  There is a weReport that wraps an insert statement and is called as a sub-webReport.

define(['jquery', generalVariablesApp, variablesObjectInitiate, coreAppURL, validationAppURL], function () {

    var currentsaveInterval = { link: 0 }, retrieveTechnicalEvaluation, appendTechnicalEvaluation, setUpControls, setUpValidation, setUpTitle, setUpConferenceSupport, setUpTechnicalEvaluation, setUpBAAInformationNote, setUpUniqueQuestion, setUpAuotmaticSave, setUpResponseDialog;
    var insertQuestion, updateQuestion, saveQuestion, processSaveWrapper, processSave, fullSavePrepare, fullSave, saveEverything, updateClarityIdea, validateInsert, validateTechnicalEvaluation, retrieveTechnicalEvaluationReview;
    var IDEA_EVALUATION, BAA, PROPOSAL_NUMBER, TITLE, PROJECT_TYPE, IDEA_ID, ACT_WF_ID_FK, TITLE, PROJECT_TYPE, PROPOSAL_CODE, FY;
    var killProcesses, initialize;
    var coreVariables = require(generalVariablesApp), stepValidator = require(validationAppURL), nodeIDs = require(variablesObjectInitiate);
    var $setInterval = window.setInterval;
    var setUpTextAreas;

    if (typeof (coreVariables.ideaClarity) === "object") {
        //OUTSIDE WORKFLOW
        IDEA_EVALUATION = true;

        BAA = coreVariables.ideaClarity.BAA;
        ACT_WF_ID_FK = window.IDEA_ID
        IDEA_ID = window.IDEA_ID;
        PROPOSAL_NUMBER = coreVariables.ideaClarity.AFOSR_PROP_ID;
        TITLE = coreVariables.ideaClarity.INV_NAME;
        PROJECT_TYPE = coreVariables.ideaClarity.PROJ_TYPE;
        PROPOSAL_CODE = coreVariables.ideaClarity.INV_CODE;
        FY = coreVariables.ideaClarity.AFOSR_PROP_FY;
    }
    else {
        //WORKFLOW
        IDEA_EVALUATION = false;

        BAA = coreVariables.ActionWFVars.BAA;
        ACT_WF_ID_FK = coreVariables.ActionWFVars.RS_ACTION_WF_ID;

        if (coreVariables.GenSelectVars.IDEA_ID == -1) {
            IDEA_ID = coreVariables.ActionWFVars.RS_ACTION_WF_ID;
        }
        else {
            IDEA_ID = coreVariables.GenSelectVars.IDEA_ID;
        }

        PROPOSAL_NUMBER = coreVariables.GenSelectVars.AWARD_PROPOSAL_NBR;
        TITLE = coreVariables.GenSelectVars.AWARD_TITLE;
        PROJECT_TYPE = coreVariables.GenSelectVars.PROJECT_TYPE;
        PROPOSAL_CODE = "";  //NOT USED IN WF
        FY = coreVariables.GenSelectVars.PROPOSAL_RECEIVED_FY;
    }

    initialize = function () {

        retrieveTechnicalEvaluation(BAA, ACT_WF_ID_FK, IDEA_ID).then(function (data) {
            appendTechnicalEvaluation(data).then(setUpTechnicalEvaluation)
        });
    };

    retrieveTechnicalEvaluation = function (BAA, ACT_WF_ID_FK, IDEA_ID) {

        var dfd = new jQuery.Deferred(), data;

        //AW_TECH_EVAL_02_V3 - will be called 3 times: for PRIMARY, OTHER, & CSP.
        data = {
            "func": "ll"
            , "objAction": "RunReport"
            , "objID": coreVariables.AW_TECH_EVAL_00_V3 //21032301 //AW_TECH_EVAL_01_V3 21085653
            , "inputLabel1": BAA
            , "inputLabel2": ACT_WF_ID_FK
            , "inputLabel3": ""
            , "inputLabel4": IDEA_ID
            , "inputLabel5": PROPOSAL_NUMBER
        };

        $.ajax({
            url: "/livelink/llisapi.dll"
            , data: data
            , type: "POST"
            , success: function (data) {
                dfd.resolve(data);
            }
            , error: function () {
                alert("PK Buyer failed to load");
                dfd.reject("DE NADA YOU CHUMP");
            }
        });

        return dfd.promise();
    };

    appendTechnicalEvaluation = function (data) {

        var dfd = new jQuery.Deferred();

        $("#teEvaluationHolder .loading").replaceWith(data);

        return dfd.resolve().promise();
    };

    setUpTechnicalEvaluation = function () {

        setUpTitle();
        setUpControls();
        setUpConferenceSupport();
        setUpUniqueQuestion();
        setUpBAAInformationNote();
        setUpAuotmaticSave();

        //setUpTextAreas();

        setUpValidation();
        setUpResponseDialog();

        $("#technicalEvaluationHolder").show();

        stepValidator.add(
            {
                "tabName": "Technical Evaluation"
                , "validationMethod": validateTechnicalEvaluation
            }
        );

        coreVariables.beforeSubmit.add(function () {
            return $.when(saveEverything(), updateClarityIdea(), generatePDFs());
        });
    };

    setUpControls = function () {

        $(".te.expandContract.ecContainer").expandContract({ active: "first" });
        $("#saveTechnicalEvaluation").button();  //setUpAuotmaticSave for click event
        $("#saveTechnicalEvaluation").on("click", currentsaveInterval, function (event) {

            var saveData;

            killProcesses();

            $(".saveTabButton, .awButton").button({ disabled: true });
            $("#technicalEvaluationRetrieveIndicator").text("...Retrieving");

            saveEverything().then(function () {
                retrieveTechnicalEvaluationReview().then(function () {
                    $("#responsesDialog").dialog("open");
                    $("#technicalEvaluationRetrieveIndicator").text("");
                }).then(function () {
                    updateClarityIdea();
                    generatePDFs();
                });
            });
        });
    };

    setUpTitle = function () {

        $("#baaNumber").text(BAA);

        if (BAA == "STTR") {
            $("#sttrEvaluations").show();
        }
    };

    setUpUniqueQuestion = function () {

        //If the PM fills out unique as the primary purpose then it must be explained
        $(".baaUnique[name='UNIQUE0']:radio")
        .on(
            'click'
            , function () {
                if (this.value == "3") {
                    $("#unique").slideDown("600");
                    $("#unique3Text").addClass("required");
                }
                else {
                    $("#unique").slideUp("600");
                    $("#unique3Text").removeClass("required invalid teNormalText awFieldComplete awFieldIncomplete");
                }
                $("#techEvalForm").rsValidator("completed");
            }
        );

        // Show the unique other text if that's what's checked
        if (parseInt($(".baaUnique[name='UNIQUE0']:checked").val()) == 3) {
            $("#unique3Text").addClass("required");
            $("#unique").slideDown();
        }
        else {
            $("#unique3Text").removeClass("required invalid teNormalText awFieldComplete awFieldIncomplete");
        }
    };

    setUpValidation = function () {

        // Turn on our validation for the form
        $("#techEvalForm").rsValidator();

        $(".teTextArea,#unique3Text").each(function () {
            //$(this).rules("add",
            //    { noGhostText: "teGhostText" }
            //)
        });

        // and now that the rules are set up, set the current completed status
        $("#techEvalForm").rsValidator("completed");
    };

    setUpBAAInformationNote = function () {

        if (BAA == "STTR") {
            //$("#launchBAANote").hide();
        }
        else {

            $("#baaNote").dialog({
                autoOpen: false,
                modal: true,
                resizable: false,
                closeText: "hide", //To do: what does this do? not what I had hoped
                buttons: { "Ok": function () { $(this).dialog("close"); } },
                close: function (event, ui) { },
                create: fixDialogUI
            });

            $("#launchBAANote").bind("click", function () { $("#baaNote").dialog("open"); });
        }
    }

    setUpConferenceSupport = function () {

        if ($("#conferenceSupportCriteria").length > 0 && PROJECT_TYPE == "Conference") {
            $("#conferenceSupportCriteria").show();
        }
    };

    setUpResponseDialog = function () {

        $("#responsesDialog").dialog({
            autoOpen: false,
            modal: true,
            resizable: true,
            title: "Technical evaluation responses currently in Livelink",
            maxWidth: 1500,
            minWidth: 1300,
            closeText: "hide", //To do: what does this do? not what I had hoped
            buttons: { "Ok": function () { $(this).dialog("close"); } },
            close: function (event, ui) {
                $("#responseHolder").children().remove();
                $("#techEvalForm textArea:not([tabIndex=-1])").removeAttr("disabled");
                $(".saveTabButton, .awButton").button({ disabled: false });
            },
            create: fixDialogUI
        });
    };

    retrieveTechnicalEvaluationReview = function () {

        var dfd = new jQuery.Deferred(), data;

        //AW_TECH_EVAL_02_V3 - will be called 3 times inside webReport: for PRIMARY, OTHER, & CSP.
        data = {
            "func": "ll"
            , "objAction": "RunReport"
            , "objID": coreVariables.AW_REVIEW_TECHINCAL_EVALUATION  //AW_REVIEW_TECHINCAL_EVALUATION 
            , "inputLabel1": ACT_WF_ID_FK
            , "inputLabel2": BAA
            , "inputLabel3": PROJECT_TYPE
        };

        $.ajax({
            url: "/livelink/llisapi.dll"
            , data: data
            , type: "POST"
            , success: function (data) {
                $("#responseHolder").append(data);
                dfd.resolve(data);
            }
            , error: function () {
                alert("PK Buyer failed to load");
                dfd.reject("DE NADA YOU CHUMP");
            }
        });

        return dfd.promise();
    };

    saveEverything = function () {
        saveData = fullSavePrepare();
        return fullSave(saveData);
    };

    fullSavePrepare = function () {

        var saveHolder, questionArrayUnique = [];

        saveHolder = { AW_I_RS_BAA_RESPONSES_TECH_EVAL_V2: [], AW_U_RS_BAA_RESPONSES_TECH_EVAL: [] };

        //DISABLE EVERYTHING - SAFEGUARD SO SETINTERVAL EVENT DOES NOT HAPPEN DURING LARGER SAVE
        $("#techEvalForm textArea:not([tabIndex=-1])").attr("disabled", "disabled");
        $("#techEvalForm textArea:not([tabIndex=-1]):not([activeInput=activeInput]):not(#unique3Text)").each(function () {

            var questionArray = [];

            questionArray.push($(this).attr("RESPONSE_ID").toString());
            saveHolder.AW_U_RS_BAA_RESPONSES_TECH_EVAL.push(questionArray);
        });

        questionArrayUnique.push($("#baaUnique").attr("RESPONSE_ID").toString());

        if ($("[name=UNIQUE0]:checked").val() < 3) {
            questionArrayUnique.push($("[name=UNIQUE0]:checked").val().toString())
        }
        else {
            questionArrayUnique.push($("#unique3Text").val());
        }

        saveHolder.AW_U_RS_BAA_RESPONSES_TECH_EVAL.push(questionArrayUnique)

        return saveHolder;
    };

    fullSave = function (saveData) {

        var dfd, sendData;

        dfd = new jQuery.Deferred();

        sendData = {
            "func": "cwewfeventscript.ExecuteLRs",
            "jsondata": JSON.stringify(saveData)
        };

        $.ajax({
            url: "/livelink/llisapi.dll"
            , data: sendData
            , type: "POST"
            , datatype: 'json'
            , jsonp: null
            , jsonpCallback: null
            , success: function (data) {
                dfd.resolve(data);
            }
            , error: function () {
                alert("Technical Evaluation failed to save");
                dfd.reject("DE NADA YOU CHUMP");
            }
        });

        return dfd;
    };

    setUpAuotmaticSave = function () {

        var deriveDataQuestion, intervalSave;

        deriveDataQuestion = function (textarea) {

            var dataQuestion = {
                TRANSACTION_TYPE: $(textarea).attr("TRANSACTION_TYPE"),
                RESPONSE_ID: $(textarea).attr("RESPONSE_ID"),
                FK_OPPORTUNITY_ID: $(textarea).attr("FK_OPPORTUNITY_ID"),
                QUESTION_NBR: $(textarea).attr("QUESTION_NBR"),
                CRITERIA: $(textarea).attr("CRITERIA"),
                IDEA_ID: IDEA_ID,
                PROPOSAL_NUMBER: PROPOSAL_NUMBER,
                RESPONSE: $(textarea).val()
            };

            return dataQuestion;
        };

        $(document).ready(function () {

            $('body').on("focusin", function (event) {

                var currentTextarea, currentInterval, intervalHandler, dataQuestion = {}, RESPONSE_ID;

                if (event.target.nodeName === "TEXTAREA" && $(event.target).hasClass("technicalEvaluationQuestion")) {

                    killProcesses();

                    currentTextarea = event.target;

                    intervalHandler = intervalSave(currentTextarea);
                    currentInterval = $setInterval(intervalHandler.save, 6000);

                    $(currentTextarea).attr("INTERVAL", currentInterval);
                }
                else {
                    killProcesses();
                }
            });
        });

    intervalSave = function (textArea) {

        var currentTextarea = textArea;

        return {
            save: function () {

                var dataQuestion = {};

                dataQuestion = deriveDataQuestion(currentTextarea);

                processSaveWrapper(dataQuestion);
            }
            };
        };
    };

    killProcesses = function () {

        $("#technicalEvaluationEventBinder textarea").each(function () {
            $(this).attr("INSERT_PROCESSING", "");
            //ALSO KILL INTERVALS
            if ($(this).attr("INTERVAL") > 0) {
                clearInterval($(this).attr("INTERVAL"));
                $(this).attr("INTERVAL", "");
            }
        });
    };

    processSaveWrapper = function (dataQuestion) {

        var dfd = new jQuery.Deferred();

        $(".saveIndicator[RESPONSE_ID =" + dataQuestion.RESPONSE_ID + "]").show();

        processSave(dataQuestion).then(function () {

            $(".saveIndicator[RESPONSE_ID =" + dataQuestion.RESPONSE_ID + "]").hide();
            dfd.resolve(dataQuestion);
        });

        return dfd.promise();
    };

    processSave = function (dataQuestion) {

        var saveData;

        saveData = {
            "func": "ll"
            , "objAction": "RunReport"
            , "objID": coreVariables.teUpdateID
            , "inputLabel1": dataQuestion.RESPONSE_ID
            , "inputLabel2": dataQuestion.RESPONSE.replace(/^Please enter response here\./, "")
        };

        return saveQuestion(saveData);
    };

    saveQuestion = function (saveData) {

        var dfd = new jQuery.Deferred();

        $.ajax({
            url: "/livelink/llisapi.dll"
            , data: saveData
            , type: "POST"
            , success: function (data) {
                dfd.resolve(data);
            }
            , error: function () {

                killProcesses();
                $(".saveIndicator").hide();

                alert("There was an internet connection problem while saving.  Please try refreshing the page.");
                dfd.reject("DE NADA YOU CHUMP");
            }
        });

        return dfd.promise();
    };

    validateTechnicalEvaluation = function () {

        var valid, section;
        section = $("#techEvalForm");

        if (ENVIRONMENT == "BUILD") {
            $("#techEvalForm").rsValidator('missingNames');
        }

        return $("#techEvalForm").rsValidator("validated");
    };

    updateClarityIdea = function (complete) {

        var dfd, xogUpdate, xogUpdateJSON, xogVal;

        dfd = new jQuery.Deferred();

        //IDEA_EVALUATION
        if (!IDEA_EVALUATION) {
            dfd.resolve();
        }

        // Should only XOG techEval completeness state if we're completing it for a proposal/idea....right? well, true for now ;-)
        if (coreVariables.GenSelectVars == null) {

            if (complete == undefined) {
                complete = $("#techEvalForm").rsValidator("completed");
            }

            xogUpdateJSON = {
                idea: [{
                    code: PROPOSAL_CODE
                    , X_PROJNAME_X: TITLE
                    , afosr_techeval_valid: complete
                }]
            };

            xogUpdate = JSON.stringify(xogUpdateJSON);

            data = {
                "func": "cwewfeventscript.xogwrite",
                "jsondata": xogUpdate
            };

            $.ajax({
                url: "/livelink/llisapi.dll"
                , type: "POST"
                , data: data
                , jsonp: null
                , jsonpCallback: null
                , success: function (results) {
                    //console.log("Finished teCompleteSave ... ");
                    for (n in results) {
                        //console.log("" + n + ": " + results[n]);
                    }
                    dfd.resolve();
                }
                , fail: function (results) {
                    //console.log("FAILED teCompleteSave ... ");
                    for (n in results) {
                        //console.log("" + n + ": " + results[n]);
                    }
                    dfd.resolve();
                }
            });
        }
        else {
            dfd.resolve();
        }

        return dfd.promise();
    };

    generatePDFs = function () {

        var genTEPDFRequest;

        var pdfResult = new jQuery.Deferred();

        if (IDEA_EVALUATION && $("#techEvalForm").rsValidator("completed")) {
            // make a PDF
            genTEPDFRequest = {
                "func": "cwewfeventscript.JRPDFFromLRToNickFolder"
                , "FolderNick": "AFOSR_AMS_ProposalArchive "
                , "Path": "" + FY + ":" + PROPOSAL_NUMBER + ":02. Cost & Technical Evaluation"
                , "lrnick": "SelectIDEATechEvaluationsforTechEvalJ"
                , "templatenick": "AW_TECH_EVALUATION_JASPER"
                , "PDFOutputName": "Tech Evaluation.pdf"
                , "inputLabel1": BAA
                , "inputLabel2": IDEA_ID
            };

            pdfResult = $.ajax({
                url: "/livelink/llisapi.dll"
                , data: genTEPDFRequest
                , type: "POST"
            })
            .done(function (result) {
                for (n in result) {
                    //console.log("" + n + ": " + result[n]);
                }
            })
            .fail(function (result) {
                for (n in result) {
                    //console.log("" + n + ": " + result[n]);
                }
            });
        }
        else {
            pdfResult.resolve();
        }

        return pdfResult.promise();
    };

    return {
        initialize: initialize,
        internal: {
            retrieveTechnicalEvaluation: retrieveTechnicalEvaluation,
            appendTechnicalEvaluation, appendTechnicalEvaluation,
            setUpTechnicalEvaluation: setUpTechnicalEvaluation,
            setUpControls: setUpControls,
            setUpTitle: setUpTitle,
            setUpUniqueQuestion: setUpUniqueQuestion,
            setUpValidation: setUpValidation,
            setUpBAAInformationNote: setUpBAAInformationNote,
            setUpConferenceSupport : setUpConferenceSupport,
            setUpResponseDialog: setUpResponseDialog,
            retrieveTechnicalEvaluationReview: retrieveTechnicalEvaluationReview,
            saveEverything: saveEverything,
            fullSavePrepare : fullSavePrepare,
            fullSave: fullSave,
            setUpAuotmaticSave: setUpAuotmaticSave,
            intervalSave : intervalSave,
            killProcesses: killProcesses,
            processSaveWrapper: processSaveWrapper,
            processSave: processSave,
            saveQuestion: saveQuestion,
            validateTechnicalEvaluation: validateTechnicalEvaluation,
            updateClarityIdea: updateClarityIdea,
            generatePDFs: generatePDFs
        }
    };
});
