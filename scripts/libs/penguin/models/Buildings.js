define(["models/Base"], function (Model) {

    var Resources = function (args) {
        args.buy = true;
        this.self = new Model(args);


        return this.self;

    }

    return Resources;

});