import { PrismaClient } from "@prisma/client";

/**
 * @access public
 * @desc Check if the email is already in use.
 * @param  {string} email A email.
 * @param  {PrismaClient} dataBaseConection A data base connection with Prisma.
 * @returns {Promise<number>} The number of users with the same email.
 */
const checkIfTheEmailExists = async (email: string, dataBaseConection: PrismaClient): Promise<number> => {
  const findEmail = await dataBaseConection.user.count({
    where: {
      email: email,
    },
  });

  return findEmail;
}

export default checkIfTheEmailExists;