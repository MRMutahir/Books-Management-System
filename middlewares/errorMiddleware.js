import mongoose from "mongoose";
import { sendResponse } from "../helpers/common.js";

const errorHandler = async (err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        return sendResponse(res, 'Data validation failed. Please review your input.', false, 422);
    } else {
        console.error(err);
        return sendResponse(res, 'An unexpected error occurred. Please try again later.', false, 500);
    }
};

export { errorHandler };
