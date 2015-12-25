define(["jquery", "penguin/interface"], function ($, game) {
    self = this;
    var client = {};

    //private
    DOM = {};
    gameStart = true;
    started = false;

    client.start = function () {
        if (!started) {
            game.setCallback(interfaceHandler);
            self.createLayout();
            self.started = true;
            return self.started;
        }
        
        return self.started;
    };

    interfaceHandler = function (args) {
        if (typeof args === 'undefined' || args === null) {
            throw new CustomError("no arguments sent");
        }
        if (typeof args !== 'array') {
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
                self.addRequiredElement(args[1]);
                break;
            default:
                break;
        };
    };

    getRequiredElements = function () {
        return game.getRequiredElements();
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

    hideElement = function () {

    };

    createChildren = function () {
        console.log(self.getRequiredElements());
        self.getRequiredElements().forEach(function (element, index, array) {
            if (typeof self.DOM[element] == "undefined") {
                $("#layout").append("<div id='" + element + "'><h2>"+element+"</h2></div>");
                self.DOM[element] = {};
                self.DOM[element].html = $('#' + element);
                self.DOM[element].index = index;
            }
        });
    };

    createLayout = function () {
        if ($("#layout").length > 0) {
            self.createChildren();
        }
        else {
            throw new CustomError("missing #layout");
        }
    };

    return client;
});