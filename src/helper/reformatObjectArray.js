export const reformatObjectArray = (obj) => {
    let arr = [];
    Object.keys(obj).forEach(item => {
        if(item == 'limit') return;
        isNumber(item) && arr.push(obj[item])
    });
    return arr;
} ;

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
