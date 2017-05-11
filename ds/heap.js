class Heap {
    constructor(arr) {
        this._data = arr

        const len = this._data.length
        for (let i = len / 2; i > 0; i--) {
            this._adjustDown(i)
        }
    }
    _getLeftChildIndex(idx) {
        return idx * 2 + 1
    }
    _getRightChildIndex(idx) {
        return idx * 2 + 2
    }
    _getParentIndex(idx) {
        return Math.floor(idx - 1 / 2)
    }
    _adjustDown(idx) {
        const child1Idx = this._getLeftChildIndex(idx)
        const child2Idx = this._getRightChildIndex(idx)
        const len = this._data.length
        let top = idx
        if (child1Idx < len && this._compare(top, child1Idx)) {
            top = child1Idx
        }
        if (child2Idx < len && this._compare(top, child2Idx)) {
            top = child2Idx

        }
        if (top !== idx) {
            this._swap(idx, top)
            this._adjustDown(top)
        }
    }
    _adjustUp(idx) {
        const parentIdx = this._getParentIndex(idx)
        if (parentIdx >= 0 && this._compare(parentIdx, idx)) {
            this._swap(parentIdx, idx)
            this._adjustUp(parentIdx)
        }
    }
    _swap(idx1, idx2) {
        const temp = this._data[idx1]
        this._data[idx1] = this._data[idx2]
        this._data[idx2] = temp
    }
    _compare(idx1, idx2) {
        return this._data[idx1] > this._data[idx2]
    }
    _preOrder(idx, callback) {
        if (this._data[idx] == null) {
            return
        }
        callback(idx)
        const child1Idx = idx * 2 + 1
        const child2Idx = idx * 2 + 2
        this._preOrder.call(this, child1Idx, callback)
        this._preOrder.call(this, child2Idx, callback)
    }
    print() {
        const output = []
        this._preOrder(0, (idx)=>{
                output.push(this._data[idx])
            }
        )
        return output.toString()
    }
    insert(d) {
        this._data.push(d)
        this._adjustUp(this._data.length - 1)
    }
    delete() {
        this._swap(0, this._data.length - 1)
        this._data.pop()

        this._adjustDown(0)
    }
    get() {
        return this._data[0]
    }
}

const heap = new Heap([1, 5, 3, 8, 8, 5, 6])
console.log(heap.print())

heap.insert(4)
heap.insert(0)

console.log(heap.get())

heap.delete()

console.log(heap._data)
console.log(heap.print())