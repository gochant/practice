/**
 * 搜索算法
 */

// 顺序搜索
var sequentalSearch = (array, item) => {
    for (let i = 0, len = array.length; i < len; i++) {
        if (item === array[i]) return i
    }
    return -1
}

// 二分查找

var binarySearch = (array, item) => {
    array = array.sort()

    let low = 0
    let high = array.length - 1
    let mid
    let curr

    while (low <= high) {
        mid = Math.floor((low + high) / 2)
        curr = array[mid]
        if(curr === item) return mid
        if(curr > item){
            high = mid - 1
        }else{
            low = mid + 1
        }
    }
    return -1
}

// 哈希查找

// 求解最大公约数 greatest common divisor（辗转相除法，欧几里得算法）

var getGcd = (a, b) => {
    while (a != b) {
        if (a > b) {
            a = a - b
        } else {
            b = b - a
        }
    }
    return a
}


