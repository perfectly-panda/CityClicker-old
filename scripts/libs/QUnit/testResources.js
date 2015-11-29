
define(['qunit/QUnit', 'penguin/game', 'models/resources'], function (QUnit, game, resources) {
    var run = function () {

        QUnit.test("Check Resource Model", function (assert) {
            //assert.expect(3);
            QUnit.stop(2);


            //1
            assert.equal(typeof resources.resource, "function", "check to make sure resource model exists");

            var done = assert.async(1);

            var callback = function () {
                assert.ok(true, "callback called");
                done();
                QUnit.start();
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