define(["penguin/game"], function (game) {

    resourceManager = function (config) {
        var self = this;

        this.models = {};
        this.config = config;
        this.type = null;

        this.runTick = function (args, index, callback) {
            for (var key in self.models) {
                self.models[key].RunTick();
                if (self.models[key].GetProperty("display") && self.models[key].GetProperty("perTick") != 0) {
                    var data = {
                        func: "notify",
                        args: {
                            module: "models",
                            event: "update model",
                            args: {
                                name: self.models[key].GetProperty("name"),
                                displayName: self.models[key].GetProperty("displayName"),
                                currentCount: self.models[key].GetProperty("currentCount"),
                                maxCount: self.models[key].GetProperty("maxCount"),
                                section: self.getName()
                            }
                        }
                    };
                    game.api(data);
                }
            }

            if (typeof index == 'integer') {
                return callback[index + 1](args, index, callback);
            }
        };

        buy= function() {

        };

        sell= function() {

        };

        use = function () {

        };
    }

    resourceManager.prototype = {
        setType: function (model) {
            this.type = model;
        },
        getType: function () {
            return this.type;
        },
        getName: function () {
            return this.config.Name;
        },
        getModels: function () {
            return this.models;
        },

        createModel: function(args) {
            if(typeof this.models[args.name] == "undefined"){
                this.models[args.name] = new this.type(args);

                if (this.models[args.name].GetProperty("display")) {
                    var data = {
                        func: "notify",
                        args: {
                            module: "models",
                            event: "new model",
                            args: {
                                name: this.models[args.name].GetProperty("name"),
                                displayName: this.models[args.name].GetProperty("displayName"),
                                currentCount: this.models[args.name].GetProperty("currentCount"),
                                maxCount: this.models[args.name].GetProperty("maxCount"),
                                buy: this.models[args.name].GetProperty("buy"),
                                section: this.getName()
                            }
                        }
                    };
                    game.api(data);
                }
            }
        },

        init: function () {
            if (this.config.tick) {
                data = {
                    func: "registerNotification",
                    args: {
                        module: "gameLoop",
                        event: "runTick",
                        callback: this.runTick
                    }
                };

                game.api(data);
            }

            if (typeof this.config.events !== "undefined" && this.config.events.length > 0) {
                this.config.events.forEach(function (element, index, array) {
                    data = {
                        func: "registerNotification",
                        args: {
                            module: element.module,
                            event: element.event,
                            callback: this[element.callback]
                        }
                    };

                    game.api(data);
                });
            }
        }
    }

    return resourceManager;

});