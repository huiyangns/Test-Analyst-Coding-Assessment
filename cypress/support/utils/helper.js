function extractPrice(str){
    let regex = /^\$[\s]*(\d+\.?\d*)/
    return regex.exec(str)[1] 
}

export {extractPrice}