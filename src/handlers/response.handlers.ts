import { Response } from 'express'

const successResponseHandler = (response: Response, data: any, statusCode: number) => {
  return response.status(statusCode).json(data)
};


const errorResponseHandler = (response: Response, error: any, statusCode: number) => {
  return response.status(statusCode).json(error)
}

export {
    successResponseHandler,
    errorResponseHandler
}
