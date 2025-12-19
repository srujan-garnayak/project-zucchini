import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../";
import { handleError } from "@repo/shared-types";

export const loginAdmin = async (email: string) => {
  try {
    // google login -> email -> loginAdmin(email)
    const adminRef = collection(db, "admins");
    const q = query(adminRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("Admin not found");
    }
    return true;
  } catch (error) {
    handleError(error, "Admin login failed");
  }
};
