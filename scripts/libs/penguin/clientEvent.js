define([], function () {
    var ClientEvent = function (args, api) {
        var self = this;

        this.module = args.module;
        this.event = args.args.event;
        this.item = args.args.item;
        this.api = api;

        this.init = function () {
            data = {
                module: this.module,
                event: "clientEvent",
                args: {
                    event: this.event,
                    item: this.item
                }
            };

            if (this.event == "buy") {
                data.args.callback = this.reserve;
                data.args.event = "getBuy";
            }

            return self.api(data);
        };

        this.reserve = function (args) {
            if (args.status = "good") {
                var data = {
                    module: args.cost.models[args.index],
                    event: "clientEvent",
                    args: {
                        event: "reserve",
                        item: args.cost.items[args.index],
                        amount: args.cost.amounts[args.index],
                        index: args.index,
                        cost: args.cost
                    }
                };

                if (args.index < args.cost.length - 1) {
                    console.log("next");
                    data.args.callback = self.reserve;
                }
                else {
                    data.args.callback = self.updateItem;
                }

                return self.api(data);
            }
            else {

            }
        };

        this.updateItem = function (args) {
            if (args.status = "good") {
                var data = {
                    module: self.module,
                    event: "clientEvent",
                    args: {
                        event: "buy",
                        item: self.item,
                        index: args.index,
                        cost: args.cost,
                        callback: self.updateValue
                    }
                };

                return self.api(data);
            }
            else {

            }
        };

        this.updateValue = function (args) {
            if (args.status = "good") {
                var data = {
                    module: args.value.models[args.valueIndex],
                    event: "clientEvent",
                    args: {
                        event: "updateTick",
                        item: args.value.items[args.valueIndex],
                        amount: args.value.amounts[args.valueIndex],
                        index: args.index,
                        valueIndex: args.valueIndex,
                        cost: args.cost,
                        value: args.value
                    }
                };

                if (args.valueIndex < args.value.length - 1) {
                    console.log("next");
                    data.args.callback = self.updateValue;
                }
                else {
                    data.args.callback = self.subtractCost;
                }

                return self.api(data);
            }
            else {

            }
        };

        this.subtractCost = function (args) {
            args.index = args.index - 1;
            if (args.status = "good") {
                var data = {
                    module: args.cost.models[args.index],
                    event: "clientEvent",
                    args: {
                        event: "use",
                        item: args.cost.items[args.index],
                        amount: args.cost.amounts[args.index],
                        index: args.index,
                        cost: args.cost
                    }
                };

                if (args.index > 0) {
                    console.log("next");
                    data.args.callback = self.subtractCost;
                }
                else {
                    data.args.callback = self.updateCost;
                }

                return self.api(data);
            }
            else {

            }
        };

        this.releaseCost = function (args) {
            if (args.status = "good") {
                var data = {
                    module: args.cost.models[args.index],
                    event: "clientEvent",
                    args: {
                        event: "release",
                        item: args.cost.items[args.index],
                        amount: args.cost.amounts[args.index],
                        index: args.index,
                        cost: args.cost
                    }
                };

                if (args.index > 0) {
                    console.log("next");
                    data.args.callback = self.subtractCost;
                }
                else {
                    data.args.callback = self.updateCost;
                }

                return self.api(data);
            }
            else {

            }
        };

        this.updateCost = function (args) {
            if (args.status = "good") {
                var data = {
                    module: self.module,
                    event: "clientEvent",
                    args: {
                        event: "updateCost",
                        item: self.item,
                        callback: self.returnMessage
                    }
                };

                return self.api(data);
            }
            else {

            }
        };

        this.returnMessage = function (args) {
            var data = {
                module: "log",
                event: "log",
                args: {
                    message: args.message
                }
            };

            return self.api(data);
        };

        return self.init();
    };

    return ClientEvent;
});