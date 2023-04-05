// const errorMessages = {
//     400: 'BAd request',
//     401: 'Unauthorized',
//     403: 'Forbidden',
//     404: 'Not found',
//     409: 'Conflict'
// }


// const HttpError = (status, message = errorMessages[status]) => {
//     const error = new Error(message);
//     error.status = status;
//     return error
// }
class HttpError extends Error {
    constructor (statusCode, message)
    {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = {
    HttpError
}

module.exports = HttpError

