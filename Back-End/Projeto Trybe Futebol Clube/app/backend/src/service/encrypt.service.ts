import bcrypt = require('bcryptjs');

class EncryptService {
  private salt: string;

  constructor(salt: string = bcrypt.genSaltSync(8)) { this.salt = salt; }

  public encrypt = async (password: string): Promise<string> => {
    const hashed = await bcrypt.hash(password, this.salt);
    return hashed;
  };

  public validate = async (password: string, hash: string): Promise<boolean> => {
    const validation = await bcrypt.compare(password, hash);
    return validation;
  };
}

export default new EncryptService();

export { EncryptService };
