define([], function () {
  var config = {
    Name: "City Clicker",
    Local: true,
    ModuleConfig: 
    [
        {
            Name: "Resources",
            tick: true,
            events:
                [{
                    module: "Resources",
                    event: "clientEvent",
                    callback: "clientEvent"
                }]
        },
        {
            Name: "Buildings",
            tick: false,
            events: 
                [{
                    module: "Buildings",
                    event: "clientEvent",
                    callback: "clientEvent"
                }]
        }
    ]
  }

  return config;
});
