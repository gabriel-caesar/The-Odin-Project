// importing merge-sort library
import { mergeSort } from "./merge.js";

class Node {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.right = null;
  };
};

class Tree {
  constructor(root) {
    this.root = root;
  };

  noDuplicate(array) { // returns the given array with unique elements
    const unique = [... new Set(array.map(n => n))];
    return unique;
  };

  sort(array) { // sorts using 'merge and sort' algorithms
    return mergeSort(array);
  };

  buildTree(array) {
    
    const uniqueArray = this.noDuplicate(array); // remove duplicate elements
    const sortedArray = this.sort(uniqueArray); // sorts the array

    if (sortedArray.length === 1) {
      return this.root = new Node(sortedArray[0]);
    } else if (sortedArray.length === 0) {
      return this.root = null;
    } else if (sortedArray.length > 1) {
      const middleIndex = Math.floor(sortedArray.length/2); // root node
      const newNode = new Node(sortedArray[middleIndex]);
      
      newNode.left = this.buildTree(sortedArray.slice(0, middleIndex)); // left of root node

      newNode.right = this.buildTree(sortedArray.slice(middleIndex + 1)); // right of root node

      this.root = newNode;
      return newNode;
    }
  };

  insert(value, data = this.root) {
    if (data === null) { // if root is empty
      return this.root = new Node(value); // create a new Node to it
      
     // prints the tree to the console
    };

    // is value smaller than data? (if it is) is data's left branch empty?
    //   --> if branch is empty, assign value as a new node to it.
    //   --> if branch is not empty, traverse to it and check the same conditions.

    // is value bigger than data? (if it is) is data's right branch empty?
    //   --> if branch is empty, assign value as a new node to it.
    //   --> if branch is not empty, traverse to it and check the same conditions.

    if (data.data > value && data.left === null) {
      return data.left = new Node(value);
    } else if (data.data > value && data.left !== null) {
      return this.insert(value, data.left); 
    } else if (data.data < value && data.right === null) { // middle index value > value
      return data.right = new Node(value); // traverse to left branch
    } else if (data.data < value && data.right !== null) {
      return this.insert(value, data.right)
    } else {
      throw new Error("Duplicates found!");
    };
  };

  deleteItem(value) {
    // if node is childless, delete it
    // if node has a single child, swap it with its child and delete it
    // if node has two children, swap it with its 'in-order' successor (also a leaf node) and delete it
    // that is, traversing to the right branch of the value you wanna delete
    // and then repeat traversing to left branches until you find a leaf node
    // that would be the one node to take the place from the removed value
    function remove(value, data) {
      // if root is the only one node in the tree
      if (data.data === value) {  // node === value
        // leaf node
        if (data.right === null && data.left === null) return data.data = null;
        // no right branch
        if (data.right === null) {
          data.data = data.left.data;
          return data.left = null;
        }
        // no left branch
        if (data.left === null) {
          data.data = data.right.data;
          return data.right = null;
        }
        // when node has two children:
        let rightNode = data.right;
        while (rightNode.left !== null) {
          rightNode = rightNode.left;
        };
        // leaf at-most on the left found
        data.data = rightNode.data;
        // rebalance the tree after reassign
        remove(rightNode.data, data.right);
      } else if (data.data > value) { // node > value
        return remove(value, data.left);
      } else {                        // node < value
        return remove(value, data.right);
      }
    };
    return remove(value, this.root);
  };

  find(value, data = this.root) { // returns the node containing the value
    if (value === data.data) {
      return data;
    };

    if (value > data.data) {
      return this.find(value, data.right);
    } else if (value < data.data) {
      return this.find(value, data.left);
    } else {
      throw new Error(`No value found.`);
    };
  };

  levelOrder(callback) { // BREADTH-FIRST SEARCH
    // if there is no callback, throw an error
    if (!callback) {
      throw new Error("callback required!");
    };

    let queue = [this.root]; // starts the queue with the root

    while (queue.length !== 0) {
      let currentNode = queue.shift(); // currentNode becomes the first node out
      callback(currentNode.data); // callback logs it
      
// can't use else if, bc that would avoid pushing both right and left branches if both existed
      if (currentNode.left !== null) { // if currentNode has a left branch
        queue.push(currentNode.left); // push its left branch to the queue
      };
      if (currentNode.right !== null) { // if currentNode has a right branch
        queue.push(currentNode.right); // push its right branch to the queue
      };
      
    };
  };

  inOrder(callback) { // DEPTH-FIRST SEARCH
    // Traverses the left subtree until there are no more left nodes.
    // Visits the current node and adds it to the results array.
    // Then traverses the right subtree, repeating the process.

    // if there is no callback, throw an error
    if (!callback) {
      throw new Error("callback required!");
    };

    let results = [];

    function traverse(node) { 
      if (node.left) traverse(node.left);
      results.push(node);
      if (node.right) traverse(node.right);
    };

    traverse(this.root);

    // holds only the numbers from the actual nodes for the sake of readability
    const values = [...results.map(x => x.data)]
    return callback(values);
  };

  preOrder(callback) { // DEPTH-FIRST SEARCH
    // Visits the current node and adds it to the results array.
    // Traverses the left subtree until there are no more left nodes.
    // Then traverses the right subtree, repeating the process.

    // if there is no callback, throw an error
    if (!callback) {
      throw new Error("callback required!");
    };

    let results = [];

    function traverse(node) {
      results.push(node);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);

    // holds only the numbers from the actual nodes for the sake of readability
    const values = [...results.map(x => x.data)]
    return callback(values);
  };

  postOrder(callback) { // DEPTH-FIRST SEARCH
    // Traverses the left subtree until there are no more left nodes.
    // Then traverses the right subtree.
    // Then visits the current node and adds it to the results array, repeating the process.

    // if there is no callback, throw an error
    if (!callback) {
      throw new Error("callback required!");
    };

    let results = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      results.push(node);
    };
    traverse(this.root);

    // holds only the numbers from the actual nodes for the sake of readability
    const values = [...results.map(x => x.data)] 
    return callback(values);
  };

  height(value) { // calculates the given node's height
    let currentNode = this.find(value);
  
    if (currentNode === null) return 0;
  
    function helper(node) {
      if (!node) return 0;  // base case: if the node is null, return height 0
  
      let leftHeight = helper(node.left);  // recursively get the height of the left subtree
      let rightHeight = helper(node.right);  // recursively get the height of the right subtree
      
      return Math.max(leftHeight, rightHeight) + 1;  // return the max height of left/right subtrees + 1 for the current node
    };
  
    return helper(currentNode);
  }

  depth(value) { // calculates the given node's depth

    const node = this.root;
    if (node === null) return -1;  // value not found, return -1

    function helper(value, node, counter) {
      if (node.data === value) {
        return counter;  // found the value, return the depth
      }
    
      if (node.data > value) {
        return helper(value, node.left, counter + 1);  // go left, increment depth
      } else {
        return helper(value, node.right, counter + 1);  // go right, increment depth
      }
    };

    return helper(value, node, 0);
  };
  
  isBalanced() { // returns the tallest height from root if balanced, but -1 otherwise
    if (this.root === null) return true;

    function balance (node) {
      // '!node' means an empty binary tree
      if (!node) return 0;
      
      let heightLeft = balance(node.left);
      if (heightLeft === -1) return -1;

      let heightRight = balance(node.right);
      if (heightRight === -1) return -1;

      if(Math.abs(heightLeft - heightRight) > 1) return -1;
      
      return Math.max(heightLeft, heightRight) + 1;
    };

    return balance(this.root);
  };

  rebalance() { // traverses through the tree to creating a new 
// array to rebuild the tree and balance it accordingly

    let results = [];

    function traverse(node) {
      if (node.left) traverse(node.left);
      results.push(node);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);

    // holds only the numbers from the actual nodes for the sake of readability
    const values = [...results.map(x => x.data)];
    // builds the tree with the sorted array
    return this.buildTree(this.sort(values));
  };
  
};

// function provided by The Odin Project to 'draw' the tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// generates a random array of 'n' numbers;
const array = (n) => {
  let result = [];
  let number = 0;
  ;
  while (number < n) {
    number++
    result.push(Math.floor(Math.random() * 99));
  };
  return result;
};

const tree = new Tree();
tree.buildTree(array(10));
tree.insert(3);
tree.insert(7);
tree.insert(2);
tree.insert(15);
console.log(tree.isBalanced());
prettyPrint(tree.root);