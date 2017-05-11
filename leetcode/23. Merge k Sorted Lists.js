/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

function ListNode(val) {
    this.val = val
    this.next = null
}
var mergeKLists = function (lists) {
    let rt = null
    const k = lists.length
    let curr = rt
    if (lists.length === 0) return []
    if (lists.length === 1) return lists[0]
    if (lists.length === 2) {
        while (true) {
            let currVal = +Infinity
            let currIdx = 0
            let nullCount = 0
            let over = 0
            for (let i = 0; i < k; i++) {
                if (lists[i] == null) {
                    ++over
                    continue
                }
                if (lists[i].val < currVal) {
                    currVal = lists[i].val
                    currIdx = i
                }
            }

            if (rt == null) {
                curr = rt = lists[currIdx]
            } else {
                curr.next = lists[currIdx]
                curr = curr.next
            }
            if(lists[currIdx] != null){
                lists[currIdx] = lists[currIdx].next
            }
            if (over >= k - 1) {
                break
            }


        }

        for (let i = 0; i < k; i++) {
            if (lists[i] != null) {
                curr.next = lists[i]
            }
        }

        return rt
    } else {
        const mid = Math.floor(lists.length / 2)
        const list1 = lists.slice(0, mid)
        const list2 = lists.slice(mid)
        return mergeKLists([mergeKLists(list1), mergeKLists(list2)])
    }

};


const n1 = new ListNode(2)
const n2 = new ListNode(10)
const n3 = new ListNode(100)
const n4 = new ListNode(2)
const n5 = new ListNode(7)
const n6 = new ListNode(11)
const n7 = new ListNode(1)
const n8 = new ListNode(9)

n1.next = n2
n2.next = n3
n4.next = n5
n5.next = n6
n7.next = n8


const rs = mergeKLists([n1, n4, n7])
console.log(rs)