import { atom } from "recoil";
import { FIREBASE_ERROR_OBJECT_TYPE } from "../customTypes/customTypes";
export type ModalView = "login" | "signup" | "resetPassword";
export interface AuthModalState {
  open: boolean;
  view: ModalView;
}
export interface Error {
  isError: boolean;
  typeOfError: "signup" | "login" | "OAuth" | null;
  error: FIREBASE_ERROR_OBJECT_TYPE | undefined | string;
}
const defaultModalState: AuthModalState = {
  open: false,
  view: "login",
};
const defaultErrorState: Error = {
  isError: false,
  typeOfError: null,
  error: undefined,
};
export const authModalState = atom<AuthModalState>({
  key: "authModalState",
  default: defaultModalState,
});
export const errorState = atom<Error>({
  key: "errorState",
  default: defaultErrorState,
});
