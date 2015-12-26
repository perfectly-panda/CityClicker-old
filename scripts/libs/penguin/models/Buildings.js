define(["models/Base"], function (Model) {

    var Resources = function () {
        Model.apply(this, arguments);
    }

    Resources.prototype = Model.prototype;

    return Resources;

});