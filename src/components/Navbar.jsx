import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Flex
      px={8}
      py={2}
      alignItems={"center"}
      justifyContent={"space-between"}
      gap={4}
    >
      <Heading>Contact Management</Heading>
      <Flex alignItems={"center"} justifyContent={"space-between"} gap={4}>
        <Link to="/">Home</Link>
        <Link to="/appointment">Appointment</Link>
      </Flex>
    </Flex>
  );
};
