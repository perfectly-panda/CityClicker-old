define([], function () {

    Base = function (args) {
        /// <summary>Default resource model.</summary>
        /// <param name="ID" type="integer">ID</param>
        /// <param name="name" type="string">string</param>
        /// <param name="group" type="string">group</param>
        /// <param name="display" type="bool">display</param>

        var self = this;


        if (typeof args === 'undefined') {
            args = {};
        }

        this.ID = args.ID || null;
        this.name = args.name || "unnamed";
        this.displayName = args.displayName || name;
        this.group = args.group || "unnamed";

        this.display = args.display;
        if (typeof args.display == "undefined") {
            this.display = true;
        }
        this.buy = args.buy;
        if (typeof args.buy == "undefined") {
            this.buy = false;
        }

        this.currentCount = args.currentCount || 0;
        this.maxCount = args.maxCount || -1;
        this.perTick = args.perTick || 0;

        this.increment = args.increment || false;
        this.retainOnReset = args.retainOnReset || false;
    }

    Base.prototype = {
        GetProperty: function (property) { return this[property]; },

        SetName: function (n) { this.name = n; },
        SetGroup: function (g) { this.group = g; },
        SetDisplay: function (d) { this.display = d; },
        SetCurrentCount: function (c) {
            if (this.maxCount === -1 || this.maxCount >= c) {
                this.currentCount = c;
            }
            else {
                this.currentCount = this.maxCount;
            }
        },
        SetMaxCount: function (c) { this.maxCount = c; },
        SetPerTick: function (c) { this.perTick = c; },
        SetIncrement: function (i) { this.increment = i; },
        SetCustomProperty: function (n, p) { this.customProperties[n] = p },

        UpdateCurrentCount: function (c) {
            tempCount = this.currentCount + c;

            if (this.maxCount === -1 || this.maxCount >= tempCount) {
                this.currentCount = tempCount;
            }
            else {
                this.currentCount = this.maxCount;
            }
        },
        UpdateMaxCount: function (c) { this.maxCount = parseFloat(this.maxCount) + parseFloat(c); },
        UpdatePerTick: function (c) { this.perTick = parseFloat(this.perTick) + parseFloat(c); },

        RunTick: function () {
            if (this.increment) {
                this.UpdateCurrentCount(this.GetProperty("perTick"));
            }
        }
    }

    return Base;

});