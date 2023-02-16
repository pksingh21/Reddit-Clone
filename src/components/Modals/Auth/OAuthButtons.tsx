import { errorState } from "@/src/atoms/authModalAtom";
import { addDoc, collection } from "firebase/firestore";
import { Button, Flex, Image } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { auth , firestore } from "@/src/firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { User } from "firebase/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const setErrorState = useSetRecoilState(errorState);
  React.useEffect(() => {
    error?.message
      ? setErrorState({
          error: error,
          isError: true,
          typeOfError: "OAuth",
        })
      : setErrorState({
          error: undefined,
          isError: false,
          typeOfError: null,
        });
  }, [error]);
  const createUserDocument = async (user: User) => {
    //create a function to store users in cloud firestore
    await addDoc(
      collection(firestore, "users"),
      JSON.parse(JSON.stringify(user))
    );
  };
  useEffect(() => {
    if (user !== undefined) createUserDocument(user!.user);
  }, [user]);

  return (
    <Flex direction={`column`} width={`100%`} mb={4}>
      <Button
        onClick={() => {
          signInWithGoogle();
        }}
        variant="oauth"
        mb={2}
        isLoading={loading}
      >
        <Image src="/images/googlelogo.png" height={`20px`} mr={4} />
        Continue With Google
      </Button>
      <Button variant="oauth" mb={2}>
        Some other provider
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
