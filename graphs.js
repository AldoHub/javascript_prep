
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


//---- Write a funtion, undirectedPath that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB).
// --- The function should return true if there is a path from nodeA to nodeB, and false otherwise.

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


console.log("path exists", undirectedPath(edges, 'j', 'm')); //true



//----Write a function, connectedComponentsCount that takes in the adjacency list of an undirected graph.
//----The function should return the number of connected components in the graph.

//nodes
const connectedComponentsCount = (graph) => {
    const visited = new Set();
    let count = 0;

    for (let node in graph) {
        //check if exploring the component returns true - means we are done with all the nodes in the component
        if(explore(graph, node, visited) === true) {
            //increment the count
            count++;
        }
    }

    return count;
}

//links
const explore = (graph, node, visited) => {
    //check if the node has been visited
    if(visited.has(node)) return false;

    //add the node to the visited set
    visited.add(node);

    for (let neighbour of graph[node]) {
        explore(graph, neighbour, visited)
    }
    
    //return true after exploring all the neighbour nodes
    return true;
}


console.log("components found", connectedComponentsCount({  
    0: ['8', '1', '5'],
    1: ['0'],
    5: ['0', '8'],
    8: ['0', '5'],
    2: ['3', '4'],
    3: ['2', '4'],
    4: ['3', '2'],
})); // returns 2



//----Write a function, largetsComponent, that takes in the adjacency list of an undirected path.
//----The function should return the size of the largerst component in the graph

//nodes
const largetsComponent = (graph) => {
    const visited = new Set();
    let largestComponent = 0;

    for (let node in graph) {
        //check if exploring the component returns true - means we are done with all the nodes in the component
        console.log(node)
        const size = findLargestComponent(graph, node, visited);
        if(size > largestComponent) {
            largestComponent = size;
        }
    }

    return largestComponent;
}

//links
const findLargestComponent = (graph, node, visited) => {

    //check if the node has been visited
    if(visited.has(node)) return 0;
  
    //add the node to the visited set
    visited.add(node);
    
    let count = 1;
    for (let neighbour of graph[node]) {
        count += findLargestComponent(graph, neighbour, visited);
    }

    //return true after exploring all the neighbour nodes
    return count;
   
}

console.log("largets component", largetsComponent({
    0: ['8', '1', '5'],
    1: ['0'],
    5: ['0', '8'],
    8: ['0', '5'],
    2: ['3', '4'],
    3: ['2', '4'],
    4: ['3', '2'],
})); // 4



//---- write a function, shortestPath, that takes in an array of edges for an undirected graph and two nodes (nodeA, nodeB).
//---- Consider the lenght as the number of edges between the two nodes.
//---- The function should return the shortest path from nodeA to nodeB, or -1if there is no path.

const shortestPathEdges = [
    ['w', 'x'],
    ['x', 'y'],
    ['z', 'y'],
    ['z', 'v'],
    ['w', 'v']
];


const shortestPath = (edges, nodeA, nodeB) => { 

    const graph = buildGraph(edges);
    const visited = new Set([nodeA]); //initially, the nodeA is visited
    const queue = [[nodeA, 0]]; //store the node and the distance
  
    while(queue.length > 0) {
        //get the first element from the queue
        const [node, distance] = queue.shift();
        //if the current node is the destination node, return true
        if(node === nodeB) return distance;
        //loop the array of neighbours
        for (let neighbour of graph[node]) {
            if(!visited.has(neighbour)) {
                //if the neighbour is already visited, skip it
                visited.add(neighbour); //add the neighbour to the visited set
                queue.push([neighbour, distance + 1]);
            }
        }
    }

    return -1; //if the destination node is not reachable, return -1
}


console.log("shortest path: ", shortestPath(shortestPathEdges, 'w', 'z')); // 2

//video continue 1:39:38