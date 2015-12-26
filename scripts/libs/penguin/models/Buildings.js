define(["models/Base"], function (Model) {

    var Resources = function () {
        Model.apply(this, arguments);

        console.log(this.buy);
    }

    Resources.prototype = Model.prototype;

    return Resources;

});