import {
  collection,
  addDoc,
  query,
  getDocs,
  limit,
  startAfter,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../index";
import {
  handleError,
  type Registration,
  RegistrationSchema,
  validateAndThrow,
} from "@repo/shared-types";

export const registerUser = async (userData: Registration) => {
  try {
    validateAndThrow(RegistrationSchema, userData, "User registration");
    const docRef = await addDoc(collection(db, "users"), userData);
    return docRef.id;
  } catch (e) {
    handleError(e, "User registration failed");
  }
};

export const getPaginatedUsers = async (
  pageSize: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>
) => {
  try {
    const usersRef = collection(db, "users");
    let q = query(usersRef, orderBy("registeredAt", "desc"), limit(pageSize));

    if (lastDoc) {
      q = query(usersRef, orderBy("registeredAt", "desc"), startAfter(lastDoc), limit(pageSize));
    }

    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    return {
      users,
      lastDoc: lastVisible,
      hasMore: querySnapshot.docs.length === pageSize,
    };
  } catch (e) {
    handleError(e, "Failed to fetch paginated users");
  }
};
