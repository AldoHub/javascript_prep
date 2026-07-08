/*
---- Arrays y Strings
Two Sum — Usa un Map para guardar los números ya vistos junto con su índice. Por cada número, revisa si el complemento (target - número actual) ya existe en el mapa. Complejidad: O(n) tiempo, O(n) espacio.
Palíndromo — Limpia el string (quita espacios/símbolos, pasa a minúsculas) y compara si es igual a su versión invertida. Complejidad: O(n).
Anagrama — Ordena alfabéticamente ambos strings; si son anagramas, quedarán idénticos tras ordenarlos. Complejidad: O(n log n).
Máximo subarreglo (Kadane) — En cada posición decide si conviene extender el subarreglo actual o empezar uno nuevo desde ese punto, guardando siempre el máximo global. Complejidad: O(n).
*/

function twoSum(nums, target) {
    const vistos = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complemento = target - nums[i];
        if (vistos.has(complemento)) {
            return [vistos.get(complemento), i];
        }
        vistos.set(nums[i], i);
    }
}

// Two Sum
console.log(twoSum([2, 7, 11, 15], 9)); 
// [0, 1] -> porque nums[0] + nums[1] = 2 + 7 = 9


function esPalindromo(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return s === s.split('').reverse().join('');
}

// Palíndromo
console.log(esPalindromo("Anita lava la tina")); 
// true
console.log(esPalindromo("Hola mundo")); 
// false


function esAnagrama(s1, s2) {
    const normalizar = s => s.split('').sort().join('');
    return normalizar(s1) === normalizar(s2);
}

// Anagrama
console.log(esAnagrama("roma", "amor")); 
// true
console.log(esAnagrama("hola", "chao")); 
// false

function maxSubarray(nums) {
    let maxActual = nums[0];
    let maxGlobal = nums[0];
    for (let i = 1; i < nums.length; i++) {
        maxActual = Math.max(nums[i], maxActual + nums[i]);
        maxGlobal = Math.max(maxGlobal, maxActual);
    }
    return maxGlobal;
}


// Máximo subarreglo (Kadane)
console.log(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); 
// 6 -> el subarreglo [4, -1, 2, 1] suma 6

/*
---- Listas enlazadas
Invertir lista — Recorre la lista cambiando la dirección de cada puntero next, usando una variable prev para ir "arrastrando" el nuevo orden. Complejidad: O(n).
Detectar ciclo (Floyd) — Dos punteros avanzan a distinta velocidad (uno de a uno, otro de a dos). Si hay ciclo, eventualmente se encuentran; si no, el rápido llega a null. Complejidad: O(n) tiempo, O(1) espacio.
*/

class Node {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function invertir(head) {
    let prev = null;
    while (head) {
        const siguiente = head.next;
        head.next = prev;
        prev = head;
        head = siguiente;
    }
    return prev;
}

function tieneCiclo(head) {
    let lento = head;
    let rapido = head;
    while (rapido && rapido.next) {
        lento = lento.next;
        rapido = rapido.next.next;
        if (lento === rapido) {
            return true;
        }
    }
    return false;
}


// Crear lista: 1 -> 2 -> 3
const lista = new Node(1, new Node(2, new Node(3)));

// Invertir lista
const invertida = invertir(lista);
console.log(invertida.val, invertida.next.val, invertida.next.next.val); 
// 3 2 1

// Detectar ciclo
const a = new Node(1);
const b = new Node(2);
a.next = b;
b.next = a; // crea un ciclo
console.log(tieneCiclo(a)); 
// true

const sinCiclo = new Node(1, new Node(2, new Node(3)));
console.log(tieneCiclo(sinCiclo)); 
// false


/*
---- Árboles y Grafos
Recorrido in-order — Visita primero el subárbol izquierdo, luego el nodo actual, luego el derecho. Para un árbol de búsqueda binario, esto da los valores en orden ascendente.
Árbol balanceado — Calcula la altura de cada subárbol recursivamente. Si en algún punto la diferencia de alturas entre izquierda y derecha supera 1, se marca como no balanceado usando -1 como señal de "ya falló".
Number of Islands — Recorre la matriz; cada vez que encuentra un '1' no visitado, cuenta una isla nueva y usa DFS para "apagar" (marcar como '0') todas las celdas conectadas a esa isla.

*/

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function inOrder(root) {
    if (!root) return [];
    return [...inOrder(root.left), root.val, ...inOrder(root.right)];
}

function esBalanceado(root) {
    function altura(nodo) {
        if (!nodo) return 0;
        const izq = altura(nodo.left);
        const der = altura(nodo.right);
        if (izq === -1 || der === -1 || Math.abs(izq - der) > 1) {
            return -1;
        }
        return Math.max(izq, der) + 1;
    }
    return altura(root) !== -1;
}

function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    const filas = grid.length;
    const cols = grid[0].length;

    function dfs(r, c) {
        if (r < 0 || r >= filas || c < 0 || c >= cols || grid[r][c] !== '1') {
            return;
        }
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    let contador = 0;
    for (let r = 0; r < filas; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                contador++;
                dfs(r, c);
            }
        }
    }
    return contador;
}


//        4
//       / \
//      2   6
//     / \
//    1   3
const arbol = new TreeNode(4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(6)
);

// Recorrido in-order
console.log(inOrder(arbol)); 
// [1, 2, 3, 4, 6]

// Árbol balanceado
console.log(esBalanceado(arbol)); 
// true

const desbalanceado = new TreeNode(1, 
    new TreeNode(2, new TreeNode(3, new TreeNode(4)))
);
console.log(esBalanceado(desbalanceado)); 
// false

// Number of Islands
const grid = [
    ['1', '1', '0', '0'],
    ['1', '1', '0', '0'],
    ['0', '0', '1', '0'],
    ['0', '0', '0', '1']
];
console.log(numIslands(grid)); 
// 3 -> tres grupos de '1' desconectados entre sí

/*
---- Pilas y Colas
Paréntesis balanceados — Usa una pila para guardar los símbolos de apertura. Al encontrar un cierre, verifica que coincida con el último abierto (tope de la pila). Si al final la pila está vacía, está balanceado.
Min Stack — Mantiene dos pilas en paralelo: una con los valores normales y otra que en cada posición guarda el mínimo acumulado hasta ese punto, permitiendo obtener el mínimo en O(1).
*/

function parentesisBalanceados(s) {
    const stack = [];
    const pares = { ')': '(', '}': '{', ']': '[' };
    for (const c of s) {
        if ('({['.includes(c)) {
            stack.push(c);
        } else if (c in pares) {
            if (stack.pop() !== pares[c]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// Paréntesis balanceados
console.log(parentesisBalanceados("({[]})")); 
// true
console.log(parentesisBalanceados("({[})]")); 
// false



class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val) {
        this.stack.push(val);
        const minimo = this.minStack.length === 0 
            ? val 
            : Math.min(val, this.minStack[this.minStack.length - 1]);
        this.minStack.push(minimo);
    }

    pop() {
        this.stack.pop();
        this.minStack.pop();
    }

    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

// Min Stack
const minStack = new MinStack();
minStack.push(5);
minStack.push(3);
minStack.push(7);
console.log(minStack.getMin()); 
// 3
minStack.pop(); // saca el 7
console.log(minStack.getMin()); 
// 3 (sigue siendo el mínimo)


/*
---- Programación Dinámica
Fibonacci con memoización — Guarda resultados ya calculados en un objeto (memo) para no recalcular las mismas llamadas recursivas, bajando la complejidad de exponencial a O(n).
Climbing Stairs — En el fondo es Fibonacci: el número de formas de llegar al escalón n es la suma de las formas de llegar a n-1 y n-2, porque solo puedes subir de a 1 o 2 escalones.
Coin Change — Construye un array dp donde dp[i] es el mínimo número de monedas para formar el monto i. Para cada monto, prueba todas las monedas y se queda con la mejor combinación.
*/

function fib(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// Fibonacci
console.log(fib(10)); 
// 55


function climbingStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        [a, b] = [b, a + b];
    }
    return b;
}

// Climbing Stairs
console.log(climbingStairs(5)); 
// 8 -> hay 8 formas de subir 5 escalones (de a 1 o 2)


function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (const c of coins) {
            if (c <= i) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// Coin Change
console.log(coinChange([1, 2, 5], 11)); 
// 3 -> 5 + 5 + 1 = 11, usando 3 monedas
console.log(coinChange([2], 3)); 
// -1 -> no se puede formar 3 solo con monedas de 2



/*
---- Búsqueda y Ordenamiento
Binary Search — Divide el rango de búsqueda a la mitad en cada paso, comparando con el elemento central, siempre que el array esté ordenado. Complejidad: O(log n).
Quicksort — Elige un pivote y divide el array en tres grupos (menores, iguales, mayores al pivote), ordenando recursivamente cada grupo. Complejidad promedio: O(n log n).
*/


function binarySearch(nums, target) {
    let izq = 0, der = nums.length - 1;
    while (izq <= der) {
        const medio = Math.floor((izq + der) / 2);
        if (nums[medio] === target) {
            return medio;
        } else if (nums[medio] < target) {
            izq = medio + 1;
        } else {
            der = medio - 1;
        }
    }
    return -1;
}

// Binary Search
console.log(binarySearch([1, 3, 5, 7, 9, 11], 7)); 
// 3 -> el número 7 está en el índice 3

console.log(binarySearch([1, 3, 5, 7, 9, 11], 4)); 
// -1 -> no existe en el array

function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivote = arr[Math.floor(arr.length / 2)];
    const menores = arr.filter(x => x < pivote);
    const iguales = arr.filter(x => x === pivote);
    const mayores = arr.filter(x => x > pivote);
    return [...quicksort(menores), ...iguales, ...quicksort(mayores)];
}

// Quicksort
console.log(quicksort([5, 2, 9, 1, 5, 6])); 
// [1, 2, 5, 5, 6, 9]


/*
---- Diseño de sistemas
LRU Cache — Usa un Map (que mantiene orden de inserción) para simular el orden de uso. Al acceder o insertar una clave, la mueve al final (más reciente); si se supera la capacidad, elimina la primera clave (la menos usada recientemente).
*/


class LRUCache {
    constructor(capacidad) {
        this.cache = new Map();
        this.capacidad = capacidad;
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const valor = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, valor);
        return valor;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.capacidad) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}

// LRU Cache
const cache = new LRUCache(2); // capacidad de 2

cache.put(1, "A");
cache.put(2, "B");
console.log(cache.get(1)); 
// "A" -> ahora 1 es el más reciente

cache.put(3, "C"); 
// se elimina la clave 2, porque era la menos usada recientemente

console.log(cache.get(2)); 
// -1 -> ya no existe
console.log(cache.get(3)); 
// "C"