import React, { useState } from "react";
import CreateCommunityModal from "@/src/components/Modals/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [openCommunityModal, setOpenCommunityModal] = useState(false);
  return (
    <>
      <CreateCommunityModal open={openCommunityModal} />
      <MenuItem
        width="100%"
        fontSize={`10pt`}
        _hover={{ bg: "grey.100" }}
        onClick={() => {
          setOpenCommunityModal(true);
        }}
      >
        <Flex align={`center`}>
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
export default Communities;
