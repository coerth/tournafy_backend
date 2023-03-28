import { Error } from "mongoose"

class AppErr {

    public isOperational: boolean
    public message: string
    public statusCode: number
    public status: string
    

    constructor(status: string, statusCode: number) {
        this.status = status
        this.statusCode = statusCode
        this.message = `${statusCode}`.startsWith("4") ? "fail" : "error"
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppErr