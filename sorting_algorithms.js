/*--- BUBBLE SORT O(n^2) ---*/

//--- given an array of numbers, sort the array in ascending order using the bubble sort algorithm
// the bubble sort algorithm works by repeatedly swapping adjacent elements if they are in the wrong order
// the algorithm continues to iterate until no more swaps are needed, which indicates that the array is sorted
// the bubble sort algorithm is not efficient for large arrays because it requires multiple passes through the array
// the bubble sort algorithm is not efficient for small arrays because it requires a large number of passes through the array

function bubble_sort(array){
    let swapped;
    do{
        swapped = false;
        for(let i = 0; i < array.length - 1; i++){
            //swap
            if(array[i] > array[i + 1]){
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    } while(swapped);
    return array;
    
}

console.log("BUBBLE SORT [8, 20, -2, 4, 6]: ", bubble_sort([8, 20, -2, 4, 6])); // returns [-2, 4, 6, 8, 20]


/*--- INSERTION SORT  O(n^2) ---*/

//--- given an array of numbers, sort the array in ascending order
// the insertion sort algorithm works by repeatedly inserting an element from the unsorted part of the array into its correct position in the sorted part of the array
// the algorithm continues to iterate until no more elements are inserted, which indicates that the array is sorted

function insertion_sort(array){
  //start on the second element - index 1
  for(let i = 1; i < array.length; i++){
      //save the current element
      let current = array[i];
      //start at the previous element -- index i - 1
      let j = i - 1;
      //while the element is bigger than the previous element
      while(j >= 0 && array[j] > current){
        array[j + 1] = array[j];
        j = j - 1;
      }
      //insert the current element at the correct position
      array[j + 1] = current;
      
  }
  return array;
}

console.log("INSERTION SORT [8, 20, -2, 4, 6]: ", insertion_sort([8, 20, -2, 4, 6])); // returns [-2, 4, 6, 8, 20]


/*--- QUICK SORT - worst case (when array is already sorted) O(n^2) - average case O(n log n) ---*/

//--- given an array of integers, sort the array
// the quick sort algorithm works by selecting a pivot element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot
// the algorithm then recursively sorts the sub-arrays

function quick_sort(array){
    if(array.length < 2){
        return array;
    }
    //use the  last element as the pivot
    let pivot = array[array.length - 1];
    //create two empty arrays to store the left and right sub-arrays
    let left = [];
    let right = [];

    //traverse the array and partition it into two sub-arrays
    for(let i = 0; i < array.length - 1; i++){
        if(array[i] < pivot){
            left.push(array[i]);
        }else{
            right.push(array[i]);
        }
    }
    //recursively sort the left and right sub-arrays
    return [...quick_sort(left), pivot, ...quick_sort(right)];
}

console.log("QUICK SORT [8, 20, -2, 4, 6]: ", quick_sort([8, 20, -2, 4, 6])); // returns [-2, 4, 6, 8, 20]


/*--- MERGE SORT O(n log n) ---*/

//--- given an array of integers, sort the array
// the merge sort algorithm works by dividing the array into two halves, sorting each half recursively, and then merging the two sorted halves
// the algorithm continues to divide the array until it has only one element, which is the sorted array

function merge_sort(array){
    if(array.length < 2){
        return array;
    }
    //divide the array into two halves
    let left = array.slice(0, Math.floor(array.length / 2));
    let right = array.slice(Math.floor(array.length / 2));
    //recursively sort the left and right sub-arrays
    return merge(merge_sort(left), merge_sort(right));
}
   
function merge(left, right){
    let result = [];
    while(left.length && right.length){
        if(left[0] < right[0]){
            result.push(left.shift());
        }else{
            result.push(right.shift());
        }
    }
    result.push(...left);
    result.push(...right);
    return result;
}



console.log("MERGE SORT [8, 20, -2, 4, 6]: ", merge_sort([8, 20, -2, 4, 6])); // returns [-2, 4, 6, 8, 20]