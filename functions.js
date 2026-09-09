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



    //create a function which stores inside a secret word which cannot be changed or access outside (CLOSURE)
    const someFn = () => {
        const secret = 'secretword'; 

        return () => secret;
    }

    const getSecret = someFn();
    console.log(getSecret()); //secretword


    //CLONE OBJECT WITHOUT MUTATING THE ORIGINAL OBJECT

    let obj = {a: 1, b: 2};
    let clone = Object.assign({}, obj);
    let clone2 = {...obj};
    clone2.c = 'tst';

    console.log(obj, clone, clone2);

    //COUNT VOWELS
    const findVowels = (str) => {
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        return str.toLowerCase().split('').reduce((acc, char) => {
           return vowels.includes(char) ? acc + 1 : acc;
        }, 0);


    }

    console.log(findVowels('hello'));
    console.log(findVowels('hello world'));
    console.log(findVowels('addgregwoooqwertyuiop'));
  

    //REVERSE EACH WORD IN A SENTENCE
    const toReverse = "welcome to this javascript course";
    const reverseString = (str) => {
        return str.split(' ').reverse().join(' ');
    }

    console.log(reverseString(toReverse));

    //DEFINE A FUNCTION THAT TAKES AN ARRAY OF STRINGS AND RETURNS THE MOST COMMONLY OCCURING WORD

    const mostFrequent = (arr) => { 
        const mapping= arr.reduce((acc, el) => {
            acc[el] = acc[el] ? acc[el] + 1 : 1;
            return acc;
        }, {});

        return Object.entries(mapping).reduce(
            (acc, el) => (acc[1] > el[1] ? acc : el),
            [null, 0]
        )[0];
    }

    console.log(mostFrequent(["a", "b", "c", "a", "b", "c", "a"]));


    //remove the minimum number of parentheses from a string
    const removeMinParens = (str) => {
        const chars = str.split(''); //split the string into an array of characters
        const stack = []; //create an empty stack

        for(let i = 0; i < chars.length; i++) {
            if(chars[i] === '(') {
                stack.push(i); //push the character index to the stack
                console.log(stack);
            } else if(chars[i] === ')') {
                
                if(stack.length === 0) {
                    chars[i] = ''; //if the stack is empty, replace the character with an empty string
                } else {
                    stack.pop(); //otherwise, pop the last character from the stack
                    
                }
                
            }
        }

        
        while(stack.length > 0) {
           chars[stack.pop()] = ''; //pop the last character from the stack and replace it with an empty string
        }
            

        return chars.join(''); //join the array back into a string

    }


    console.log(removeMinParens('lee(t(c)o)de)'));
    console.log(removeMinParens('))(('));
    console.log(removeMinParens('a)b(c)d'));
});