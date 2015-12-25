"use strict";

require.config({
    baseurl: 'scripts',
    paths: {
        qunit: "libs/Qunit"
        , jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
        , penguin: "libs/penguin"
        , models: "libs/penguin/models"
        , data: "libs/penguin/data"
    },
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': { 'jquery': 'libs/jquery/jquery-private' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'libs/jquery/jquery-private': { 'jquery': 'jquery' }
    }
});

require(["data/config"],
    function (config) {
        if (config.Local) {
            require([
                "penguin/interface"
                ,"penguin/client"
                ,"penguin/modelManager"
                ,"penguin/loop"
            ],
            function (
                gameInterface
                ,client
                ,manager
                ,loop
            ) {
                var managers = {};

                var modulesToLoad = config.Modules.map(function (m) { return 'models/' + m; });
                require(modulesToLoad, function () {
                    var args = arguments;
                    config.Modules.forEach(function (element, index, array) {
                        managers[element] = new manager(args[index], config.ModuleConfig[element]);
                        gameInterface.addRequiredElement(element);
                    });

                    client.start(gameInterface);
                });
            });
        }
        else {
            console.log("config error");
        }
    }
);






