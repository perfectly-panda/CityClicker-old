var Penguin = Penguin || {};

Penguin.Player = {};

Penguin.Player.Model = function(args) {  
    self = this;
    
    this.Resources = {};
};

Penguin.Player.Model.prototype = {
    InitPlayer: function(args){
        
       if(typeof args.Resources !== 'undefined'){
           $.each(args.Resources, function(key, value){
               var temp = new value();
                self.Resources[temp.GetProperty("name")] = temp;
            });
       } 
    }
};


