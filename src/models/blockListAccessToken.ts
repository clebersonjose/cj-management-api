import { blockListAccessToken, PrismaClient } from "@prisma/client";
import logger from "../helpers/logger";

class BlockListAccessToken {
  private static dataBaseConection = new PrismaClient();

  public static async add(token: string): Promise<boolean> {
    try {
      const addToken: blockListAccessToken = await this.dataBaseConection.blockListAccessToken.create({
        data: {
          token,
          createdAt: new Date(),
        }
      });

      if (!addToken.createdAt) {
        return false;
      }

      return true;
    } catch (error: any) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }
}

export default BlockListAccessToken;