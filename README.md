jsIntercept
===========

Javascript library for intercepting function calls and piggybacking

This library can do two things,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Intercept function calls.<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Piggyback function calls.<br/>

Intercept function calls
------------------------
Sometimes you might want to execute a piece of code before a function gets executed. But you might not want to write your code inside the function.

Let's say you have a method named 'division' whose calls you would like to intercept. To intercept calls, pass the interceptor as an anonymous function to the library's 'intercept' method.

The interceptor gets executed before the actual method and if the interceptor returns 'true', the actual method is executed. If the interceptor returns anything else, the actual method is not executed.

```
var division = function(numerator, denominator) {
    return numerator / denominator;
}

division = division.intercept(function(numerator, denominator) {
    if (denominator == 0) {
        throw "denominator cannot be 0";
    } else if (denominator > numerator) {
        console.log("Output will be less than 1. Aborting operation..");
        return false;
    }
    return true;
});
```

The following function call would return '2'
```
division(10,5);
```

The following function calls would return 'undefined'
```
division(5, 10);
division(10, 0);
```


Piggyback function calls
------------------------
Piggyback function gets executed after the actual function gets executed. This is useful if you want to do some cleanup after the actual action is complete.

Simply pass the piggyback function as an anonymous function to the library's 'piggyback' method. The piggyback function is passed the output of the actual method, which could be useful while doing cleanup/housekeeping operation.

```
var division = function(numerator, denominator) {
    return numerator / denominator;
}

division = division.piggyback(function(numerator, denominator, output) {
    console.log("numerator ", numerator, "denominator ", denominator, "output ", output);
});
```
The following function call would print "numerator 10 denominator 5 output 2" in the console,
```
division(10,5);
```
