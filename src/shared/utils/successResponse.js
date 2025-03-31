function successResponse(statusCode = 200, { data, message } = {}) {
  const response = {
    statusCode,
    message,
    data,
  };

  return this.status(statusCode).json(response);
}

export default successResponse;
