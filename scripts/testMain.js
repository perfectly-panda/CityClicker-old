"use strict";

require.config({
    baseurl: 'scripts',
    paths: {
        qunit: "libs/Qunit"
        ,jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min"
        ,penguin: "libs/penguin"
        ,models: "libs/penguin/models"
    },
    map: {
        // '*' means all modules will get 'jquery-private'
        // for their 'jquery' dependency.
        '*': { 'jquery': 'libs/jquery/jquery-private' },

        // 'jquery-private' wants the real jQuery module
        // though. If this line was not here, there would
        // be an unresolvable cyclic dependency.
        'libs/jquery/jquery-private': { 'jquery': 'jquery' }
    },
    shim: {
        'qunit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autoload = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

require([
        "qunit/QUnit",
        "qunit/testMain",
        "qunit/testLayout",
        "qunit/testResources",
        "qunit/testClient"
    ],

    function (
        QUnit,
        testMain,
        testLayout,
        testResources,
        testClient
    ) {

        // Without this setTimeout, the specs don't always get execute in webKit browsers
        setTimeout(function () {

            QUnit.load();

            testMain.run();
            testLayout.run();
            testResources.run();
            testClient.run();

            QUnit.start();
        }, 10);

});






