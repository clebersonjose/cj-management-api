/**
 * @access public
 * @desc Service for validate a password.
 * @param  {string} password The password.
 * @returns {string} The validated password.
 * @throws {Error} If the password is empty or null.
 * @throws {Error} If the password not contains at least one uppercase letter.
 * @throws {Error} If the password not contains at least one lowercase letter.
 * @throws {Error} If the password not contains at least one number.
 * @throws {Error} If the password not contains at least one special character.
 * @throws {Error} If the password not be between 8 and 24 characters.
 */
const validatePassword = async (password: string): Promise<string> => {
  const validatePassword = String(password);

  if (validatePassword === '' || validatePassword === null || validatePassword === undefined) {
    throw new Error('Password is required');
  }

  if (!validatePassword.match(/(?=.*[A-Z])/)) {
    throw new Error('Password must contain at least one uppercase letter');
  }

  if (!validatePassword.match(/^(?=.*[a-z])/)) {
    throw new Error('Password must contain at least one lowercase letter');
  }

  if (!validatePassword.match(/^(?=.*[0-9])/)) {
    throw new Error('Password must contain at least one number');
  }

  if (!validatePassword.match('([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\\{\\}\\]\\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)')) {
    throw new Error('Password must contain at least one special character');
  }

  if (validatePassword.length < 8 || validatePassword.length > 24) {
    throw new Error('Password must be between 8 and 24 characters');
  }

  return validatePassword;
}

export default validatePassword;