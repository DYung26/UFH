import { CustomError } from "@utils/customError";
import { Request, Response, NextFunction } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

export const catchAllErrorHandler = (
    err: Error,
    _: Request,
    res: Response,
    __: NextFunction
) => {
    console.log('In error handler :->', err);
    if (err instanceof CustomError) {
        const { message, statusCode, data } = err;
        const responsePhrase = getReasonPhrase(statusCode);
        return res.status(statusCode).json({
            statusCode,
            statusMessage: responsePhrase,
            //request: resBody,
            error: { message, data },
        });
    }

    const responseCode = StatusCodes.INTERNAL_SERVER_ERROR;
    const responsePhrase = getReasonPhrase(responseCode);
    return res.status(responseCode).json({
        status: responseCode,
        statusMessage: responsePhrase,
        error: { message: responsePhrase },
    });
};

export const notFoundErrorHandler = (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const error = new CustomError(
        `Path '${req.originalUrl}' not found`,
        StatusCodes.NOT_FOUND
    );
    next(error);
};

