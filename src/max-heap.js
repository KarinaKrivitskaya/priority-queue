const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    push(data, priority) {
        var node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
        this.length++;
    }

    pop() {
        if(this.isEmpty()) return;
        this.length--;
        var rt = this.root.data;
        this.restoreRootFromLastInsertedNode(this.detachRoot());
        this.shiftNodeDown(this.root);
        return rt;
    }

    detachRoot() {
        var rt = this.root;
        if(this.parentNodes[0] == this.root) this.parentNodes.shift();
        this.root.remove();
        this.root = null;
        return rt;
    }

    restoreRootFromLastInsertedNode(detached) {
        if(this.parentNodes.length == 0) return;
        var lastInsertedNode = this.parentNodes.pop();
        var idx = this.parentNodes.indexOf(lastInsertedNode.parent);
        var par = lastInsertedNode.parent;
        if(idx == -1 && par != null && par != detached){
            this.parentNodes.unshift(par);
        }
        if(detached.left != null || detached.right != null){
            lastInsertedNode.left = detached.left;
            lastInsertedNode.right = detached.right;
            if(detached.left) detached.left.parent = lastInsertedNode;
            if(detached.right) detached.right.parent = lastInsertedNode;
            lastInsertedNode.parent.removeChild(lastInsertedNode);
            lastInsertedNode.parent = null;
            this.root = lastInsertedNode;
            if(this.root.left == null || this.root.right == null) this.parentNodes.unshift(this.root);
        }

    }

    size() {
        return this.length;
    }

    isEmpty() {
        if(this.parentNodes.length == 0 && this.root == null) return true;
        else return false;
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
        this.length = 0;
    }

    insertNode(node) {
        if(this.isEmpty()){
            this.root = node;
            this.parentNodes.push(node);
            return;
        }
        this.parentNodes[0].appendChild(node);
        this.parentNodes.push(node);
        if(this.parentNodes[0].left != null && this.parentNodes[0].right != null){
            this.parentNodes.shift();
        }
    }

    shiftNodeUp(node) {
        if(node.parent != null){
            if(node.priority > node.parent.priority){
                var idx = this.parentNodes.indexOf(node);
                var idxPar = this.parentNodes.indexOf(node.parent);
                if(idx != -1 && idxPar != -1){
                    this.parentNodes[idx] = [this.parentNodes[idxPar],
                        this.parentNodes[idxPar] = this.parentNodes[idx]][0];
                } else if(idx != -1){
                    this.parentNodes[idx] = this.parentNodes[idx].parent;
                }
                node.swapWithParent();
                this.shiftNodeUp(node);
            }
            else return;
        } else this.root = node;
    }

    shiftNodeDown(node) {
        if(node == null) return;
        if(node.left == null && node.right == null){
            return;
        }

        if(node.left != null){
            if((node.right != null && node.left.priority > node.right.priority) || node.right == null){
                if(node.priority < node.left.priority){
                    var idx = this.parentNodes.indexOf(node.left);
                    var idxPar = this.parentNodes.indexOf(node);
                    if(idx != -1 && idxPar != -1){
                        this.parentNodes[idx] = [this.parentNodes[idxPar],
                            this.parentNodes[idxPar] = this.parentNodes[idx]][0];
                    } else if(idx != -1){
                        this.parentNodes[idx] = this.parentNodes[idx].parent;
                    }
                    if(node == this.root) this.root = node.left;
                    node.left.swapWithParent();
                    this.shiftNodeDown(node);
                }
            }
        }
        if(node.right != null){
            if(node.priority < node.right.priority){
                var idx = this.parentNodes.indexOf(node.right);
                var idxPar = this.parentNodes.indexOf(node);
                if(idx != -1 && idxPar != -1){
                    this.parentNodes[idx] = [this.parentNodes[idxPar],
                        this.parentNodes[idxPar] = this.parentNodes[idx]][0];
                } else if(idx != -1){
                    this.parentNodes[idx] = this.parentNodes[idx].parent;
                }
                if(node == this.root) this.root = node.right;
                node.right.swapWithParent();
                this.shiftNodeDown(node);
            }
        }
    }
}
module.exports = MaxHeap;

