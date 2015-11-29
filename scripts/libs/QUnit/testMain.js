
define(['qunit/QUnit', 'penguin/game'], function (QUnit, game) {
    var run = function () {

        if (typeof QUnit === 'undefined') {
            document.write("Cannot run tests without Quinit");
        }
        else {

            QUnit.test("Check Game.js", function (assert) 
            {
                QUnit.stop();

                var value = "object";

                //assert.equal(typeof Penguin, value, "Penguin object exists");
                assert.equal(typeof game, value, "game object exists");

                value = "function";

                assert.equal(value, typeof game.api, "API exists");
                assert.throws(function () { game.api() }, new CustomError("no arguments sent"), "API returns error if no arguments sent");
                assert.throws(function () { game.api({}) }, new CustomError("missing required argument: func"), "API returns error if no function requested");
                assert.throws(function () { game.api({ func: {} }) }, new CustomError("argument wrong type: func, expected: string, received: object"), "API returns error if func is not a string");
                assert.throws(function () { game.api({ func: "doesntexist" }) }, new CustomError("function does not exist"), "API returns error if function does not exist");

                function callback() { return "stuff"; };
                var data = { func: "returnCallback", callback: callback }

                assert.equal(game.api(data), "stuff", "test function should simply return callback");

                data.func = "protectedTest";
                data.key = {};

                assert.throws(function () { game.register("fake") }, new CustomError("registration not allowed"), "registering fake components not allowed");
                assert.throws(function () { game.api(data) }, new CustomError("key value not valid"), "API returns error if accessing protected function with key that isn't a string");

                data.key = 'asf12asdf';
                assert.throws(function () { game.api(data) }, new CustomError("key value not valid"), "API returns error if accessing protected function with bad key");

                var mainKey = game.makeid();

                data.key = game.register("test", mainKey);

                assert.equal(data.key.length, 10, "correct response from registering compontent");
                assert.equal(game.api(data), "stuff", "now we have a valid key");

                assert.throws(function () { game.register("test"); }, new CustomError("registration not allowed"), "can't register again");

                game.load();
                assert.throws(function () { game.register("afterLoad"); }, new CustomError("registration not allowed"), "can't register after game is done loading");


                data.func = "registerNotification";
                assert.throws(function () { game.api(data); }, new CustomError("missing arguments"), "need registration arguments");

                data.args = {
                    module: "test",
                    event: "test"
                };
                var j = null;
                data.callback = function () { j = "stuff"; }
                assert.equal(game.api(data), true, "register for notifications");

                data.func = "notify";
                game.api(data);

                assert.equal(j, "stuff", "receive notification");

                data = { func: "checkModule", args: "Test" };
                assert.equal(game.api(data), true, "Test is registered with the main API");

                //20
                data.args = "fake";
                assert.equal(game.api(data), false, "False if module isn't registered");

                //21
                data.args = null;
                assert.throws(function () { game.api(data); }, new CustomError("no arguments sent"), "can't check a module we don't send");

                //22
                data.args = 2.146;
                assert.throws(function () { game.api(data); }, new CustomError("argument wrong type: expected string"), "only check strings");

                QUnit.start();
            });
        }
    }

    return { run: run }
});