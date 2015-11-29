
define(['qunit/QUnit', 'penguin/game', 'models/resources'], function (QUnit, game, resources) {
    var run = function () {

        QUnit.test("Check Resource Model", function (assert) {
            QUnit.stop();

            assert.expect(3);

            //1
            assert.equal(typeof resources.resource, "function", "check to make sure resource model exists");

            var callback = function () {
                console.log("callback called");
                assert.async();
            };

            var data = {
                func: 'registerNotification',
                args: {
                    module: 'resources',
                    event: 'new resource',
                },
                callback: callback
            };

            game.api(data);

            var resource = new resources.resource();

            assert.equal(typeof resource, "object", "create a new resource object");


            QUnit.start();
        });
    }

    return { run: run }
});