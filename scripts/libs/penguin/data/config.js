define([], function () {
  var config = {
    Name: "City Clicker",
    Local: true,
    Modules: ["Resources"],
    ModuleConfig: {
      Resources: {
        Name: "Resources",
        tick: true
      }
    }
  }

  return config;
});
