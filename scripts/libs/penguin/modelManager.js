define(["penguin/game"], function (game) {

    resourceManager = function (modelType, config) {
        self = this;
        public = {};

        models = {};
        type = modelType;
        name = config.Name;

        //private functions
        runTick = function () {
            for (var key in models) {
                models[key].RunTick();
                if (models[key].GetProperty("display") && models[key].GetProperty("perTick") != 0) {
                    var data = {
                        func: "notify",
                        args: {
                            module: "models",
                            event: "update model",
                            args: {
                                displayName: models[key].GetProperty("displayName"),
                                currentCount: models[key].GetProperty("currentCount"),
                                maxCount: models[key].GetProperty("maxCount"),
                                section: name
                            }
                        }
                    };
                    game.api(data);
                }
            }
        };

        buy = function () {

        };

        sell = function () {

        };

        var use = function () {

        };

        //public functions
        public.getType = function () {
            return type;
        }

        public.createModel = function (args) {
            if(typeof models[args.name] == "undefined"){
                models[args.name] = new type(args);

                if (models[args.name].GetProperty("display")) {
                    var data = {
                        func: "notify",
                        args: {
                            module: "models",
                            event: "new model",
                            args: {
                                displayName: models[args.name].GetProperty("displayName"),
                                currentCount: models[args.name].GetProperty("currentCount"),
                                maxCount: models[args.name].GetProperty("maxCount"),
                                buy: models[args.name].GetProperty("buy"),
                                section: name
                            }
                        }
                    };
                    game.api(data);
                }
            }
        }

        //initilization
        if (config.tick) {
            data = {
                func: "registerNotification",
                args: {
                    module: "gameLoop",
                    event: "runTick",
                    callback: runTick
                }
            };

            game.api(data);
        }

        if (typeof config.events !== "undefined" && config.events.length > 0) {
            config.events.forEach(function (element, index, array) {
                data = {
                    func: "registerNotification",
                    args: {
                        module: element.module,
                        event: element.event,
                        callback: self[element.callback]
                    }
                };

                game.api(data);
            });
        }

        var modulesToLoad = 'data/' + config.Name;
        require([modulesToLoad], function () {
            var args = arguments[0];
            for(var i = 0; i < args.length; i++) {
                public.createModel(args[i]);
            }
        });

        return public;
    }

    return resourceManager;

});