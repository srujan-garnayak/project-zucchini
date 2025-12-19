import { db } from "../index";
import { adminsTable } from "../schema";
import { eq } from "drizzle-orm";
import { handleError } from "@repo/shared-types";

export const loginAdmin = async (email: string) => {
  try {
    const [admin] = await db.select().from(adminsTable).where(eq(adminsTable.email, email));

    if (!admin) {
      throw new Error("Admin not found");
    }

    return true;
  } catch (error) {
    handleError(error, "Admin login failed");
  }
};
