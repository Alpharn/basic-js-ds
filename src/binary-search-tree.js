const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this._root) {
      this._root = newNode;
    } else {
      this.insertNode(this._root, newNode);
    }
  }
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }
  has(data) {
    return this.search(this._root, data) !== null;
  }
  search(node, data) {
    if (!node) return null;
    if (node.data === data) return node;
    return data < node.data
      ? this.search(node.left, data)
      : this.search(node.right, data);
  }

  find(data) {
    return this.search(this._root, data);
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }
  removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) return null;

      if (!node.left) return node.right;
      if (!node.right) return node.left;

      node.data = this.minNode(node.right);
      node.right = this.removeNode(node.right, node.data);

      return node;
    }
  }
  min() {
    return this.minNode(this._root);
  }
  minNode(node) {
    if (!node) return null;
    return node.left ? this.minNode(node.left) : node.data;
  }

  max() {
    return this.maxNode(this._root);
  }
  maxNode(node) {
    if (!node) return null;
    return node.right ? this.maxNode(node.right) : node.data;
  }
  
}

module.exports = {
  BinarySearchTree
};