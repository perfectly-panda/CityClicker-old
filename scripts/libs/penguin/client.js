define(["jquery"], function ($) {
    self = this;
    var client = {};

    //private
    DOM = {};
    gameStart = true;
    started = false;
    gameInterface = null;

    client.start = function (connection) {
        if (!started) {
            gameInterface = connection;
            gameInterface.setCallback(interfaceHandler);
            createLayout();
            started = true;
            //return started;
        }

        $("#start")
            .hide()
            .click(function () {
                var data = {
                    event: "play",
                    args: {}
                }

                sendEvent(data);
            });
        $("#pause")
            .show()
            .click(function () {
                var data = {
                    event: "pause",
                    args: {}
                }

                sendEvent(data);
            });

        $("#loading").hide();

        

        return started;
    };

    interfaceHandler = function (args) {
        if (typeof args === 'undefined' || args === null) {
            throw new CustomError("no arguments sent");
        }
        if (typeof args !== 'object') {
            console.log(args);
            throw new CustomError("argument wrong type: expected array");
        }
        if (typeof args[0] !== 'string') {
            throw new CustomError("argument[0] wrong type: expected string");
        }
        if (typeof args[1] !== 'object') {
            throw new CustomError("argument[1] wrong type: expected object");
        }
        
        switch (args[0]) {
            case "addElement":
                addRequiredElement(args[1].element);
                break;
            case "addModel":
                addModel(args[1].element);
                break;
            case "updateModel":
                updateModel(args[1].element);
                break;
            case "loopStatus":
                if (args[1].status == "started")
                {
                    $("#start").hide();
                    $("#pause").show();
                }
                else if (args[1].status == "stopped")
                {
                    $("#start").show();
                    $("#pause").hide();
                }
                break;
            default:
                break;
        };
    };

    getRequiredElements = function () {
        return gameInterface.getRequiredElements();
    }

    addRequiredElement = function (args) {
        if (typeof args === 'undefined' || args === null) {
            throw new CustomError("no arguments sent");
        }
        if (typeof args !== 'string') {
            throw new CustomError("argument wrong type: expected string");
        }
        createChildren();
    };

    addModel = function (args) {
        var newModel = "<div id='" + args.name + "'><span class='name'>" + args.displayName + ": </span><span class='count'>" + args.currentCount + "</span></div>";
        $("#" + args.section).append(newModel);

        if (args.buy) {
            $("#" + args.name).append("<span class='buy'> Buy </span>")
        }
    };

    updateModel = function (args) {
        $("#" + args.name + " > .count").text(args.currentCount);
    };

    createChildren = function () {
        getRequiredElements().forEach(function (element, index, array) {
            if (typeof DOM[element] == "undefined") {
                $("#layout").append("<div id='" + element + "'><h2>"+element+"</h2></div>");
                DOM[element] = {};
                DOM[element].html = $('#' + element);
                DOM[element].index = index;
            }
        });
    };

    createLayout = function () {
        if ($("#layout").length > 0) {
            createChildren();
        }
        else {
            throw new CustomError("missing #layout");
        }
    };

    sendEvent = function (args) {
        gameInterface.sendAction(args);
    };

    return client;
});