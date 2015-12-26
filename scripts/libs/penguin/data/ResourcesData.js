define([], function () {
  var Resources = [
    {
      name: "Cash",
      displayName: "Cash",
      increment: true,
      currentCount: 100,
      perTick: 1
    },
    {
      name: "MoreCash",
      displayName: "More Cash",
      increment: true
    }

  ];

  return Resources;
});

/*{
    "resources": {
        "Cash": {
            "args":{
                "name": "Cash",
                "displayName": "Cash",
                "increment": "true"
            },
            "prototype":{}
        },
        "Water": {
            "args":{
                "name": "Water",
                "displayName": "Water",
                "increment": "true",
                "maxCount": "0"
            },
            "prototype":{}
        }
    }
}*/
