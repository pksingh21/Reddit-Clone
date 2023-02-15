import { firestore, auth } from "@/src/firebase/clientApp";
import {
  Stack,
  Box,
  Button,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
type CreateCommunityModalProps = {
  open: boolean;
  setOpenCommunityModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  setOpenCommunityModal,
}) => {
  const [communityType, setCommunityType] = useState("public");
  const [communityName, setCommunityName] = useState("");
  const [charsRemaning, setCharsRemaining] = useState(21);
  const [user] = useAuthState(auth);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChangeForInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };
  const handleCreateCommunity = async () => {
    //validate community name
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      throw new Error(
        "Community name must be between 3 and 21 character and can only contain alphabet  , number and underscore"
      );
    }
    //create community document in firestore
    try {
      setLoading(true);
      const communityDocRef = doc(firestore, "communities", communityName);
      const communityDoc = await getDoc(communityDocRef);
      if (communityDoc.exists()) {
        throw new Error(`Sorry , r/${communityName} already exists`);
        setLoading(false);
      }
      //create community
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        
        setError(error.message);
      } else {
        
      }
    }
  };
  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => {
          setOpenCommunityModal(false);
          setError("");
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={`flex`}
            flexDirection={`column`}
            fontSize={15}
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <Divider />
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDirection={`column`}
              padding={`10px 10px`}
              border={`1px solid grey.500`}
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>

              <Text fontSize={11} color={`grey.500`}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top={`28px`}
                left={`10px`}
                width={`20px`}
                color="grey.200"
              >
                r/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChangeForInput}
              />
              <Text fontSize="9pt" color={charsRemaning ? "grey.500" : "red"}>
                {charsRemaning} Characters Remaining
              </Text>
              <Text fontSize={`9pt`} color="red">
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                <Stack spacing={2}>
                  <Checkbox
                    name="public"
                    isChecked={communityType === "public"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={`center`}>
                      <Icon as={BsFillPersonFill} color="grey.500" mr={2} />
                      <Text fontSize="10pt" mr={1} fontWeight="800">
                        Public
                      </Text>
                      <Text fontSize="8pt" color={`grey.500`}>
                        Anyone can view , post, and comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="restricted"
                    isChecked={communityType === "restricted"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={`center`}>
                      <Icon as={BsFillEyeFill} color="grey.500" mr={2} />
                      <Text fontSize="10pt" mr={1} fontWeight="800">
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color={`grey.500`}>
                        Anyone can view but only approved can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    name="private"
                    isChecked={communityType === "private"}
                    onChange={onCommunityTypeChange}
                  >
                    <Flex align={`center`}>
                      <Icon as={HiLockClosed} color="grey.500" mr={2} />
                      <Text fontSize="10pt" mr={1} fontWeight="800">
                        Private
                      </Text>
                      <Text fontSize="8pt" color={`grey.500`}>
                        Only approved users can view and post on this community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius={`0px 0px 10px 10px`}>
            <Button
              variant={`outline`}
              height="30px"
              mr={3}
              onClick={() => {
                setOpenCommunityModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="solid"
              height="30px"
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
