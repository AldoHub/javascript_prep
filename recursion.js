
// RECURSION 
// a function that call itself until a base case is met - solves a smaller version of the same problem each time

//fibonacci
// 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610

function fibonacci(n) {
    //when we get to the number 1, start unfolding the rest of the functions
    if(n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(10)); //output 55