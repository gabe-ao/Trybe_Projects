type ErrorToStatusMap = {
  [ errorTag: string ]: number,
};

const errorToStatus: ErrorToStatusMap = {
  badLoginReq: 400,
  emptyToken: 400,
  invalidId: 400,
  missingQuery: 400,
  badNewMatchReq: 400,
  badNewScoreReq: 400,
  userNotFound: 401,
  invalidUser: 401,
  invalidToken: 401,
  voidTeams: 404,
  teamNotFound: 404,
  voidMatches: 404,
  matchNotFound: 404,
  matchAlreadyDone: 409,
  idConflict: 409,
  sameTeams: 422,
};

const errorMap = (tag: string): number => errorToStatus[tag];

export default errorMap;

export {
  errorToStatus,
};
