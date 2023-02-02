import { authModalState, errorState } from "@/src/atoms/authModalAtom";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/error";
import { FIREBASE_ERROR_OBJECT_KEY } from "@/src/customTypes/customTypes";
type SignUp = {
  children: JSX.Element | JSX.Element[];
};
const SignUp: React.FC = () => {
  const [createUserWithEmailAndPassword, user, loading, UserError] =
    useCreateUserWithEmailAndPassword(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const setErrorState = useSetRecoilState(errorState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    ConfirmPassword: "",
  });
  const [Error, setError] = useState("");
  useEffect(() => {
    UserError?.message
      ? setErrorState({
          error: UserError,
          isError: true,
          typeOfError: "signup",
        })
      : setErrorState({
          error: undefined,
          isError: false,
          typeOfError: null,
        });
  }, [UserError]);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Error) setError("");
    if (signUpForm.password !== signUpForm.ConfirmPassword) {
      setErrorState({
        error: "Password MisMatch",
        isError: true,
        typeOfError: "signup",
      });
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSignUpForm((prev) => ({
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
        <Input
          name="ConfirmPassword"
          placeholder="Confirm Password"
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
          Sign Up
        </Button>
        {}
        <Flex fontSize="9pt" justifyContent={`center`}>
          <Text mr={1}>All ready living in your mom's basement?</Text>
          <Text
            color="blue.500"
            fontWeight={`700`}
            cursor={`pointer`}
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }));
            }}
          >
            Log In
          </Text>
        </Flex>
      </>
    </form>
  );
};
export default SignUp;
