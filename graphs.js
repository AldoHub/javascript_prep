
const graph = {
    a: ['b', 'c'],
    b: ['d'],
    c: ['e'],
    d: ['f'],
    e: [],
    f: [],
}

/*
//DFS
const depthFirstPrint = (graph, source) => {
    const stack = [source];

    while(stack.length > 0) {
        const current = stack.pop();
        console.log(current);
        //loop the array of neighbours
        for(let neighbour of graph[current]) {
            //push the neighbour to the stack if it is not already in the stack
            if(!stack.includes(neighbour)) {
                stack.push(neighbour);
            }
        }
    }
}
*/

//DFS WITH RECURSION
const depthFirstPrint = (graph, source) => {
   //show the given source
   console.log(source);
   //do the recursion
   for (let neighbour of graph[source]) {
    depthFirstPrint(graph, neighbour);
   }

}


//BFS
const breadthFirstPrint = (graph, source) => { 
    const queue = [source];
    while(queue.length > 0) {
        //remove the first element from the queue
        const current = queue.shift();
        console.log(current);
        //loop the array of neighbours
        for(let neighbour of graph[current]) {
            //push the neighbour to the queue if it is not already in the queue
            if(!queue.includes(neighbour)) {
                queue.push(neighbour);
            }
        }
    }

}

depthFirstPrint(graph, 'a');
breadthFirstPrint(graph, 'a');



/** HAS PATH */

// write a  function, hasPath that takes in an object representing the adjacency list of a directed acyclic graph and two nodes (src, dst).
// The function should return true if there is a path from src to dst, and false otherwise.


const has_path_graph = { 
    f: ['g', 'i'],
    g: ['h'],
    h: [],
    i: ['g', 'k'],
    j: ['i'],
    k: [],
};

//DFS solution
const hasPathDFS = (graph, src, dst) => {
    //check if the current node is the destination node
    if(src === dst) return true;

    //if not equal, loop the array of neighbours
    for (let neighbour of graph[src]) {
        //if the neighbour is the destination node, return true
        if(hasPathDFS(graph, neighbour, dst)) return true;
    }
    //not path found
    return false;
}

//BFS solution
const hasPathBFS = (graph, src, dst) => { 
    //make the queue
    const queue = [src];
    //loop the queue
    while(queue.length > 0) {
        //get the first element from the queue
        const current = queue.shift();
        //if the current node is the destination node, return true
        if(current === dst) return true;
        //loop the array of neighbours
        for(let neighbour of graph[current]) {
            //if the neighbour is not in the queue, add it to the queue
            if(!queue.includes(neighbour)) {
                queue.push(neighbour);
            }
        }
        
        
    }
    return false;
}


console.log(hasPathDFS(has_path_graph, 'f', 'k')); //true
console.log(hasPathBFS(has_path_graph, 'f', 'k')); //true


//write a funtion, undirectedPath that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB).
// The function should return true if there is a path from nodeA to nodeB, and false otherwise.

const edges = [
    ['i', 'j'],
    ['k', 'i'],
    ['m', 'k'],
    ['k', 'l'],
    ['o', 'n']
];

const buildGraph = (edges) => {
    const graph = {};

    //iterate over the edges
    for(let edge of edges) {
        const [a, b] = edge;
        //if they are not in the graph, add them
        if(!(a in graph)) graph[a] = [];
        if(!(b in graph)) graph[b] = [];
        //set the edge between the two nodes
        graph[a].push(b);
        graph[b].push(a);

    }

    return graph;
}

const undirectedPath = (edges, nodeA, nodeB) => { 
    //turn the edges into an object (adjacency list)
    const graph = buildGraph(edges);
    console.log(graph);
    //check if the path exists
    return hasPath3(graph, nodeA, nodeB, new Set());
}
//regular BFS/DFS will fall into an infinite loop - add a visited set to prevent this
const hasPath3 = (graph, src, dst, visited) => {
    if(src === dst) return true;
    //check if the current node has been visited
    if(visited.has(src)) return false;
    //add the current node to the visited set
    visited.add(src);
    
    for (let neighbour of graph[src]) {
        if(hasPath3(graph, neighbour, dst, visited)) return true;
    }
    return false;
}


console.log(undirectedPath(edges, 'j', 'm')); //true