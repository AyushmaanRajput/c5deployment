import { Box, FormControl, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/auth/action";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    dispatch(loginUser(formData, toast, navigate));
  }
  return (
    <Box
      p={4}
      boxShadow={"md"}
      borderRadius={"lg"}
      w="min(40rem,100%)"
      mx="auto"
      mt={150}
    >
      <Heading mb="4">Login</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={2}>
          <label>Email:</label>
          <br />
          <Input
            type="email"
            placeholder="Enter Email Address"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </FormControl>
        <FormControl mb={2}>
          <label>Password:</label>
          <br />
          <Input
            tyep="password"
            placeholder="Enter password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </FormControl>
        <Input
          type="submit"
          width="auto"
          value="Login"
          bg="teal"
          color="white"
          mt={4}
        />
      </form>
    </Box>
  );
};
