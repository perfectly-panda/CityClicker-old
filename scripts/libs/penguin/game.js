define([], function () {

    //function scopes
    var public = {};
    var hidden = {};
    var api = {};

    self = this;

    //private variables
    allowedComponents = ["test", "layout", "afterLoad", "gameLoop"];
    requiredComponents = [];
    loadedComponents = [];
    loadingComplete = false;
    keys = {};
    notification = {};

    //public variables
    public.version = '0.0.1';

    //private functions

    validateKey = function (key) {
        for (var item in keys) {
            if (keys[item].receive === key) {
                return true;
            }
        }
        return false;
    };

    //protected functions
    hidden.protectedTest = function (args, callback) {
        return callback();
    };

    //api functions
    api.notify = function (args) {
        if (typeof args === 'undefined'
            || typeof args.module === 'undefined'
            || typeof args.event === 'undefined') {
            throw new CustomError("missing arguments");
        }
        if (typeof notification[args.module] === 'undefined') {
            notification[args.module] = {};
        }
        if (typeof notification[args.module][args.event] === 'undefined') {
            notification[args.module][args.event] = [];
        }

        if (typeof notification[args.module][args.event][0] == 'function') {
            return notification[args.module][args.event][0](args.args, 0, notification[args.module][args.event]);
        }
    };

    api.registerNotification = function (args) {
        if (typeof args === 'undefined'
            || typeof args.module !== 'string'
            || typeof args.event !== 'string'
            || typeof args.callback !== 'function') {
            throw new CustomError("missing arguments");
        }

        if (typeof notification[args.module] === 'undefined') {
            notification[args.module] = {};
        }
        if (typeof notification[args.module][args.event] === 'undefined') {
            notification[args.module][args.event] = [];
        }

        notification[args.module][args.event].push(args.callback);

        return true;
    };

    api.returnCallback = function (args, callback) {
        return callback();
    };

    api.checkModule = function (args) {
        if (typeof args === 'undefined' || args === null) {
            throw new CustomError("no arguments sent");
        }
        if (typeof args !== 'string') {
            throw new CustomError("argument wrong type: expected string");
        }


        if (loadedComponents.indexOf(args.toString().toLowerCase()) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };



    //public functions
    public.api = function (args) {

        //test to ensure we have been passed the required function
        if (typeof args === 'undefined') {
            throw new CustomError("no arguments sent");
        }
        if (typeof args.func === 'undefined') {
            throw new CustomError("missing required argument: func");
        }
        if (typeof args.func !== 'string') {
            throw new CustomError("argument wrong type: func, expected: string, received: " + typeof args.func);
        }
        if (typeof api[args.func] === 'undefined' && typeof args.key === 'undefined') {
            throw new CustomError("function does not exist");
        }

        if (typeof args.key === 'undefined') {
            return api[args.func](args.args, args.callback);
        }
        else if (typeof args.key !== 'string') {
            throw new CustomError("key value not valid");
        } else {
            if (validateKey(args.key)) {
                if (typeof api[args.func] !== 'undefined') {
                    return api[args.func](args.args, args.callback);
                }
                else {
                    return hidden[args.func](args.args, args.callback);
                }
            }
            else {
                throw new CustomError("key value not valid");
            }
        }
    };

    public.makeid = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    public.register = function (component, returnKey) {
        if (allowedComponents.indexOf(component) < 0 || loadingComplete == true) {
            throw new CustomError("registration not allowed");
        }
        else {
            if (loadedComponents.indexOf(component.toString().toLowerCase()) < 0) {
                loadedComponents.push(component.toString().toLowerCase());
            }
            if (typeof keys[component] === 'undefined') {
                var id = public.makeid();
                keys[component] = {};

                keys[component].receive = id;
                keys[component].send = returnKey;
                return id;
            } else {
                throw new CustomError("registration not allowed");
            }
        }
    };

    public.getManagers = function () {
        return managers;
    };

    public.start = function () {

    };

    public.stop = function () {

    };

    return public;
});

function CustomError(message) {
    this.message = message;
}

CustomError.prototype.toString = function () {
    return this.message;
};


/*Penguin.Game = (function ($){
    var self = this;
    var public = {};
    var can_run=0;
    
    public.useWorker = true;
    
    public.worker = null;
    
    var Modules = ["Resource", "Player", "Tile", "Layout"];
    
    public.ModulesLoaded = {};    
    public.Resources = {};
    public.Player = {};
    public.Tiles = {};
    public.Layout = {};
    
    checkModule = function(module){
        if(typeof Penguin[module] !== 'undefined'){
            public.ModulesLoaded[module] = true;
        }
        else{
            public.ModulesLoaded[module] = false;
        }
    };
    
    CheckLoadedModules = function(){
        for(var i = 0; i < Modules.length; i++){
            self.checkModule(Modules[i]);
        }
    };
     
    CreateResources = function (){
        var json = null;
        $.when(
            $.getJSON('js/libs/penguin/data/resources.json', function(data){
                json = data["resources"];
                $.each(json, function(index, value){
                    public.Resources[index] = function(args){
                       Penguin.Resource.Model.apply(this, [value.args]); 
                    }
                    
                    public.Resources[index].prototype = Object.create(Penguin.Resource.Model.prototype);
                    
                    $.each(value.prototype, function(name, func){
                        if(func.eval === "true"){
                            public.Resources[index].prototype[name] = new Function([func.args], func.body);
                        }else {
                            public.Resources[index].prototype[name] = func.body;
                        }
                    });
                    
                    public.Resources[index].prototype.constructor = public.Resources[index];
                });
            })).then( function(){can_run++;}
        );
    };
    
    CreateTiles = function (){
        var json = null;
        $.when(
            $.getJSON('js/libs/penguin/data/tiles.json', function(data){
                json = data["tiles"];
                $.each(json, function(index, value){
                    public.Tiles[index] = function(args){
                       Penguin.Tile.Model.apply(this, [value.args]); 
                    }
                    
                    public.Tiles[index].prototype = Object.create(Penguin.Tile.Model.prototype);
                    
                    $.each(value.prototype, function(name, func){
                        if(func.eval === "true"){
                            public.Tiles[index].prototype[name] = new Function([func.args], func.body);
                        }else {
                            public.Tiles[index].prototype[name] = func.body;
                        }
                    });
                    
                    public.Tiles[index].prototype.constructor = public.Tiles[index];
                });
            })).then( function(){can_run++;}
        );
    }
    
    AddLayout = function(){
        public.Layout = Penguin.Layout;
        
        //create initial tiles
        for(var i = 0; i < public.Layout.width; i++){
            for(var j = 0; j < public.Layout.height; j++){
                if(!public.Layout.layout[i]){
                    public.Layout.layout[i] = [];
                }
                public.Layout.layout[i][j] = new public.Tiles.BlankTile();
                public.Layout.layout[i][j].SetPos(i,j);
            }
        }
    };
    
    AddPlayer = function() {
        public.Player = new Penguin.Player.Model();
        
        public.Player.InitPlayer({Resources: public.Resources});
        
        if(public.useWorker){
            $.each(game.Player.Resources, function(key, value){
                public.worker.postMessage(JSON.stringify({callFunction: 'createResource',
                    args:{
                        name: key,
                        currentCount: value.GetProperty('currentCount'),
                        maxCount: value.GetProperty('maxCount'),
                        perTick: value.GetProperty('perTick'),
                        increment: value.GetProperty('increment')
                    }
                }));
            });
        }
        
         Penguin.ResourceManager.UpdateCount(self, 'Cash', 100);
    };
    
    public.UpdateGraphics = function(){
        $.each(game.Layout.layout, function(element) {
            $.each(game.Layout.layout[element], function(iElement){
                var name = "x" + game.Layout.layout[element][iElement].GetProperty("posX") 
                        + "y" + game.Layout.layout[element][iElement].GetProperty("posY");
                $("#playground").playground().addSprite("sprite"+name,{
                    posx: game.Layout.tileWidth * game.Layout.layout[element][iElement].GetProperty("posX"),
                    posy: game.Layout.tileHeight * game.Layout.layout[element][iElement].GetProperty("posY"),
                    animation: game.Layout.layout[element][iElement].GetAnimation()
                });
                $(document).off("click", "#sprite"+name);
                $(document).on("click", "#sprite"+name,function(){
                    game.Layout.ClickEvent(element,iElement);
                });
            });
        });
    };
    
    wait_until_can_run = function() {
        if (can_run===2) {
            if (public.ModulesLoaded.Layout){
                self.AddLayout();
            }
            if (public.ModulesLoaded.Player){
                self.AddPlayer();
            }
            
            //var worker = new Worker('worker.js');
            //worker.postMessage(self);
            
            $(function(){
                if(public.useWorker){
                        public.worker.postMessage(JSON.stringify({callFunction: 'startTick'}));
                }
                
                Penguin.Game.Layout.CreatePurchaseOptions();
                
                $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH});

                $("#playground").playground().registerCallback(function(){
                    //update resources
                    if(!public.useWorker){
                        $.each(game.Player.Resources, function(key, value){
                            if(value.GetProperty("increment")){
                                value.RunTick();
                            }
                        });
                    }
                    
                    
                    public.Layout.SendUpdateResources();
                    public.Layout.SendPurchaseOptions();
                    public.Layout.CheckExpansion(game.Player);

                    //game.Layout.UpdatePurchaseOptions(game.Player);

                    //update graphics
                    //UpdateGraphics();
                },1);


                $("#playground").playground().startGame(function(){
                    public.UpdateGraphics();
                });

                public.Layout.ResourceEvent("Cash", "100");
                public.Layout.ResourceEvent("Water", "0");

                $("#Purchase").click(function(){game.Layout.PurchaseEvent(game.Player)});
            });
        } else {
            window.setTimeout(function(){wait_until_can_run()},100);
        }
    };
        
    load_json_objects = function() {
        if (public.ModulesLoaded.Resource){
            self.CreateResources();
        }
        else{
            can_run++;
        }
        
        if (public.ModulesLoaded.Tile){
            self.CreateTiles();
        }
        else{
            can_run++;
        }
    };
    
    public.executeFunctionByName = function(functionName, context , arguments) {
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, [arguments]);
    };
    
    workerCallback = function(result){
        //console.log(result);
        var message = JSON.parse(result);
        public.executeFunctionByName(message.callback, Penguin.Game ,message);
    }
    
    public.InitGame = function(){
        if(public.useWorker){
            public.worker = new Worker('js/libs/penguin/worker.js');

            public.worker.onmessage = function(result){
                //console.log(result);
                self.workerCallback(result.data);
            };
        }
        self.CheckLoadedModules();
       
        load_json_objects();
       
        wait_until_can_run();
    };
    
    return public;
})(jQuery); */

