define([], function () {

    Base = function (args) {
        /// <summary>Default resource model.</summary>
        /// <param name="ID" type="integer">ID</param>
        /// <param name="name" type="string">string</param>
        /// <param name="group" type="string">group</param>
        /// <param name="display" type="bool">display</param>

        var public = {};

        var self = this;

        if (typeof args === 'undefined') {
            args = {};
        }

        var properties = {
            ID: args.ID || null,
            name: args.name || "unnamed",
            displayName: args.displayName || name,
            group: args.group || "unnamed",
            display: args.display || true,
            buy: args.buy || false,

            currentCount: args.currentCount || 0,
            maxCount: args.maxCount || -1,
            perTick: args.perTick || 0,

            increment: args.increment || false,
            retainOnReset: args.retainOnReset || false,

            customProperties: args.customProperties || null
        };

        public.GetProperty = function (property) { return properties[property]; };

        public.SetName = function (n) { properties.name = n; };
        public.SetGroup = function (g) { properties.group = g; };
        public.SetDisplay = function (d) { properties.display = d; };
        public.SetCurrentCount = function (c) {
            if (properties.maxCount === -1 || properties.maxCount >= c) {
                properties.currentCount = c;
            }
            else {
                properties.currentCount = properties.maxCount;
            }
        };
        public.SetMaxCount = function (c) { properties.maxCount = c; };
        public.SetPerTick = function (c) { properties.perTick = c; };
        public.SetIncrement = function (i) { properties.increment = i; };
        public.SetCustomProperty = function (n, p) { properties.customProperties[n] = p };

        public.UpdateCurrentCount = function (c) {
            tempCount = properties.currentCount + c;

            if (properties.maxCount === -1 || properties.maxCount >= tempCount) {
                properties.currentCount = tempCount;
            }
            else {
                properties.currentCount = properties.maxCount;
            }
        };
        public.UpdateMaxCount = function (c) { properties.maxCount = parseFloat(properties.maxCount) + parseFloat(c); };
        public.UpdatePerTick = function (c) { properties.perTick = parseFloat(properties.perTick) + parseFloat(c); };

        public.RunTick = function () {
            if (properties.increment) {
                public.UpdateCurrentCount(public.GetProperty("perTick"));
            }
        };

        return public;
    }

    return Base;

});