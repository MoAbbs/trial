import axios from "axios"

var Request = {
    sendRequest(type, body) {
        return new Promise((resolve, reject) => {
            return axios.post(`${process.env.REACT_APP_API_URI}/api/v1/${type}`, body)
                .then(res => {
                    resolve(res)
                })
                .catch(error => {
                    reject(error)
                })
        })

    }
}
export default Request