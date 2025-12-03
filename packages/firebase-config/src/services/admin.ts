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

export const verifyUser = async (docId: string) => {
  try {
    const userRef = doc(db, "users", docId);
    await updateDoc(userRef, {
      isVerified: true,
    });
    return true;
  } catch (error) {
    handleError(error, "User verification failed");
  }
};
