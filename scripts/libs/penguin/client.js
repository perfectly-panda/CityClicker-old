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

    return client;
});