define(["jquery", "jqueryui", "migrate", "autoresize"
 , variablesURLAppURL
], function () {

    flyOut($);
    buttonDropDown($);
    expandContract($);

    function flyOut($) {

        var methods = {
            init: function (options) {

                //I have declare this in the global namespace - AJAX is giving me problems that I can open two flyouts at once
                var settings;

                flyOut = {
                    "closeFlyOut": null
                    , "openFlyOut": null
                    , acceptClickFlyOut: true
                };

                settings = $.extend({
                    "width": "420"
                        , "retrieveMessageParameters": ""
                        , "retrieveMessage": function () {

                            var dfd = new jQuery.Deferred();
                            return dfd.resolve().promise();
                        }
                }, options);

                //Open the flyOut
                flyOut.openFlyOut = function (source) {

                    var outerWidth = parseFloat($(source).outerWidth(true)) - 1;

                    $(source).removeClass("keepBorderTop").addClass("selectedActionSubTitle2");
                    $(source).parent().find(".flyOutMessageTopBorder").css({ "margin-left": outerWidth });
                    $(source).parent().find(".flyOutMessage2").show();
                };

                //Close the flyOut
                flyOut.closeFlyOut = function (source) {
                    $(source).find(".flyOutMessage2").hide();
                    $(source).find(".openFlyOut2").removeClass("selectedActionSubTitle2").addClass("keepBorderTop");
                };

                //Initial setUp
                $(this).addClass("parentFlyOut");
                $(this).find(".flyOutMessage2").width(settings.width);

                // Open flyOut
                $(this).find(".openFlyOut2").on("click", function (eventObject) {

                    if (!flyOut.acceptClickFlyOut) { // Must include this - double click will duplicate contents
                        return;
                    }

                    //Stop everything - only one flyOut at a time - delay because LL server sucks
                    flyOut.acceptClickFlyOut = false;

                    //Already open so exit
                    if ($(eventObject.srcElement).hasClass("selectedActionSubTitle")) {
                        flyOut.acceptClickFlyOut = true;
                        return;
                    }

                    //If something else is open in the group then close it
                    $("[flyOutGroup='titles']").each(function () {

                        if ($(this).find(".flyOutMessage2").is(":not(:hidden)")) {
                            flyOut.closeFlyOut(this);
                        }
                    });

                    {
                        settings.retrieveMessage(settings.retrieveMessageParameters, $(eventObject.target).parent().parent()).done(function (results) {

                            $(eventObject.target).parent().parent().find(".flyOutContent").append(results);
                            $(eventObject.target).parent().parent().find(".ui-icon-closethick").attr("title", "Close");

                        }).fail(function (errorMessage) { alert(errorMessage); }).always(function () {

                            flyOut.openFlyOut(eventObject.target);
                            flyOut.acceptClickFlyOut = true;
                        });
                    } (eventObject)
                });

                // click the X and make the flyOut close
                $(this).find(".close").on("click", function (eventObject) {

                    var holder = $(eventObject.target).parents(".parentFlyOut");

                    if ($(holder).find(".flyOutMessage2").is(":not(:hidden)")) {
                        flyOut.closeFlyOut(holder);
                    }
                });
            }
        };  // End of methods JSON

        // Added from jQuery
        $.fn.flyOut = function (method) {

            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on AFOSR Flyout');
            }
        };
    }

    function buttonDropDown($) {

        var methods = {
            init: function (options, callback) {

                //set up clicking on page closing dropdowns
                if (typeof ($(document).attr("buttonDropDownPageListener")) == "undefined") {
                    $(document).on("click.buttonDropDown", function (event) {

                        if ($(event.target).closest(".dropDownButton").length == 0) {
                            //console.log("Click registered");
                        }

                    });
                    $(document).attr("buttonDropDownPageListener", "onClick");
                }

                var settings = $.extend({
                    menuList: options.menuList
                }, options);

                var menu = $("<ul>");

                for (var menuItem = 0; menuItem < settings.menuList.length; menuItem++) {

                    var item = $("<li>");

                    $(item).text(settings.menuList[menuItem].menuName);
                    $(item).attr("url", settings.menuList[menuItem].menuURL);
                    $(menu).append(item);
                }

                this.each(function () {

                    var button = this, menuHolder;

                    $(button).addClass("dropDownButton");

                    menuHolder = $("<div>");
                    $(menuHolder).addClass("buttonMenu");
                    $(menuHolder).append(menu);

                    $(menuHolder).css({ display: "none", position: "absolute" });
                    $(button).after(menuHolder);

                    $(menuHolder).on("click", function (event) {

                        if (event.target.localName == "li") {

                            var newWindowTarget = $(event.target).attr("url");
                            window.open(newWindowTarget, "", "resizable=1,scrollbars=1,menubar=1,toolbar=1,location=1", false);

                            //Close menu now
                            $(".buttonMenu").hide().css("left", 0).css("top", 0);
                            $(".dropDownButton").removeClass(settings.menuButtonActive);
                        }
                    });
                });

                this.on("click", function (menuHolder) {

                    var button = this;
                    var menuHolder = $(button).next(".buttonMenu");

                    if (menuHolder.is(":hidden")) {

                        //close all existing
                        $(".buttonMenu").hide().css("left", 0).css("top", 0);
                        $(".dropDownButton").removeClass(settings.menuButtonActive);

                        //Take into account right border
                        menuHolder.css("top", function () {
                            //return $(button).offset().top + $(button).height();
                            return $(button).position().top + $(button).height();
                        });

                        menuHolder.css("left", function () {
                            //return $(button).offset().left
                            return $(button).position().left + parseInt($(button).css("margin-left").replace("px", ""));
                        });

                        menuHolder.show();
                        $(button).addClass(settings.menuButtonActive);
                    }
                    else {
                        menuHolder.hide();
                        menuHolder.css("left", 0).css("top", 0); //Necessary to reset things
                        $(button).removeClass(settings.menuButtonActive);
                    }
                });
            }
        };

        // Added from jQuery
        $.fn.buttonDropDown = function (method) {

            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on AFOSR Flyout');
            }
        };

    }

    function expandContract($) {

        var methods = {
            init: function (options, callback) {

                var settings = $.extend({
                    active: false
                    , beforeOpen: function () { var dfd = jQuery.Deferred(); return dfd.resolve().promise(); }
                    , beforeClose: function () { var dfd = jQuery.Deferred(); return dfd.resolve().promise(); }
                    , onlyOneOpen: false
                    , toggleFunc: callback
                }, options);

                this.each(function () {

                    if ((settings.active) || (settings.active == "first")) {
                        $(this).find(".ui-icon").removeClass("ui-icon-plus").addClass("ui-icon-minus");
                        $(this).find(".expandContract.ecContent").slideDown();
                        if (settings.active == "first") {
                            settings.active = false;
                        }
                    }
                    else {
                        $(this).find(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus");
                        $(this).find(".expandContract.ecContent").slideUp();
                    }

                    $(this).find(".expandContract.ecIcon, .expandContract.ecTitle").on("click", function () {

                        var eventInitiator = this;

                        var closed = new Array();
                        var opened = new Array();
                        var expando = $(eventInitiator).parent().parent();

                        if (expando.find(".expandContract.ecContent").is(":hidden")) {

                            settings.beforeOpen(eventInitiator).then(function () {

                                if (settings.onlyOneOpen) {
                                    //close any open expando
                                    expando.parent().find(".expandContract.ecContainer:not(#" + $(expando).attr("id") + ")").each(function () {
                                        $(eventInitiator).expandContract("close");
                                        closed.push($(eventInitiator));
                                    });
                                }

                                expando.expandContract("open");
                                opened.push(expando);

                            });
                        }
                        else {

                            settings.beforeClose(eventInitiator).then(function () {

                                expando.expandContract("close");
                                closed.push($(eventInitiator));
                            });
                        }

                        if (settings.toggleFunc != undefined) {
                            (toggleFunc)(closed, opened);
                        }
                    });

                });

            },
            open: function () {
                $(this).find(".ui-icon").removeClass("ui-icon-plus").addClass("ui-icon-minus");
                $(this).find(".expandContract.ecContent").show();
            },
            close: function () {
                $(this).find(".ui-icon").removeClass("ui-icon-minus").addClass("ui-icon-plus");
                $(this).find(".expandContract.ecContent").hide();
            }
        };

        // Added from jQuery
        $.fn.expandContract = function (method) {

            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on AFOSR Flyout');
            }
        };

    }

})
