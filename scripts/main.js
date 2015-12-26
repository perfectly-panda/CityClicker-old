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

                managers = config.ModuleConfig.map(function (m, index) {
                    var newMan = CreateManager(m);
                    newMan.init();
                    gameInterface.addRequiredElement(newMan.getName());
                    return newMan;
                });

                for (var i = 0; i < managers.length; i++) {
                    (function (index) {
                        require(['data/' + managers[index].getName() + "Data", 'models/' + managers[index].getName()], function () {
                            var args = arguments[0];
                            var model = arguments[1];
                            managers[index].setType(model);
                            for (var j = 0; j < args.length; j++) {
                                (function (mod) {
                                    managers[index].createModel(args[mod]);
                                })(j);
                            }
                        });
                    })(i);
                }

                client.start(gameInterface);

                function CreateManager(m) {
                    return new manager(m);
                }
            });
        }
        else {
            console.log("config error");
        }
    }
);







