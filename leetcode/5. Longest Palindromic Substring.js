/**
 * @param {string} s
 * @return {string}
 */
// 这里没有采用 Manacher算法 也能 ac
var longestPalindrome = function (s) {
    const len = s.length
    let max = 0
    let res = null
    if (len < 2) return s
    for (let i = 1; i < len; i++) {
        let low = i - 1
        let high = i + 1
        let count = 1
        let rta = i

        while (low >= 0 && high < len) {
            if (s[low] === s[high]) {
                low--
                high++
                count += 2

            } else {
                break
            }
        }
        if (count > max) {
            max = count
            res = rta
        }

        if ((i - 1) >= 0 && s[i - 1] === s[i]) {
            rta = i
            low = i - 2
            high = i + 1
            count = 2

            while (low >= 0 && high < len) {
                if (s[low] === s[high]) {
                    low--
                    high++
                    count += 2

                } else {
                    break
                }
            }
            if (count > max) {
                max = count
                res = rta
            }
        }
    }
    let m = max / 2
    if (max % 2 > 0) {
        m = Math.floor(m)
        return s.substring(res - m, res + m + 1)
    } else {
        return s.substring(res - m, res + m)
    }
};

// 时间复杂度接近 n2，主要是使用了数组操作，所以超时了
var longestPalindrome2 = function (s) {
    const len = s.length
    let max = 0
    let resArr = null
    if (len < 2) return s
    for (let i = 1; i < len; i++) {
        let low = i - 1
        let high = i + 1
        let count = 1
        let rta = [s[i]]

        while (low >= 0 && high < len) {
            if (s[low] === s[high]) {
                rta.unshift(s[low])
                rta.push(s[low])
                low--
                high++
                count += 2

            } else {
                break
            }
        }
        if (count > max) {
            max = count
            resArr = rta
        }

        if ((i - 1) >= 0 && s[i - 1] === s[i]) {
            rta = [s[low], s[i]]
            low = i - 2
            high = i + 1
            count = 2

            while (low >= 0 && high < len) {
                if (s[low] === s[high]) {
                    rta.unshift(s[low])
                    rta.push(s[low])
                    low--
                    high++
                    count += 2

                } else {
                    break
                }
            }
            if (count > max) {
                max = count
                resArr = rta
            }
        }
    }

    return resArr.join('')
};


console.log(longestPalindrome('babad'))
console.log(longestPalindrome('cbbd'))
console.log(longestPalindrome('aaaa'))
console.log(longestPalindrome('1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'))