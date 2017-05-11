
class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

class LinkedList{
    constructor(){
        this.head = new Node(0)
        this.head.next = this.head
    }
    find(data){
        let node = this.head
        while(node.next !== this.head){
            if(node.next.data === data){
                break
            }
            node = node.next
        }
        return node.next
    }
    init(num){
        for(let i = 1; i <= num; i++){
            this.insert(i, i - 1)
        }
    }
    findPrevious(data){
        let node = this.head
        while(node.next.next !== this.head){
            if(node.next.next.data === data){
                break
            }
            node = node.next.next
        }
        return node
    }
    insert(data, item){
        const node = new Node(data)
        const current = this.find(item)
        node.next = current.next
        current.next = node
    }
    remove(data){
        const prev = this.findPrevious(data)
        if(prev != null){
            prev.next = prev.next.next
        }
    }
    display(){
        let currNode = this.head
        const rt = []
        while(currNode.next !== this.head) {
            rt.push(currNode.next.data)
            currNode = currNode.next
        }

        console.log(rt.join(','))
    }
}


class DNode{
    constructor(data){

    }
}

class DoubleLinkedList{

}

// 约瑟夫斯环
//
// 传说在公元 1 世纪的犹太战争中，犹太历史学家弗拉维奥·约瑟夫斯和他的 40 个同胞 被罗马士兵包围。
// 犹太士兵决定宁可自杀也不做俘虏，于是商量出了一个自杀方案。他 们围成一个圈，从一个人开始，数到第三个人时将第三个人杀死，
// 然后再数，直到杀光 所有人。约瑟夫和另外一个人决定不参加这个疯狂的游戏，他们快速地计算出了两个位 置，站在那里得以幸存。
// 写一段程序将 n 个人围成一圈，并且第 m 个人会被杀掉，计算 一圈人中哪两个人最后会存活。使用循环链表解决该问题。

function cll(n, m){
    const list = new LinkedList
    list.init(n)
    list.display()
    let begin = list.head
    let end = begin
    while(true){
        let i = m - 1
        while(i > 0){
            end = end.next
            i--
        }
        if(begin === end)
            break
        list.remove(end.data)
        begin = end.next
        list.display()
    }
    return list
}

const l = cll(5, 2)
l.display()

