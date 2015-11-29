define(["penguin/game"], function(game){
     
    resource = function(args) {
        /// <summary>Default resource model.</summary>
        /// <param name="ID" type="integer">ID</param>
        /// <param name="name" type="string">string</param>
        /// <param name="group" type="string">group</param>
        /// <param name="display" type="bool">display</param>
       
        var self = this;
    
        if(typeof args === 'undefined'){
            args = {};
        }
        var properties = {
            ID: args.ID || null,
            name: args.name || "unnamed",
            displayName: args.displayName || name,
            group: args.group || "unnamed",
            display: args.display || true,
            div: args.div || null,
    
            currentCount: args.currentCount || 0,
            maxCount: args.maxCount || -1,
            perTick: args.perTick || 0,
        
            increment: args.increment || false,
            retainOnReset: args.retainOnReset || false,
    
            customProperties: args.customProperties || null
        };
    
        this.GetProperty = function(property){return properties[property];};
    
        this.SetName = function(n){properties.name = n;};
        this.SetGroup = function(g){properties.group = g;};
        this.SetDisplay=  function(d){properties.display = d;};
        this.SetCurrentCount= function(c){
            if(properties.maxCount === -1 || properties.maxCount >= c){
                properties.currentCount = c;
            }
            else{
                properties.currentCount = properties.maxCount;
            }
        };
        this.SetMaxCount= function(c){properties.maxCount = c;};
        this.SetPerTick= function(c){properties.perTick = c;};
        this.SetIncrement= function(i){properties.increment = i;};
        this.SetCustomProperty= function(n, p){properties.customProperties[n] = p};

        this.UpdateCurrentCount= function(c){
            tempCount = properties.currentCount + c;

            if(properties.maxCount === -1 || properties.maxCount >= tempCount){
                properties.currentCount = tempCount;
            }
            else{
                properties.currentCount = properties.maxCount;
            }
        };
        this.UpdateMaxCount= function(c){properties.maxCount = parseFloat(properties.maxCount) + parseFloat(c);};
        this.UpdatePerTick= function(c){properties.perTick = parseFloat(properties.perTick) + parseFloat(c);};
    
        this.RunTick = function(){
            if (properties.increment){
                self.UpdateCurrentCount(self.GetProperty("perTick"));
            }
        };

        if (properties.display) {
            var data = {
                func: "notify",
                args: {
                    module: "resources",
                    event: "new resource",
                    args: null
                }
            };

            game.api(data);
        }
    }

    return {
        resource: resource
    };
    
});
/*
Penguin.ResourceManager = (function (){
    public = {};
    public.UpdateCount = function(player, resource, count){
        if(typeof player === 'undefined'){
            player = game.Player;
        }
        if(game.useWorker){
            game.worker.postMessage(JSON.stringify({
                callFunction: 'updateResource',
                args: {
                    type: 'currentCount',
                    name: resource,
                    value: count
                }
            }));
        }
        else{
            player.Resources[resource].UpdateCurrentCount(count);
        }
    };
    public.GetCount = function(player, resource, callback){
        if(typeof player === 'undefined'){
            player = game.Player;
        }
        if(game.useWorker){
            game.worker.postMessage(JSON.stringify({
                callFunction: 'resourceValue',
                args: {
                    property: 'currentCount',
                    name: resource,
                    callback: callback
                }
            }));
        }
        else{
            Penguin.game.executeFunctionByName(callback, Penguin.game ,player.Resources[resource].getProperty('currentCount'));;
        }
    };
    public.GetCounts = function(player, resource, callback, args){
        if(typeof player === 'undefined'){
            player = game.Player;
        }
        //console.log(args);
        if(game.useWorker){
            game.worker.postMessage(JSON.stringify({
                callFunction: 'resourceValues',
                args: {
                    property: 'currentCount',
                    name: resource,
                    callback: callback,
                    args: args
                }
            }));
        }
        else{
            Penguin.game.executeFunctionByName(callback, Penguin.game ,player.Resources[resource].getProperty('currentCount'));;
        }
    };
    
    public.UpdatePerTick = function(player, resource, count){
        if(typeof player === 'undefined'){
            player = game.Player;
        }
        
        //console.log(count);
        if(game.useWorker){
            var args = {
                callFunction: 'updateResource',
                args: {
                    type: 'perTick',
                    name: resource,
                    value: count
                }
            };
            
            //console.log(args);
            
            game.worker.postMessage(JSON.stringify(args));
        }
        else{
            player.Resources[resource].UpdateCurrentCount(count);
        }
    };
    
    public.PurchaseAvailable = function(player, resource){
        if(typeof player === 'undefined'){
            player = game.Player;
        }
        //console.log(Penguin.Game);
        return Penguin.Game.Tiles[resource].prototype.PurchaseAvailable(player);
    };
    
    return public;
})();

*/

//console.log(Penguin.Game);
    




