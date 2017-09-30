class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
    }

    appendChild(node) {
        if (this.left == null) {
            this.left = node;
            this.left.parent = this;
        }
        else if (this.right == null) {
            this.right = node;
            this.right.parent = this;
        }
    }

    removeChild(node) {
        if (this.left == node) {
            this.left.parent = null;
            this.left = null;
        } else if (this.right == node) {
            this.right.parent = null;
            this.right = null;
        } else throw new Error;
    }

    remove() {
        if (this.parent == null) return;
        this.parent.removeChild(this);
    }

    swapWithParent() {
        var parentOfParent;
        if (!this.parent) return;
        if(this.parent.parent){
            if(this.parent.parent.left == this.parent) this.parent.parent.left = this;
            if(this.parent.parent.right == this.parent) this.parent.parent.right = this;
        }
        if (this.parent.left == this) {
            if(this.parent.parent) parentOfParent = this.parent.parent;
            if (this.right) this.right.parent = this.parent;
            if (this.parent.right) this.parent.right.parent = this;
            this.right = [this.parent.right, this.parent.right = this.right][0];
            if (this.left) this.left.parent = this.parent;
            this.parent.left = this.left;
            this.left = this.parent;
            this.parent.parent = [this, this.parent = this.parent.parent][0];
        } else if (this.parent.right == this) {
            if (this.left) this.left.parent = this.parent;
            if (this.parent.left) this.parent.left.parent = this;
            this.left = [this.parent.left, this.parent.left = this.left][0];
            if (this.right) this.right.parent = this.parent;
            this.parent.right = this.right;
            this.right = this.parent;
            this.parent.parent = [this, this.parent = this.parent.parent][0];
        }
    }
}

module.exports = Node;
