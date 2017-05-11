class Graph {
    constructor(v) {
        this.vertices = v
        this.edges = 0
        this.adj = []
        for (let i = 0; i < this.vertices; i++) {
            this.adj[i] = []
        }

    }

    addEdge(v, w) {
        this.adj[v].push(w)
        this.adj[w].push(v)
        this.edges++
    }

    show() {

    }

    dfs() {
        this.marked = []
        this.stack = []
        this._dfs(0)
        console.log(this.marked)
    }

    _dfs(v) {
        this._setVisited(v)
        this.stack.push(v)
        this.adj[v].forEach(w => {
            if (this.marked[w] !== true) {
                this._dfs(w)
            }
        })
    }

    bfs(s = 0) {
        let queue = []
        this.marked = []
        this.edgeTo = []
        queue.push(s)

        while (queue.length > 0) {
            const t = queue.shift()
            if (this.marked[t] !== true) {
                this._setVisited(t)
                this.adj[t].forEach(w => {
                    if (this.edgeTo[w] == null) {
                        this.edgeTo[w] = t
                    }
                    queue.push(w)
                })
            }
        }
        console.log(this.marked)
    }

    pathTo(v, s = 0) {
        const path = []
        if (this.marked[v] === true) {
            do {
                path.push(v)
                v = this.edgeTo[v]
            } while (v !== s)
            path.push(s)
        }
        return path
    }

    topSort(){

    }

    _setVisited(v) {
        this.marked[v] = true
        console.log(`Visit${v}`)
    }
}

const graph = new Graph(5)
graph.addEdge(0, 1)
graph.addEdge(0, 2)
graph.addEdge(1, 3)
graph.addEdge(2, 4)
graph.dfs()
graph.bfs()
console.log(graph.stack)
console.log(graph.edgeTo)
console.log(graph.pathTo(3))