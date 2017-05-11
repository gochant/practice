/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}


var addTwoNumbers = function (l1, l2) {
    let root = null
    let curr = root
    let carry = 0
    while (l1 != null || l2 != null || (l1 == null && l2 == null && carry != 0)) {
        let val1 = l1 == null ? 0 : l1.val
        let val2 = l2 == null ? 0 : l2.val
        let r = val1 + val2 + carry

        if (r >= 10) {
            carry = Math.floor(r / 10)
            r = r % 10
        } else {
            carry = 0
        }
        let node = new ListNode(r)
        if (root == null) {
            root = node
        } else {
            curr.next = node
        }
        curr = node
        if(l1 != null){
            l1 = l1.next
        }
        if(l2 != null){
            l2 = l2.next
        }

    }

    return root

};

const n1 = new ListNode(2)
const n2 = new ListNode(4)
const n3 = new ListNode(3)
const n4 = new ListNode(5)
const n5 = new ListNode(6)
const n6 = new ListNode(4)
const n7 = new ListNode(9)
const n8 = new ListNode(9)

n1.next = n2
n2.next = n3
n4.next = n5
n5.next = n6

console.log(addTwoNumbers(n7, n8))
