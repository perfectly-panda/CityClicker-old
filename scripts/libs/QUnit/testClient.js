define(['qunit/QUnit', 'penguin/client', 'penguin/game', 'jquery'], function (QUnit, client, game, $) {
    var run = function () {

        if (typeof QUnit === 'undefined') {
            document.write("Cannot run tests without Quinit");
        }
        else {
            QUnit.test("check client.js", function (assert) {
                QUnit.stop();

                assert.equal(typeof client, "object", "check to make sure client object exists");

                assert.throws(function () { client.start(); }, new CustomError("missing #layout"), "no Layout yet");

                $("#qunit-fixture").append("<div id='layout'></div>");

                assert.ok(client.start(), "client successfully started");

                QUnit.start();
            });
        }
    }

    return { run: run }
});