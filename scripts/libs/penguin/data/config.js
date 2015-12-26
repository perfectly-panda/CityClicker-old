define([], function () {
  var config = {
    Name: "City Clicker",
    Local: true,
    ModuleConfig: 
    [
        {
            Name: "Resources",
            tick: true
        },
        {
            Name: "Buildings",
            tick: false,
            events: 
                {
                    module: "models",
                    event: "buy",
                    callback: "buy"
                }
        }
    ]
  }

  return config;
});
