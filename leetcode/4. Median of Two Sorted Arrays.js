/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    const mid = (nums1.length + nums2.length) / 2
    const greaterMid = parseInt(mid)
    let lessMid = greaterMid
    const all = []
    if (greaterMid === mid) {
        lessMid = mid - 1
    }

    let i = 0
    let j = 0
    while (i < nums1.length && j < nums2.length) {

        if (nums1[i] < nums2[j]) {
            all.push(nums1[i])
            i++
        }
        if (nums1[i] > nums2[j]) {
            all.push(nums2[j])
            ++j
        }
        if (nums1[i] === nums2[j]) {
            all.push(nums1[i])
            all.push(nums2[j])
            ++i
            ++j
        }

        if(all.length > greaterMid + 1){
            break
        }
    }
    if(i < nums1.length){
        while(i < nums1.length){
            all.push(nums1[i])
            i++
        }
    }
    if(j < nums2.length){
        while(j < nums2.length){
            all.push(nums2[j])
            j++
        }
    }

    if (lessMid === greaterMid) {
        return all[lessMid]
    } else {
        return (all[lessMid] + all[greaterMid]) / 2
    }
};

console.log(findMedianSortedArrays([1], [1]))
console.log(findMedianSortedArrays([1, 3], [2]))
console.log(findMedianSortedArrays([1, 2], [3, 4]))