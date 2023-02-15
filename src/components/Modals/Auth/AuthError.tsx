import { errorState } from "@/src/atoms/authModalAtom";
import { FIREBASE_ERROR_OBJECT_KEY } from "@/src/customTypes/customTypes";
import { FIREBASE_ERROR_OBJECT_TYPE } from "@/src/customTypes/customTypes";
import { FIREBASE_ERRORS } from "@/src/firebase/error";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

type AuthErrorProps = {};

const AuthError: React.FC<AuthErrorProps> = ({}) => {
  const ErrorState = useRecoilValue(errorState);
  const [indexForError, setIndexError] = useState<FIREBASE_ERROR_OBJECT_KEY>(
    "Firebase: Error (auth/wrong-password)."
  );
  React.useEffect(() => {
    if (
      typeof ErrorState.error !== "string" &&
      typeof ErrorState.error !== "undefined"
    ) {
      const FinalError = ErrorState.error as FIREBASE_ERROR_OBJECT_TYPE;
      const index = FinalError.message as FIREBASE_ERROR_OBJECT_KEY;
      setIndexError(index);
    } else if (typeof ErrorState.error === "string") {
      setIndexError("Firebase: Error (signup/password-mismatch).");
    } else if (typeof ErrorState.error === "undefined") {
    }
  }, [ErrorState]);
  return (
    <>
      {ErrorState.isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>
            <Text fontSize={`14px`}>{FIREBASE_ERRORS[indexForError]}</Text>
          </AlertTitle>
          <AlertDescription>
            <Text fontSize={`14px`}>{ErrorState.typeOfError} Error</Text>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};
export default AuthError;
