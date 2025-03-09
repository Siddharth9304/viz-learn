class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            const queue = [this.root];
            while (queue.length) {
                let current = queue.shift();
                if (!current.left) {
                    current.left = newNode;
                    break;
                } else if (!current.right) {
                    current.right = newNode;
                    break;
                } else {
                    queue.push(current.left, current.right);
                }
            }
        }
        this.size++;
    }

    getSize() {
        return this.size;
    }

    getTreeArray() {
        if (!this.root) return [];
        const queue = [this.root];
        const result = [];
        while (queue.length) {
            let node = queue.shift();
            result.push(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        return result;
    }

    clear() {
        this.root = null;
        this.size = 0;
    }
}

export default BinaryTree;
