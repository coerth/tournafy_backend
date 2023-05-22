import logger from "./Logger"


class AppErr implements Error {

    public isOperational: boolean
    public message: string
    public statusCode: number
    public name: string
    

    constructor(name:string , statusCode: number) {
        this.name = name
        this.statusCode = statusCode
        this.message = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
        logger.error(this)
    }
}

export default AppErr