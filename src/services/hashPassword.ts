import bcrypt from 'bcrypt';

/**
   * @access public
   * @desc Service for hash a password.
   * @param  {string} password The password.
   * @returns {string} The hashed password.
   */
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

export default hashPassword;