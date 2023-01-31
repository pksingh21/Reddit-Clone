import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';


const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState)
    const handleClose = () => {
        setModalState((prev) => ({
            ...prev, open: false
        }))
    };
    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {modalState.view === 'resetPassword' && "Reset Password"}
                        {modalState.view === 'signup' && "Sign Up"}
                        {modalState.view === 'login' && "Login"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={`flex`} flexDirection={`column`} alignItems={`center`} justifyContent={`center`}>
                        <Flex direction={`column`} align={`center`} justify={`center`} width={`70%`}>
                            {/* <OAuthButtons/> */}
                            {/* <AuthInputs/> */}
                            {/* <ResetPassword/> */}
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default AuthModal;