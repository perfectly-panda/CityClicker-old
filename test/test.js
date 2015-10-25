(function () {
    if (typeof QUnit === 'undefined') {
        document.write("Cannot run tests without Quinit");
    }
    else {

        QUnit.test("Check Game.js", function (assert) {
            var value = "object";

            assert.equal(typeof Penguin, value, "Penguin object exists");
            assert.equal(typeof Penguin.Game, value, "Penguin.Game object exists");

            value = "function";

            assert.equal(value, typeof Penguin.Game.api, "API exists");
            assert.throws(function () { Penguin.Game.api() }, new CustomError("no arguments sent"), "API returns error if no arguments sent");
            assert.throws(function () { Penguin.Game.api({}) }, new CustomError("missing required argument: func"), "API returns error if no function requested");
            assert.throws(function () { Penguin.Game.api({ func: {}}) }, new CustomError("argument wrong type: func, expected: string, received: object"), "API returns error if func is not a string");
            assert.throws(function () { Penguin.Game.api({ func: "doesntexist" }) }, new CustomError("function does not exist"), "API returns error if function does not exist");

            function callback() { return "stuff"; };
            var data = { func: "returnCallback", callback: callback }

            assert.equal(Penguin.Game.api(data), "stuff", "test function should simply return callback");

            data.func  = "protectedTest";
            data.key = {} ;

            assert.throws(function () { Penguin.Game.register("fake") }, new CustomError("registration not allowed"), "registering fake components not allowed");
            assert.throws(function () { Penguin.Game.api(data) }, new CustomError("key value not valid"), "API returns error if accessing protected function with key that isn't a string");

            data.key = 'asf12asdf';
            assert.throws(function () { Penguin.Game.api(data) }, new CustomError("key value not valid"), "API returns error if accessing protected function with bad key");
            
            var mainKey = Penguin.Game.makeid();

            data.key = Penguin.Game.register("test", mainKey);

            assert.equal(data.key.length, 10, "correct response from registering compontent");
            assert.equal(Penguin.Game.api(data), "stuff", "now we have a valid key");

            assert.throws(function () { Penguin.Game.register("test") }, new CustomError("registration not allowed"), "can't register again");

            Penguin.Game.load();
            assert.throws(function () { Penguin.Game.register("afterLoad") }, new CustomError("registration not allowed"), "can't register after game is done loading");


            data.func = "registerNotifcation";

            assert.throws(function () { Penguin.Game.api(data) }, new CustomError("missing arguments"), "need registration arguments");

            data.args = {
                module: "test",
                event: "test"
            };
            var j = null;
            data.callback = function () {j = "stuff"; }
            assert.equal(Penguin.Game.api(data), true, "register for notifications");

            data.func = "notify";
            Penguin.Game.api(data);

            assert.equal(j, "stuff", "receive notification");

            data = { func: "checkModule", module: "Test" };
            assert.equal(Penguin.Game.api(data), true, "Test is registered with the main API");
            
            data.module = "fake";
            assert.equal(Penguin.Game.api(data), false, "False if module isn't registered");

            data.module = null;
            asset.throws(Penguin.Game.api(data), new CustomError("missing arguments"), "can't check a module we don't send");
        });

        QUnit.test("check layout.js", function (assert) {
            var value = "object";
            var data = { func: "checkModule", module: "Layout" };

            assert.equal(typeof Penguin.Layout, value, "check to make sure layout object exists");
            assert.equal(Penguin.Game.api(data), true, "Layout is registered with the main API");
        });
    }

})();