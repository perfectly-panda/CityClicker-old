var Resources = (function(){
    self = this;
    public = {};
    
    public.Run = true;
    
    public.resources = [];
    
    
    public.Create = function(args){
        public.resources[args.name] = {
            currentCount: args.currentCount || 0,
            maxCount: args.maxCount || -1,
            perTick: args.perTick || 0,
            increment: args.increment || false,
            RunTick: function (){
                if (public.resources[args.name].increment){
                    //console.log("runTick");
                    public.resources[args.name].UpdateCurrentCount(public.resources[args.name].perTick);
                }
            },
            UpdateCurrentCount: function(c){
                //console.log(c);
                tempCount = public.resources[args.name].currentCount + c;

                if(public.resources[args.name].maxCount === -1 || public.resources[args.name].maxCount >= tempCount){
                    public.resources[args.name].currentCount = tempCount;
                }
                else{
                    public.resources[args.name].currentCount = public.resources[args.name].maxCount;
                }
            },
            UpdateMaxCount: function(c){public.resources[args.name].maxCount = parseFloat(public.resources[args.name].maxCount) + parseFloat(c);},
            UpdatePerTick: function(c){public.resources[args.name].perTick = parseFloat(public.resources[args.name].perTick) + parseFloat(c);}
        }
    };
    
    public.Update = function(args){
        switch(args.type){
            case 'value':
                public.resources[args.name][args.property] = args.value;
                break;
            case 'function':
                public.resources[args.name][args.property] = new Function([args.args],args.function);
                break;
            case 'currentCount':
                public.resources[args.name].UpdateCurrentCount(args.value);
                break;
            case 'perTick':
                public.resources[args.name].UpdatePerTick(args.value);
                break;
        }
    };
    
    public.GetValue = function(args){
        //console.log(args);
        
        var reply = {
            name: args.name,
            property: args.property,
            value: public.resources[args.name][args.property],
            args: args.args,
            callback: args.callback
        };
        
        //console.log(reply);
        
        postMessage(JSON.stringify(reply));
    };
    
    public.GetValues = function(args){
        //console.log(args);
        var reply = {
            name: args.name,
            property: args.property,
            value: [],
            args: args.args,
            callback: args.callback
        };
        
        for(var i = 0; i < args.name.length; i++){
            //console.log(args.property);
            reply.value.push(public.resources[args.name[i]][args.property]);
        }
       
        
        postMessage(JSON.stringify(reply));
    };
    
    public.GetResourceUpdate = function(args){
        var reply = {
            name: args.name,
            currentCount: public.resources[args.name].currentCount,
            perTick: public.resources[args.name].perTick,
            callback: 'Layout.ReceiveUpdateResources'
        };
        //console.log(reply);
        postMessage(JSON.stringify(reply));
    }
    
    return public;
})();

function RunTicks(){
   // console.log(Resources.Run);
    if(Resources.Run){
        //console.log(Resources.resources.Cash);
        for(var resource in Resources.resources){
            //console.log(resource);
            if(Resources.resources[resource].increment){
                //console.log(Resources.resources[resource]);
                Resources.resources[resource].RunTick();
            }
        }
    
        setTimeout(RunTicks,100);
    }
}

onmessage = function(e) {
    //console.log(e.data);
    var message = JSON.parse(e.data);
    switch(message.callFunction){
        case 'createResource':
            Resources.Create(message.args);
            break;
        case 'updateResource':
            Resources.Update(message.args);
            break;
        case 'resourceValue':
            Resources.GetValue(message.args);
            break;
        case 'resourceValues':
            //console.log("received values");
            Resources.GetValues(message.args);
            break;
        case 'resourceUpdate':
            Resources.GetResourceUpdate(message.args);
            break;
        case 'startTick':
            Resources.Run = false;
            setTimeout(function(){Resources.Run = true; RunTicks();},200);
            break;
        case 'stopTick':
            Resources.Run = false;
            break;
        default: break;
    };
}

