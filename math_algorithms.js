/*---- FIBONNACCI SEQUENCE O(n) ----*/

//--- given a numero n, return the first 'n' elements of the fibonnacci sequence
// the fibonnacci sequence is a sequence of numbers where each number is the sum of the previous two numbers
function fibonnacci_sequence(n){
    let fib = [0, 1];
    //since the first two elements are already in the array, we start at index 2
    for(let i = 2; i < n; i++){
        fib.push(fib[i-1] + fib[i-2]);
    }
    return fib;
}

console.log("FIBONACCI 2: ", fibonnacci_sequence(2)); // returns [0, 1]
console.log("FIBONACCI 3: ", fibonnacci_sequence(3)); // returns [0, 1, 1]
console.log("FIBONACCI 7: ", fibonnacci_sequence(7)); // returns [0, 1, 1, 2, 3, 5, 8]



/*---- FACTORIAL O(n) ----*/

//--- given an integer n, find the factorial of n
// the factorial of a number is the product of all the integers from 1 to n
// factorial of 0 is 1
// factorial formula: n! = n * (n-1) * (n-2) * ... * 1
function factorial(n){
    if(n === 0) return 1;
    let factorial = 1;
    for(let i = 1; i <= n; i++){
        //on each iteration, multiply the current number by the factorial of the previous number
        factorial *= i;
    }
    return factorial;
}

console.log("FACTORIAL 0: ", factorial(0)); // returns 1
console.log("FACTORIAL 1: ", factorial(1)); // returns 1
console.log("FACTORIAL 2: ", factorial(2)); // returns 2
console.log("FACTORIAL 3: ", factorial(3)); // returns 6
console.log("FACTORIAL 4: ", factorial(4)); // returns 24
console.log("FACTORIAL 5: ", factorial(5)); // returns 120
console.log("FACTORIAL 6: ", factorial(6)); // returns 720


/*---- PRIME NUMBER O(sqr(n)) ----*/

//--- given an integer n, return true if n is a prime number
// a prime number is a number that is only divisible by 1 and itself
function is_prime(n){
    if (n < 2) return false;
    // Check divisibility from 2 to n-1
    for(let i = 2; i <= Math.sqrt(n); i++){
        if(n % i === 0) return false;
    }
    return true;

}


console.log("IS PRIME 1: ", is_prime(1)); // returns false
console.log("IS PRIME 5: ", is_prime(5)); // returns true
console.log("IS PRIME 4: ", is_prime(4)); // returns false


/*---- POWER OF TWO O(log(n)) ----*/

//--- given an integer n, return true if n is a power of two

function is_power_of_two(n){
    if(n < 1) return false;
    if(n === 1) return true;

    while(n > 1){
        if(n % 2 !== 0) return false;
        n = Math.floor(n / 2);
    }
    return true;

}

// bitwise version O(1)
function is_power_of_two_bitwise(n){
    if(n < 1) return false;
    return (n & (n - 1)) === 0;
}


console.log("IS POWER OF TWO 1: ", is_power_of_two(1)); // returns true
console.log("IS POWER OF TWO 2: ", is_power_of_two(2)); // returns true
console.log("IS POWER OF TWO 5: ", is_power_of_two(5)); // returns false


/*---- RECURSION FIBONACCI O(2^n) - bad performance ----*/

function recursive_fibonnacci(n){
    if(n === 0) return 0;
    if(n === 1) return 1;
    return recursive_fibonnacci(n-1) + recursive_fibonnacci(n-2);
}

console.log("RECURSIVE FIBONACCI 2: ", recursive_fibonnacci(2)); // returns 1
console.log("RECURSIVE FIBONACCI 3: ", recursive_fibonnacci(3)); // returns 2
console.log("RECURSIVE FIBONACCI 7: ", recursive_fibonnacci(7)); // returns 13


/*---- RECURSION FACTORIAL O(n) ----*/

function recursive_factorial(n){
    if(n === 0) return 1;
    return n * recursive_factorial(n-1);
}

console.log("RECURSIVE FACTORIAL 0: ", recursive_factorial(0)); // returns 1
console.log("RECURSIVE FACTORIAL 1: ", recursive_factorial(1)); // returns 1
console.log("RECURSIVE FACTORIAL 5: ", recursive_factorial(5)); // returns 120