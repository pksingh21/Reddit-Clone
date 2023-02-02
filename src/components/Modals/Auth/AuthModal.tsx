import { authModalState, errorState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import {
  Text,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const [user, loading, error] = useAuthState(auth);
  const setErrorState = useSetRecoilState(errorState);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
    setErrorState((prev) => ({
      ...prev,
      error: undefined,
      isError: false,
      typeOfError: null,
    }));
  };
  React.useEffect(() => {
    if (user !== null) handleClose();
    console.log(user, "user !");
  }, [user]);
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={`center`}>
            {modalState.view === "resetPassword" && "Reset Password"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "login" && "Login"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={`flex`}
            flexDirection={`column`}
            alignItems={`center`}
            justifyContent={`center`}
          >
            <Flex
              direction={`column`}
              align={`center`}
              justify={`center`}
              width={`70%`}
            >
              <OAuthButtons />
              <Text color={`grey.500`} fontWeight={700}>
                OR
              </Text>
              <AuthInputs />
              {/* <ResetPassword/> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
