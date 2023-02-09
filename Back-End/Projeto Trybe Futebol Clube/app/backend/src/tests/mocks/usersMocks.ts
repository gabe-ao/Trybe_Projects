const unhashedPassword = 'secret_user';

const validUser = {
  username: 'Testador da Silva',
  role: 'user',
  email: 'testador@teste.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

const validLoginReq = {
  email: validUser.email,
  password: unhashedPassword,
};

const invalidLoginReqs = {
  emptyEmail: { email: '', password: unhashedPassword },
  emptyPass: { email: validUser.email, password: '' },
  invalidEmail: { email: 'testadorteste.com', password: unhashedPassword },
  invalidPass: { email: validUser.email, password: 'erro' },
};

const userLoginData = {
  id: 17,
  username: validUser.username,
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

const userTokenFixedPart = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiVGVzdGFkb3IgZGEgU2lsdmEiLCJpYXQi';

const userData = {
  id: 17,
  ...validUser,
};

const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiVGVzdGFkb3IgZGEgU2lsdmEiLCJpYXQiOjE2Njg2NjI3ODd9.EEY5AGhf8gZlVdFUOGoFcdAILgMyls7NTh_C2KKpDcc';

export {
  unhashedPassword,
  validUser,
  validLoginReq,
  invalidLoginReqs,
  userLoginData,
  userTokenFixedPart,
  userData,
  mockToken,
};
