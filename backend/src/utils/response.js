export const successResponse = (data, message = 'Success') => {
  return {
    success: true,
    data,
    message
  };
};

export const errorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    error: message,
    statusCode
  };
};