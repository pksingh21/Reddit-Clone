import { FIREBASE_ERRORS } from "@/src/firebase/error";
import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";
export type FIREBASE_ERROR_OBJECT_KEY = keyof typeof FIREBASE_ERRORS;
export type FIREBASE_ERROR_OBJECT_TYPE = AuthError;
