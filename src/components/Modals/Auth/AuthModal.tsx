import { authModalState, errorState } from "@/src/atoms/authModalAtom";
import {
  Text,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
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
