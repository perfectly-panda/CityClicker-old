define(["models/Base"], function(Model){
     
    var Resources = function () {

        Model.apply(this, arguments);
    }

    Resources.prototype = Model.prototype;

    return Resources;
    
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
    




