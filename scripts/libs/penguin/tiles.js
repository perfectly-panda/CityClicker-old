var Penguin = Penguin || {};

Penguin.Tile = {};

Penguin.Tile.Model = function(args) {
    self = this;
    
    if(typeof args === 'undefined'){
        args = {};
    }
    
    var properties = {
        ID: args.ID || null,
        cost: args.cost || null,
        baseValue: args.baseValue || 0,
        value: args.value || 0,
        sprite: args.sprite || null,
    
        posX: args.posX || null,
        posY: args.posY || null,
        
        saleArgs: args.saleArgs || null
    }
    
    if(typeof args.OnPurchase !== 'undefined'){
        this.OnPurchase = new Function ([args.purchaseArgs], args.OnPurchase);
    }
    else {
        this.OnPurchase = function(){};
    }
    
    if(typeof args.OnSale !== 'undefined'){
        this.OnSale = new Function ([args.saleArgs], args.OnSale);
    }
    else {
        this.OnSale = function(){};
    }
    
    this.getProperty = function(property){return properties[property];};
    
    this.SetPos = function(newx, newy) {properties.posX = newx; properties.posY = newy;};
    
    this.GetAnimation = function() {return new $.gameQuery.Animation({imageURL: path + this.GetProperty("sprite")});};
    
}

Penguin.Tile.Model.prototype = {
    Purchase: function(player){
        if(PurchaseAvailable(player)){
            player.Resources.Cash.UpdateCount(-10);
            return true;
        }
        else{return false;}
    },
    PurchaseAvailable: function (player){
        if (player.Resources.Cash.GetProperty("currentCount") >= 10){return true;}
        else {return false;}},
    GetProperty: function(property){return this.getProperty(property);},
    Name: "Default",
    DisplayName: "Default",
    Purchasable: "false"
};


