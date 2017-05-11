class Node {
    constructor(data, left, right) {
        this.data = data
        this.left = left
        this.right = right
    }

    show() {
        console.log(this.data)
    }
}

// binary search tree
class BST {
    constructor() {
        this.root = null
    }

    _isSmallerNode(d1, d2) {
        return d1 >= d2
    }

    _insertNode(node, newNode) {
        if (this._isSmallerNode(node.data, newNode.data)) {
            if (node.left !== null) {
                this._insertNode(node.left, newNode)
            } else {
                node.left = newNode
            }
        } else {

            if (node.right !== null) {
                this._insertNode(node.right, newNode)
            } else {
                node.right = newNode
            }
        }
    }

    insert(data) {
        const n = new Node(data, null, null)
        if (this.root === null) {
            this.root = n
        } else {
            this._insertNode(this.root, n)
        }

    }
    preOrder(node){
        if(typeof node === 'undefined'){
            node = this.root
        }
        if(node != null){
            node.show()
            this.preOrder(node.left)
            this.preOrder(node.right)
        }
    }

    inOrder(node) {
        if(typeof node === 'undefined'){
            node = this.root
        }
        if (node !== null) {
            this.inOrder(node.left)
            node.show()
            this.inOrder(node.right)
        }
    }

    postOrder(node){
        if(typeof node === 'undefined'){
            node = this.root
        }
        if (node !== null) {
            this.inOrder(node.left)
            this.inOrder(node.right)
            node.show()
        }
    }
    find(data, node){
        if(typeof node === 'undefined'){
            node = this.root
        }
        if(node === null) return false
        if(data === node.data){
            return node
        }
        if(data > node.data){
            this.find(data, node.right)
        }else{
            this.find(data, node.left)
        }
    }
    findMin(){
        let node = this.root
        while(node !== null){
            node = node.left
        }
        return node
    }
    findMax(){
        let node = this.root
        while(node !== null){
            node = node.right
        }
        return node
    }
    remove(){

    }
}

const nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
nums.inOrder(nums.root)