import { authModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type LoginProps = {

};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState)
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })
    const onSubmit = () => { }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev, [event.target.name]: event.target.value
        }))
    }
    return (
        <form onSubmit={onSubmit}>
            <Input name="email" placeholder="Email" type={`email`} onChange={onChange} required={true} fontSize='10pt'
                _placeholder={{ color: "grey.500" }} _hover={{ bg: "white", border: "1px solid", borderColour: "blue.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColour: "blue.500" }}
                bg="grey.50"
            />
            <Input name="password" placeholder="password" type={`password`} onChange={onChange} required={true} fontSize='10pt'
                _placeholder={{ color: "grey.500" }} _hover={{ bg: "white", border: "1px solid", borderColour: "blue.500" }} _focus={{ outline: "none", bg: "white", border: "1px solid", borderColour: "blue.500" }}
                bg="grey.50"
            />
            <Button width={`100%`} height={`36px`} mt={2} mb={2} type="submit">Log In</Button>
            <Flex fontSize="9pt" justifyContent={`center`}>
                <Text mr={1}>New Here?</Text>
                <Text color="blue.500" fontWeight={`700`} cursor={`pointer`} onClick={() => {
                    setAuthModalState((prev) => ({
                        ...prev, view: "signup"
                    }))
                }}>SIGN UP</Text>
            </Flex>
        </form>
    )
}
export default Login;