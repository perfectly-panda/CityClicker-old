define(['qunit/QUnit', 'penguin/layout', 'penguin/game', 'jquery'], function (QUnit, layout, game, $) {
    var run = function () {

        if (typeof QUnit === 'undefined') {
            document.write("Cannot run tests without Quinit");
        }
        else {
            QUnit.test("check layout.js", function (assert) {
                QUnit.stop();

                var value = "object";
                var data = { func: "checkModule", args: "layout" };

                //1
                assert.equal(typeof layout, value, "check to make sure layout object exists");

                //2
                assert.equal(game.api(data), true, "Layout is registered with the main API");

                //3
                assert.equal(layout.initialized, false, "Layout DOM has not been initialized");

                //4
                assert.throws(function () { layout.createLayout() }, new CustomError("missing #layout"), "need base id");

                $("#qunit-fixture").append("<div id='layout'></div>");

                //5
                assert.equal(layout.createLayout(), true, "layout has been initialized");

                //6
                assert.equal(layout.getRequiredElements().length, $("#layout").children().length, "all children have been created");

                layout.addRequiredElement("test");

                //7
                assert.equal(layout.getRequiredElements().indexOf("test") >= 0, true, "new element has been added");

                //8
                assert.throws(function () { layout.addRequiredElement() }, new CustomError("no arguments sent"), "can't send empty argument");

                assert.throws(function () { layout.addRequiredElement({}) }, new CustomError("argument wrong type: expected string"), "must send string to function");

                assert.equal(layout.getRequiredElements().length, $("#layout").children().length, "all children have been created");

                assert.equal($("#test").length > 0, true, "test element has been created");

                QUnit.start();
            });
        }
    }

    return { run: run }
});