/**
   * @access public
   * @desc Validate a email.
   * @param  {string} email The email.
   * @returns {string} The validated email.
   * @throws {Error} If the email is empty or null.
   * @throws {Error} If the email is not a valid email.
   */
const validateEmail = async (email: string): Promise<string> => {
  const validatedEmail = String(email).toLowerCase();

  if (validatedEmail === '' || validatedEmail === null || validatedEmail === undefined) {
    throw new Error('Email is required');
  }

  const matcher = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!validatedEmail.match(matcher)) {
    throw new Error('Email format is invalid');
  }

  return validatedEmail;
}

export default validateEmail;