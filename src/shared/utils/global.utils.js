import { catchAsync, ApiError, STATUS_CODES, apiHandlerWithTransaction } from './index.js';

globalThis.catchAsync = catchAsync;
globalThis.ApiError = ApiError;
globalThis.STATUS_CODES = STATUS_CODES;
globalThis.apiHandlerWithTransaction = apiHandlerWithTransaction;
