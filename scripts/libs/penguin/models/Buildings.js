define(["models/Base"], function (Model) {

    var Resources = function () {
        Model.apply(this, arguments);

        if (typeof arguments[0].purchase !== "undefined") {
            this.purchase = {
                models: arguments[0].purchase.models,
                items: arguments[0].purchase.items,
                amounts: arguments[0].purchase.amounts
            };
            this.buy = true;
        }
        else {
            this.purchase = null;
        }

        if (typeof arguments[0].value !== "undefined") {
            this.value = {
                models: arguments[0].value.models,
                items: arguments[0].value.items,
                amounts: arguments[0].value.amounts
            };
        }
        else {
            this.value = null;
        }

        if (typeof arguments[0].sell !== "undefined") {
            this.sell = {
                models: arguments[0].sell.models,
                items: arguments[0].sell.items,
                amounts: arguments[0].sell.amounts
            };
        }
        else {
            this.sell = null;
        }

        if (typeof arguments[0].sellValue !== "undefined") {
            this.sellValue = {
                models: arguments[0].sellValue.models,
                items: arguments[0].sellValue.items,
                amounts: arguments[0].sellValue.amounts
            };
        }
        else {
            this.sellValue = null;
        }
    }

    Resources.prototype = Model.prototype;

    return Resources;

});