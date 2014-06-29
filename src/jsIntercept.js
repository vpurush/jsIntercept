(function(){
    Function.prototype.intercept = function(interceptor){
        var originalMethod = this;
        return function() {
            if(interceptor.apply(this, arguments)){
                return originalMethod.apply(this, arguments);
            }else{
                //do nothing;
            }
        };
    }
    Function.prototype.piggyback = function(piggybackMethod){
        var originalMethod = this;
        return function() {
            var output = originalMethod.apply(this, arguments);
            var arg = [];
            arg.push.apply(arg, arguments);
            arg = arg.concat(output);
            piggybackMethod.apply(this, arg);
            return output;
        };
    }
})();
