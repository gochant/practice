/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    const l1 = num1.split('')
    const l2 = num2.split('')
    const temp = []
    const rt = []
    for(let i = 0; i < l1.length; i++){
        temp[i] = []
        for(let j = 0; j < l2.length; j++){
            temp[i][i + j] = l2[j] * l1[i]
        }
    }
    let carry = 0
    for(let i = l1.length + l2.length - 2; i >= 0; i--){
        let r = temp.reduce((b, c) => parseInt(b) + parseInt(c[i] == null ? 0 : c[i]), carry)
        if(r >= 10 && i !== 0){
            carry =  Math.floor(r / 10)
            r = r % 10
        }else{
            carry = 0
        }
        rt[i] = r
    }

    const r = rt.join('').replace(/^0{2,}/g, '')
    return r === '' ? '0' : r
};

console.log(multiply('55555', '0'))