import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from "@chakra-ui/react";
import { FIREBASE_ERRORS } from "@/src/firebase/error";
import {
  FIREBASE_ERROR_OBJECT_KEY,
  FIREBASE_ERROR_OBJECT_TYPE,
} from "@/src/customTypes/customTypes";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { errorState } from "@/src/atoms/authModalAtom";

type AuthErrorProps = {};

const AuthError: React.FC<AuthErrorProps> = ({}) => {
  const ErrorState = useRecoilValue(errorState);
  return (
    <>
      {ErrorState.isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>
            <Text fontSize={`14px`}>
              {
                FIREBASE_ERRORS[
                  ErrorState.error?.message as FIREBASE_ERROR_OBJECT_KEY
                ]
              }
            </Text>
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
