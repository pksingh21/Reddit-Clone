import { authModalState } from '@/src/atoms/authModalAtom';
import { Button } from '@chakra-ui/react';
import { Preahvihear } from '@next/font/google';
import React from 'react';
import { useSetRecoilState } from 'recoil';


const AuthButtons: React.FC = () => {
    const setAuthModalButton = useSetRecoilState(authModalState)
    return (
        <>
            <Button variant={`outline`}
                height={`28px`} display={{
                    base: 'none',
                    sm: "flex"
                }}
                width={{ base: "70px", md: "110px" }}
                mr={2}
                onClick={() => {
                    setAuthModalButton({ open: true, view: "login" })
                }}
            >
                Log In
            </Button>

            <Button
                height={`28px`} display={{
                    base: 'none',
                    sm: "flex"
                }}
                width={{ base: "70px", md: "110px" }}
                mr={2}
                onClick={() => {
                    setAuthModalButton({ open: true, view: "signup" })
                }}

            >
                Sign Up
            </Button>
        </>
    );
}
export default AuthButtons;