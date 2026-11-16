
// given a string, return a new string with the reversed order of chars

function reverseString(str) {
    let reversed = '';
    for(let char of str){
        reversed = char + reversed;
    }

    return reversed;
}


console.log("REVERSE STRING: -----", reverseString('something'));



// given a string, return the character that is most commonly used 

function maxChar(str) {
    const charMap = {}
    let max = 0;
    let maxChar = '';
    for(let char of str){
        charMap[char] = charMap[char] + 1 || 1 
    }

    for(let key in charMap){
        if(charMap[key] > max){
            max = charMap[key]
            maxChar = key;
        }
    }

    return maxChar;
}


console.log("MAX CHAR: ", maxChar("abcccccccd"));


// given an array and chunk size, divide the array into many subarrays

function chunkArr(array, chunkSize) {
   const result = [];
   let index = 0;
   while(index < array.length){
    result.push(array.slice(index, index + chunkSize));
    index += chunkSize;
   } 
   return result;
}


console.log("CHINKING ARRAY: ", chunkArr([1, 2, 3, 4, 5, 6, 7, 8], 3));


// write a function that accepts a string. The function should capitalize the first letter of each word in the string
// then return the capitalized string

function capitalizeString(str){
    const words = str.split(' ');
    return words.map( word => word[0].toUpperCase() + word.slice(1)).join(" ");
}


console.log("CAPITALIZE STRING: ", capitalizeString("this is a test string"))

// check to see if two provided strings are anagrams of eachother.
// one string is an anagram if another if it uses the same characters
// in the sams quantity. Only consider characters, not spances or punctuation. 


function buildCharMap(str){
    //build the Char Map for each string
    const charMap = {}
    _string = str.toLowerCase().replace(/[\W]/g, '');
    for (let char of _string){
        charMap[char] = charMap[char] + 1 || 1
    }
    return _string;
}

function isAnagram(stringA, stringB) {
  
    const charMapA = buildCharMap(stringA);
    const charMapB = buildCharMap(stringB);

    //compare each chars map
    if(Object.keys(charMapA).length !== Object.keys(charMapB).length) {
        return false;
    }

    for(let key in charMapA){
        if(charMapA[key] !== charMapB[key] ){
            return false;
        }
    }     

    return true;

}


console.log("ANAGRAMS: ", isAnagram('RAIL! SAFETY!', 'fairy tales'));


function isAnagram2(stringA, stringB){
   return cleanStr(stringA) === cleanStr(stringB)
}

function cleanStr(str){
  return str.toLowerCase().replace(/[\W]/g, '').split('').sort('').join('');
}


// write a function that returns the number of vowels used in a string

function vowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0
}

console.log("FIND VOWELS NUMBER: ", vowels('Coding Money'));


//write a program that console logs the numbers from 1 to n.
//but for multiples of 3, print "fizz" instead of the number and for the multiples
//of 5 print "buzz". For numbers which are multiples of both print "fizzbuzz"

function fizzBuzz(n){
    for(let i =1; i<=n; i++){
        if(i % 3 === 0 && i % 5 === 0){
            console.log('fizzbuzz');
        }else if(i % 3 === 0){
            console.log('fizz');
        }else if(i % 5 === 0){
            console.log('buzz');
        }else{
            console.log(i)
        }
    }
}


//console.log("FIZZBUZZ: ", fizzBuzz(5)); 


//write a function that accepts a positive number N.
//the function should console log a step shape with N levels
//using the character #

function steps(n){
    //the number of rows matches the number of iterations the columns need to do
    for (let row = 1; row <= n; row++) {
    let stair = "";

    for (let column = 1; column <= row; column++) {
      stair += "#";
    }

    console.log(stair);
  }
}

steps(3);

function stepsRecursion(n, row = 1) {
  if (row > n) return;

  console.log("#".repeat(row));

  steps(n, row + 1);
}

stepsRecursion(6)

function pyramid(n) {
  for (let row = 1; row <= n; row++) {
    let level = "";

    // Add leading spaces
    for (let space = 0; space < n - row; space++) {
      level += " ";
    }

    // Add pyramid characters
    for (let column = 0; column < (2 * row - 1); column++) {
      level += "#";
    }

    console.log(level);
  }
}

pyramid(5);