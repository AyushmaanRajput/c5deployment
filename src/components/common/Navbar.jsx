import { Button, Flex, Heading, Toast, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RESET } from "../../redux/auth/actionTypes";

export const Navbar = () => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("userId");
    navigate("/login");
    dispatch({ type: RESET });
    toast({
      title: "Logged Out Successfully",
      description: "Thanks for visiting our website",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Flex
      px={4}
      py={2}
      gap={4}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Heading>Stack Overflow</Heading>
      <Flex gap={4} alignItems={"center"} justifyContent={"space-between"}>
        <Link to="/">SignUp</Link>
        <Link to="/login">Login</Link>
        <Link to="/forum">Forums</Link>
        {isAuth && (
          <Button onClick={handleLogout} colorScheme="teal">
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
