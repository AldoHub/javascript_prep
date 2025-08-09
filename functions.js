document.addEventListener("DOMContentLoaded", function(){
    
    //1. RUN ONLY ONCE FUNCTION WRAPPER
    function runOnce(func, context) {
        let ran;

        return function(){
            if(func) {
                ran = func.apply(context || this, arguments);
                func = null;
            }

            return ran;
        }
    }

    //1.1 APPLY THE WRAPPER TO THE DESIRED FUNCTION
    const hello =  runOnce((a, b) => {
        console.log("hello: ", a + b);
    });

    hello(1, 2);
    hello(1, 2);
    hello(1, 2);
    hello(1, 2);


    // 2. CACHING/MEMOIZATION FUNCTION

    // 2.1 HIGH PERFORMANCE FUNCTION/TASK
    const clumsyProduct = (num1, num2) => { 
        for(let i = 1; i <= 100000000; i++){ }
        return num1 * num2;
    }


    // 2.2 MEMOIZATION FUNCTION
    function memoize(func, context) {
        const res = {}; //cache variable
        return function(...args) {
            var argsCache = JSON.stringify(args);
            //if the object contains the args already
            if (!res[argsCache]) {
                //save the response from the function call
                res[argsCache] = func.call(context || this, ...args);
            }
            //return the cached value
            return res[argsCache];
            
        }
    }

    //2.3 USE THE MEMOIZATION FUNCTION
    const clumsyProductMemoized = memoize(clumsyProduct);
   
    console.time("clumsyProductMemoized");
    clumsyProductMemoized(9989, 2342);
    console.timeEnd("clumsyProductMemoized");

    //on new call will be faster due the cache response
    console.time("clumsyProductMemoized2");
    clumsyProductMemoized(9989, 2342);
    console.timeEnd("clumsyProductMemoized2");




    // 3. CURRYING FUNCTION

    function curry(a) {
        return function (b) {
           return a + b;
        }
    }

    // 3.1 USE THE CURRYING FUNCTION
    console.log("REGULAR CURRYING: ", curry(5)(7))



    // 4. INFINITE CURRYING FUNCTION

    function add(a){
        return function (b) {
           //Check if there is a new argument
           if(b) return add(a + b); 
           else return a;
        }
    }

    console.log("INFINITE CURRYING: ", add(5)(7)(9)(1)())



    // 5. RETURN A CURRYING FUNCTION FROM AN EXISTING FUNCTION
    function curryFactory(func) {
        return function curriedFunc(...args) {

            console.log("ARGS: ", args, "ARGS_LENGTH: ", args.length, "FUNC LENGTH: ", func.length);

            if(args.length >= func.length) {
                return func(...args);
            } else {
                return function(...next) {
                    return curriedFunc(...args, ...next);
                }
            }
        }
    }

    // 5.1 WRAP THE FUNCTION TO RETURN A CURRYING FUNCTION
    const sum = (a, b, c, d) => a + b + c + d;
    let curriedSum = curryFactory(sum);
    console.log("RETURN CURRYING FUNCTION: ", curriedSum(1)(2)(3)(4))

});