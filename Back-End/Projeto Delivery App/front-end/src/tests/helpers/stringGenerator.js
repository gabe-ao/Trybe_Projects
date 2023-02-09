function stringGenerator(length) {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return randomString;
}

export default stringGenerator;
