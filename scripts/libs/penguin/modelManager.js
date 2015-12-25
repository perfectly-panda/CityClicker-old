define(["penguin/game"], function (game) {

    resourceManager = function (modelType) {
        self = this;
        public = {};

        models = {};
        type = modelType;

        //private functions
        runTick = function () {

        };

        //public functions
        public.getType = function () {
            return type;
        }

        public.createModel = function (args) {
            models[args.name] = new type(args.properties);

            if (args.properties.display) {
                var data = {
                    func: "notify",
                    args: {
                        module: "resources",
                        event: "new resource",
                        args: null
                    }
                };

                game.api(data);
            }
        }

        //initilization
        data = {
            func: "registerNotification",
            args: {
                args: {
                    module: "gameLoop",
                    event: "runTick"
                },
                callback: runTick()
            }
        };

        //game.api(data);

        return public;
    }

    return resourceManager;

});