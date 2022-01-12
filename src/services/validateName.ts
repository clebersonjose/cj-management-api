/**
   * @access public
   * @desc Validate a full name.
   * @param  {string} name The full name.
   * @returns {string} The validated full name.
   * @throws {Error} If the full name is empty or null.
   * @throws {Error} If the full name length is less than 4 characters.
   */
const validateName = async (name: string): Promise<string> => {
  const validatedName = String(name);

  if (validatedName === '' || validatedName === null || validatedName === undefined) {
    throw new Error('Name is required');
  }

  if (validatedName.length <= 3) {
    throw new Error('Name must be at least 4 characters');
  }

  return validatedName;
}

export default validateName;