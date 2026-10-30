class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value into the tree
  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      // Go left if value is smaller
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }

        current = current.left;
      }

      // Go right if value is larger
      else if (value > current.value) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }

        current = current.right;
      }

      // Ignore duplicates
      else {
        return;
      }
    }
  }

  // Search for a value
  search(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  // Delete a value from the tree
  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    // Value was not found
    if (node === null) {
      return null;
    }

    // Search in the left subtree
    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    }

    // Search in the right subtree
    else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    }

    // We found the node
    else {
      // CASE 1:
      // Node has no children
      if (node.left === null && node.right === null) {
        return null;
      }

      // CASE 2:
      // Node only has a right child
      if (node.left === null) {
        return node.right;
      }

      // CASE 2:
      // Node only has a left child
      if (node.right === null) {
        return node.left;
      }

      // CASE 3:
      // Node has two children
      //
      // Find the smallest value
      // in the right subtree
      const successor = this.findMin(node.right);

      // Replace current node's value
      node.value = successor.value;

      // Delete the duplicate successor
      node.right = this.deleteNode(
        node.right,
        successor.value
      );
    }

    return node;
  }

  // Find the smallest node in a subtree
  findMin(node) {
    let current = node;

    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }
}


const tree = new BinarySearchTree();

tree.insert(50);
tree.insert(30);
tree.insert(70);
tree.insert(20);
tree.insert(40);
tree.insert(60);
tree.insert(80);


//              50
//            /    \
//          30      70
//         /  \    /  \
//       20   40  60   80


console.log(tree.search(40));
// true

console.log(tree.search(90));
// false

tree.delete(20);

//              50
//            /    \
//          30      70
//            \    /  \
//            40  60   80


const tree2 = new BinarySearchTree();

tree.insert(30);
tree.insert(20);
tree.insert(10);

//      30
//      /
//    20
//      \
//       10


tree.delete(20);

//      30
//      /
//    10

