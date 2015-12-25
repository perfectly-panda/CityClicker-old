"use strict";

require.config({
    baseurl: 'scripts',
    paths: {
        qunit: "libs/Qunit"
        , jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
        , penguin: "libs/penguin"
        , models: "libs/penguin/models"
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

require([
        "penguin/interface",
        "penguin/client",
        "penguin/modelManager"
],

    function (
        gameInterface,
        client,
        manager

    )
    {
        var managers = {};

        var siteMap = { modules: ["Resources"] };

        var modulesToLoad = siteMap.modules.map(function (m) { return 'models/' + m; });
        require(modulesToLoad, function () {
            var args = arguments;
            siteMap.modules.forEach(function (element, index, array) {
                managers[element] = new manager(args[index]);
            });

            client.start(gameInterface);

            //initialize the browser
            siteMap.modules.forEach(function (element, index, array) {
                gameInterface.addRequiredElement(element);
            });
        });
    }
);






