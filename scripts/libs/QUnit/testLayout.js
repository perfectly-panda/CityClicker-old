define(['qunit/QUnit', 'penguin/interface', 'penguin/game', 'jquery'], function (QUnit, layout, game, $) {
    var run = function () {

        if (typeof QUnit === 'undefined') {
            document.write("Cannot run tests without Quinit");
        }
        else {
            QUnit.test("check interface.js", function (assert) {
                QUnit.stop();

                var value = "object";
                var data = { func: "checkModule", args: "layout" };

                //1
                assert.equal(typeof layout, value, "check to make sure layout object exists");

                //2
                assert.equal(game.api(data), true, "Layout is registered with the main API");

                
                QUnit.start();
            });
        }
    }

    return { run: run }
});