/*--- LINEAR SEARCH O(n) ---*/

//--- given an array of numbers and a target number, return the index of the target number in the array
// the linear search algorithm is a simple algorithm that checks each element of the array in order
// if the target number is found, the algorithm returns its index
// if the target number is not found, the algorithm returns -1

function linear_search(array, target){
   
    for(let i = 0; i < array.length; i++){
        if(array[i] === target) return i;
    }
    return -1;
   
    /*
    if(array.indexOf(target) !== -1) return array.indexOf(target);
   return -1;
   */
}


console.log("LINEAR SEARCH [-5, 2, 10, 4, 6]: ", linear_search([-5, 2, 10, 4, 6], 10)); // returns 2
console.log("LINEAR SEARCH [-5, 2, 10, 4, 6]: ", linear_search([-5, 2, 10, 4, 6], 6)); // returns 4
console.log("LINEAR SEARCH [-5, 2, 10, 4, 6]: ", linear_search([-5, 2, 10, 4, 6], 20)); // returns -1


/*--- BINARY SEARCH O(log n) ---*/

//--- given a SORTED array of numbers and a target number, return the index of the target number in the array
// the binary search algorithm is a more efficient algorithm than the linear search algorithm
// it works by repeatedly dividing the search space in half until the target number is found or the search space is empty
// the binary search algorithm is more efficient than the linear search algorithm because it reduces the search space in half at each step


function binary_search(array, target){
    if(array.length === 0) return -1;
    //pointers
    let left = 0; //start of the array
    let right = array.length - 1; //end of the array
 
    //while the aray is not empty
    while(left <= right){
        //find the middle index
        let middle = Math.floor((left + right) / 2);
        if(array[middle] === target) return middle;
        //if the target number is less than the middle number, update the right pointer
        if(target < array[middle]) right = middle - 1; // move pointer to the left
        //if the target number is greater than the middle number, update the left pointer
        else left = middle + 1; // move pointer to the right
    }
   
    return -1;
}
    
console.log("BINARY SEARCH [-5, 2, 4, 6, 10]: ", binary_search([-5, 2, 4, 6, 10], 10)); // returns 4
console.log("BINARY SEARCH [-5, 2, 4, 6, 10]: ", binary_search([-5, 2, 4, 6, 10], 6)); // returns 3
console.log("BINARY SEARCH [-5, 2, 4, 6, 10]: ", binary_search([-5, 2, 4, 6, 10], 20)); // returns -1


/*--- BINARY SEARCH RECURSIVE O(log n)---*/

function binary_search_recursive(array, target){
   return search(array, target, 0, array.length - 1);
}


function search(array, target, left, right){
    if(left > right) return -1; // no more elements to search
    //calculate the middle index
    let middle = Math.floor((left + right) / 2);
    if(array[middle] === target) return middle; // target found

    if(target < array[middle]) {
        return search(array, target, left, middle - 1); // target is less than the middle element, search the left half
    }else{
        return search(array, target, middle + 1, right); // target is greater than the middle element, search the right half 
    }
}

console.log("BINARY SEARCH RECURSIVE [-5, 2, 4, 6, 10]: ", binary_search([-5, 2, 4, 6, 10], 10)); // returns 4
console.log("BINARY SEARCH RECURSIVE [-5, 2, 4, 6, 10]: ", binary_search([-5, 2, 4, 6, 10], 6)); // returns 3
console.log("BINARY SEARCH RECURSIVE [-5, 2, 4, 6, 10]: ", binary_search([-5, 2, 4, 6, 10], 20)); // returns -1
