import {
  BsArrowUpRightCircle,
  BsChatDots,
  BsChatLeftDots,
} from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotifications,
  IoNotificationsCircleOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import React from "react";
import { Flex, Icon } from "@chakra-ui/react";

type IconsProps = {};

const Icons: React.FC<IconsProps> = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align={`center`}
        borderRight={`1px solid `}
        borderColor={`grey.200`}
      >
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={`pointer`}
          borderRadius={4}
          _hover={{ bg: "grey.500" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={`pointer`}
          borderRadius={4}
          _hover={{ bg: "grey.500" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={`pointer`}
          borderRadius={4}
          _hover={{ bg: "grey.500" }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={`pointer`}
          borderRadius={4}
          _hover={{ bg: "grey.500" }}
        >
          <Icon as={BsChatLeftDots} fontSize={22} />
        </Flex>
        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={`pointer`}
          borderRadius={4}
          _hover={{ bg: "grey.500" }}
        >
          <Icon as={IoNotifications} fontSize={22} />
        </Flex>

        <Flex
          mr={1.5}
          ml={1.5}
          padding={1}
          cursor={`pointer`}
          borderRadius={4}
          _hover={{ bg: "grey.500" }}
        >
          <Icon as={GrAdd} fontSize={22} />
        </Flex>
      </>
    </Flex>
  );
};
export default Icons;
