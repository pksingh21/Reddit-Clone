import { authModalState, errorState } from "@/src/atoms/authModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth } from "@/src/firebase/clientApp";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const setErrorState = useSetRecoilState(errorState);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  React.useEffect(() => {
    error?.message
      ? setErrorState({
          error: error,
          isError: true,
          typeOfError: "login",
        })
      : setErrorState({
          error: undefined,
          isError: false,
          typeOfError: null,
        });
  }, [error]);
  const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ans = await signInWithEmailAndPassword(
      loginForm.email,
      loginForm.password
    );
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <form onSubmit={onSubmit}>
      <>
        <Input
          name="email"
          placeholder="Email"
          type={`email`}
          onChange={onChange}
          required={true}
          fontSize="10pt"
          _placeholder={{ color: "grey.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColour: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColour: "blue.500",
          }}
          bg="grey.50"
        />
        <Input
          name="password"
          placeholder="password"
          type={`password`}
          onChange={onChange}
          required={true}
          fontSize="10pt"
          _placeholder={{ color: "grey.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColour: "blue.500",
          }}
          _focus={{
            outline: "none",
            bg: "white",
            border: "1px solid",
            borderColour: "blue.500",
          }}
          bg="grey.50"
        />
        <Button
          width={`100%`}
          height={`36px`}
          mt={2}
          mb={2}
          type="submit"
          isLoading={loading}
        >
          Log In
        </Button>
        <Flex justifyContent={`center`} mb={2}>
          <Text fontSize={`9pt`} mr={1}>
            Forgot your password?
          </Text>
          <Text
            fontSize={`9pt`}
            color={`blue.500`}
            cursor={`pointer`}
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "resetPassword",
              }));
            }}
          >
            Reset
          </Text>
        </Flex>
        <Flex fontSize="9pt" justifyContent={`center`}>
          <Text mr={1}>New Here?</Text>
          <Text
            color="blue.500"
            fontWeight={`700`}
            cursor={`pointer`}
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "signup",
              }));
            }}
          >
            SIGN UP
          </Text>
        </Flex>
      </>
    </form>
  );
};
export default Login;
