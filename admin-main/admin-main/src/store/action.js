export const SIGN_IN = (user)=>{
    return{
        type : "LOG_IN",
        user : user
    }
}

export const TOGGLE_TO_PRODUCT_LOCAL = (product,section)=>{
    return{
        type : "TOGGLE_TO_PRODUCT_LOCAL",
        product : product,
        section : section
    }
}

export const TOGGLE_TO_FAV = (product)=>{
    return{
        type : "TOGGLE_TO_FAV",
        product : product
    }
}

export const TOGGLE_TO_COMPARE = (product)=>{
    return{
        type : "TOGGLE_TO_COMPARE",
        product : product
    }
}