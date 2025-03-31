import * as userService from './users.service.js';

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.successResponse(STATUS_CODES.CREATED, { data: user });
});

export const getUsers = catchAsync(async (req, res) => {
  const result = await userService.getUsers(req.query);
  return res.successResponse(STATUS_CODES.OK, { data: result });
});

export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, 'User does not exist !');
  }
  return res.successResponse(STATUS_CODES.OK, { data: user });
});
