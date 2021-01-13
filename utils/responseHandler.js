const sendSuccess = (response, data = {}, message = 'Request succesful', code = 200) => {
  const resp = {
    data,
    message,
    status: 'success',
  };
  return response.status(code).json(resp);
};

const sendError = (response, errors = [], message = 'Invalid request', code = 422) => {
  const resp = {
    errors,
    message,
    status: 'failed',
  };
  return response.status(code).json(resp);
};

module.exports = { sendSuccess, sendError };
