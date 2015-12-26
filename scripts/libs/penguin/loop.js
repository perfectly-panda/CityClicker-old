define(["penguin/game"], function(game){
    self = this;
    running = true;

    key = null;
    gameKey = null;

    public = {};

    loop = {
        func: "notify",
        args: {
            module: "gameLoop",
            event: "runTick",
            args: null
        }
    };

    run = function (args, index, callback) {
        if (running) {
            game.api(loop);
            setTimeout(function () { run(); }, 100);
        }

        if (typeof index == 'integer') {
            return callback[index + 1](args, index, callback);
        }
    };

    start = function (args, index, callback) {
        running = true;
        setTimeout(function () { run(); }, 100);

        if (typeof index == 'integer') {
            return callback[index + 1](args, index, callback);
        }
    }

    stop = function (args, index, callback) {
        running = false;

        if (typeof index == 'integer') {
            return callback[index + 1](args, index, callback);
        }
    };

    //initialize module
    self.key = game.makeid();
    self.gameKey = game.register("gameLoop", self.key);

    data = {
        func: "registerNotification",
        args: {
            module: "gameLoop",
            event: "start",
            callback: start
        }
    };

    game.api(data);

    data.args = {
        module: "gameLoop",
        event: "stop",
        callback: stop
    }

    game.api(data);

    start();
});