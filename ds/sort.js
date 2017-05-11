function merge(arr1, arr2){
    let temp = []
    let i = 0
    let j = 0

    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
           temp.push(arr1[i])
            i++
        }
        if(arr1[i] > arr2[j]){
            temp.push(arr2[j])
            j++
        }
        if(arr1[i] === arr2[j]){
            temp.push(arr1[i])
            temp.push(arr2[j])
            i++
            j++
        }
    }
    if(i < arr1.length){
        temp =  temp.concat(arr1.slice(i))
    }
    if(j < arr2.length){
        temp = temp.concat(arr2.slice(j))
    }

    return temp
}

console.log(merge([2,4,6,8,10], [1,3,4,5,7,11]))