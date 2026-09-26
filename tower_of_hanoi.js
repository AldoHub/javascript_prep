/*--- TOWER OF HANOI O(2^n) ---*/

function TowerOfHanoi(n, from, to, aux) {
    if (n === 1) {
        //if its just one disk, move it from source to destination
        console.log(`Move disk 1 from ${from} to ${to}`);
        return;
    }

    TowerOfHanoi(n - 1, from, aux, to);
    console.log(`Move disk ${n} from ${from} to ${to}`);
    TowerOfHanoi(n - 1, aux, to, from);
    
}


console.log(TowerOfHanoi(3, 'A', 'B', 'C'));