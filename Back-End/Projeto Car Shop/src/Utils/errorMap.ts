type ErrorToStatusMap = {
  [ errorTag: string ]: number,
};

const errorToStatus: ErrorToStatusMap = {
  NotFound: 404,
  InvalidMongoId: 422,
  InternalError: 500,
};

const errorMap = (tag: string): number => errorToStatus[tag];

export default errorMap;