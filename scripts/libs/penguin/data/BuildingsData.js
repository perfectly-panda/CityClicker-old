define([], function () {
    var Buildings = [
      {
          name: "Blank",
          displayName: "Blank",
          increment: false,
          display: false
      },
      {
          name: "BasicHouse",
          displayName: "Basic House",
          increment: false,
          purchase: {
              models: ["Resources"],
              items: ["Cash"],
              amounts: [50]
          },
          value: {
              models: ["Resources"],
              items: ["Cash"],
              amounts: [.1]
          },
          sell: {
              models: ["Resources"],
              items: ["Cash"],
              amounts: [10]
          },
          sellValue: {
              models: ["Resources"],
              items: ["Cash"],
              amounts: [1]
          }
      }

    ];

    return Buildings;
});

/*{
    "tiles": {
        "BlankTile": {
            "args": {
                "cost": "$10",
                "value": "no resources generated",
                "sprite": "/images/blankTile.jpg",
                "OnPurchase": "Penguin.ResourceManager.UpdatePerTick(player, 'Cash', '0');",
                "purchaseArgs": "player",
                "OnSale": "Penguin.ResourceManager.UpdatePerTick(player, 'Cash', '0');",
                "saleArgs": "player"
            },
            "prototype":{
                "PurchasePrice": {
                    "body": "10",
                    "eval": "false"
                },
                "TryPurchase": { 
                    "args": "player",
                    "body": "Penguin.ResourceManager.GetCount(player, 'BlankTile', 'Tiles.BlankTile.prototype.MakePurchase')",
                    "eval": "true"
                },
                "MakePurchase": {
                    "args": "args",
                    "eval": "true",
                    "body": "if(args.purchaseAvailable){Penguin.ResourceManager.UpdateCount(args.player, 'Cash', -10); return true;} else{return false;}"
                },
                "PurchaseAvailable": {
                    "args": "player",
                    "body": "Penguin.ResourceManager.GetCounts(player, ['Cash'], 'Layout.RecievePurchaseOptions', [Penguin.Game.Tiles.CashMachine.prototype.PurchasePrice])",
                    "eval": "true"
                },
                "Name": {
                    "body": "BlankTile",
                    "eval": "false"
                },
                "DisplayName": {
                    "body": "Blank Tile",
                    "eval": "false"
                },
                "Purchasable": {
                    "body": "false",
                    "eval": "false"
                }
            }
        },
        "CashMachine": {
            "args": {
                "cost": "$25",
                "value": "$.01 cash per tick.",
                "sprite": "/images/cashMachine.jpg",
                "OnPurchase": "Penguin.ResourceManager.UpdatePerTick(player, 'Cash', '.01');",
                "purchaseArgs": "player",
                "OnSale": "Penguin.ResourceManager.UpdatePerTick(player, 'Cash', '-.01');",
                "saleArgs": "player"
            },
            "prototype":{
                "PurchasePrice": {
                    "body": {"Cash": "25"},
                    "eval": "false"
                },
                "TryPurchase": { 
                    "args": "player",
                    "body": "Penguin.ResourceManager.GetCount(player, 'Cash', 'Tiles.CashMachine.prototype.MakePurchase')",
                    "eval": "true"
                },
                "MakePurchase": {
                    "args": "args",
                    "eval": "true",
                    "body": "if(parseFloat(args.value) >= parseFloat(Penguin.Game.Tiles.CashMachine.prototype.PurchasePrice.Cash)){Penguin.ResourceManager.UpdateCount(args.player, 'Cash', -25); Penguin.Game.Layout.FinishPurchase('CashMachine');}"
                },
                "PurchaseAvailable": {
                    "args": "player",
                    "body": "Penguin.ResourceManager.GetCounts(player, ['Cash'], 'Layout.RecievePurchaseOptions', [Penguin.Game.Tiles.CashMachine.prototype.PurchasePrice.Cash, 'CashMachine'])",
                    "eval": "true"
                },
                "Name": {
                    "body": "CashMachine",
                    "eval": "false"
                },
                "DisplayName": {
                    "body": "Basic House",
                    "eval": "false"
                },
                "Purchasable": {
                    "body": "true",
                    "eval": "false"
                }
            }
        }
    }
}*/
