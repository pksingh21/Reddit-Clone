import { Flex, HStack, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon,PhoneIcon } from '@chakra-ui/icons'
import React from 'react';

type SearchInputProps = {
    //    user: 
};

const SearchInput: React.FC<SearchInputProps> = () => {

    return (
        <Flex
            flexGrow={1}
            // maxWidth={user ? "auto" : "600px"}
            mr={2}
            alignItems="center"
        >
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    color="gray.400"
                >
                    <SearchIcon mb={2} />
                </InputLeftElement>
                <Input
                    placeholder="Search Reddit"
                    fontSize="10pt"
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    height="34px"
                    bg="gray.50"
                    size="md"
                    variant={`outline`}
                />
            </InputGroup>
        </Flex>
    )
}
export default SearchInput;