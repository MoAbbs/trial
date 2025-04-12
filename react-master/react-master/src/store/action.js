
export const loading = () => {
    return {
        type: "LOADING",
    }
}
export const setVal = (type, items) => {
    return {
        type: type,
        items: items,
    }
}

export const setData = (type, data) => {
    return {
        type: type,
        data: data,
    }
}