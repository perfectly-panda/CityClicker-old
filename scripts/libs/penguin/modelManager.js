define(["penguin/game"], function (game) {

    resourceManager = function (config) {
        var self = this;

        this.models = {};
        this.config = config;
        this.type = null;

        this.callbacks =
            {
                runTick: function (args, index, callback) {
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
                    };

                    if (typeof index == 'integer') {
                        return callback[index + 1](args, index, callback);
                    }
                },

                buy: function (args) {
                    if (typeof self.models[args.item] !== "undefined") {
                        var attempt = self.models[args.item].UpdateCurrentCount(1);
                        if (attempt) {
                            var data = {
                                event: args.event,
                                item: args.item,
                                cost: args.cost,
                                index: args.index,
                                valueIndex: 0,
                                status: "good"
                            };

                            if (typeof self.models[args.item].value !== "undefined" && self.models[args.item].value != null) {
                                data.value = self.models[args.item].value;
                            }

                            if (self.models[args.item].GetProperty("display")) {
                                var update = {
                                    func: "notify",
                                    args: {
                                        module: "models",
                                        event: "update model",
                                        args: {
                                            name: self.models[args.item].GetProperty("name"),
                                            displayName: self.models[args.item].GetProperty("displayName"),
                                            currentCount: self.models[args.item].GetProperty("currentCount"),
                                            maxCount: self.models[args.item].GetProperty("maxCount"),
                                            section: self.getName()
                                        }
                                    }
                                };
                                game.api(update);
                            }
                        }
                        else {
                            var data = {
                                event: args.event,
                                item: args.item,
                                cost: args.cost,
                                index: args.index,
                                status: "fail",
                                reason: "Already at max " + self.models[args.item].GetProperty("displayName") + "."
                            };
                        }
                    }
                    else {
                        var data = {
                            event: args.event,
                            item: args.item,
                            cost: args.cost,
                            index: args.index,
                            status: "fail",
                            reason: "Item does not exist."
                        };
                    };

                    return args.callback(data);
                },

                sell: function (args) {
                    console.log("sell");
                    console.log(args);
                },

                use: function (args) {
                    if (typeof self.models[args.item] !== "undefined") {
                        self.models[args.item].UseReserve(args.amount);
                            var data = {
                                event: args.event,
                                item: args.item,
                                cost: args.cost,
                                index: args.index - 1,
                                status: "good"
                            };
                    }
                    else {
                        var data = {
                            event: args.event,
                            item: args.item,
                            cost: args.cost,
                            index: args.index,
                            status: "fail",
                            reason: "Item does not exist."
                        };
                    };

                    return args.callback(data);
                },
                release: function (args) {
                    console.log("release");
                    console.log(args);
                },
                updateTick: function (args) {
                    if (typeof self.models[args.item] !== "undefined") {
                        self.models[args.item].UpdatePerTick(args.amount);

                        var data = {
                            event: args.event,
                            item: args.item,
                            cost: args.cost,
                            value: args.value,
                            index: args.index,
                            valueIndex: args.valueIndex + 1,
                            status: "good"
                        };
                    }
                    else {
                        var data = {
                            event: args.event,
                            item: args.item,
                            cost: args.cost,
                            index: args.index,
                            status: "fail",
                            message: "Item does not exist."
                        };
                    };

                    return args.callback(data);
                },
                updateCost: function (args) {
                    if (typeof self.models[args.item] !== "undefined") {
                        self.models[args.item].UpdateCost();

                        var data = {
                            event: args.event,
                            item: args.item,
                            message: "Purchased " +self.models[args.item].GetProperty("displayName"),
                            status: "good"
                        };
                    }
                    else {
                        var data = {
                            event: args.event,
                            item: args.item,
                            status: "fail",
                            reason: "Item does not exist."
                        };
                    };

                    return args.callback(data);
                },
                reserve: function (args) {
                    if (typeof self.models[args.item] !== "undefined") {
                        var attempt = self.models[args.item].ReserveCount(args.amount);
                        if (attempt) {
                            var data = {
                                event: args.event,
                                item: args.item,
                                cost: args.cost,
                                index: args.index + 1,
                                status: "good"
                            };

                            if (self.models[args.item].GetProperty("display")) {
                                var update = {
                                    func: "notify",
                                    args: {
                                        module: "models",
                                        event: "update model",
                                        args: {
                                            name: self.models[args.item].GetProperty("name"),
                                            displayName: self.models[args.item].GetProperty("displayName"),
                                            currentCount: self.models[args.item].GetProperty("currentCount"),
                                            maxCount: self.models[args.item].GetProperty("maxCount"),
                                            section: self.getName()
                                        }
                                    }
                                };
                                game.api(update);
                            }
                        }
                        else {
                            var data = {
                                event: args.event,
                                item: args.item,
                                cost: args.cost,
                                index: args.index,
                                status: "fail",
                                reason: "Not enough " + self.models[args.item].GetProperty("displayName")+ "."
                            };
                        }
                    }
                    else {
                        var data = {
                            event: args.event,
                            item: args.item,
                            cost: args.cost,
                            index: args.index,
                            status: "fail",
                            reason: "Item does not exist."
                        };
                    };

                    return args.callback(data);
                },

                getBuy: function (args) {

                    if (typeof self.models[args.item] !== "undefined" && self.models[args.item].purchase !== "undefined") {
                        var data = {
                            event: args.event,
                            item: args.item,
                            cost: self.models[args.item].purchase,
                            index: 0,
                            status: "good"
                        };
                    }
                    else {
                        var data = {
                            event: args.event,
                            item: args.item,
                            //cost: self.models[args.item].purchase,
                            index: 0,
                            status: "fail",
                            reason: "Item does not exist or cannot be purchased."
                        };
                    };

                    return args.callback(data);
                },

                clientEvent: function (args, index, callback) {
                    return self.callbacks[args.event](args);
                }

            }

        this.setType = function (model) {
            this.type = model;
        };
        this.getType = function () {
            return this.type;
        };
        this.getName = function () {
            return this.config.Name;
        };
        this.getModels = function () {
            return this.models;
        };

        this.createModel = function(args) {
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
        };

        this.init = function () {

            if (this.config.tick) {
                data = {
                    func: "registerNotification",
                    args: {
                        module: "gameLoop",
                        event: "runTick",
                        callback: self.callbacks.runTick
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
                            callback: self.callbacks[element.callback]
                        }
                    };

                    game.api(data);
                });
            }
        };

        return this;
    }

    return resourceManager;

});