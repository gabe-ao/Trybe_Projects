type ErrorStatusMap = { 
  [errorMessage: string]: number,
};

const errorStatusMap: ErrorStatusMap = {
  '"username" is required': 400,
  '"password" is required': 400,
  '"classe" is required': 400,
  '"level" is required': 400,
  '"name" is required': 400,
  '"amount" is required': 400,
  '"productsIds" is required': 400,
  'Username or password invalid': 401,
  'Token not found': 401,
  'Invalid token': 401,
  '"username" must be a string': 422,
  '"username" length must be at least 3 characters long': 422,
  '"password" must be a string': 422,
  '"password" length must be at least 8 characters long': 422,
  '"classe" must be a string': 422,
  '"classe" length must be at least 3 characters long': 422,
  '"level" must be a number': 422,
  '"level" must be greater than or equal to 1': 422,
  '"name" must be a string': 422, 
  '"name" length must be at least 3 characters long': 422,
  '"amount" must be a string': 422,
  '"amount" length must be at least 3 characters long': 422,
  '"productsIds" must be an array': 422,
  '"productsIds" must include only numbers': 422,
  'Internal Server Error': 500,
};

export default errorStatusMap;
