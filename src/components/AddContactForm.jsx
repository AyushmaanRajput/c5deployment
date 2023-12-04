import { Box, Button, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { postContact } from "../redux/contact/action";

export const AddContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    label: "",
    phone: null,
  });

  const dispatch = useDispatch();
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    dispatch(postContact(formData, toast, onClose));
  }

  return (
    <Box py={4} pt={0}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={2}>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FormHelperText>Enter your Full Name.</FormHelperText>
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormHelperText>Enter your email.</FormHelperText>
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            type="tel"
            required
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <FormHelperText>Enter your Phone Number.</FormHelperText>
        </FormControl>
        <FormControl mb={6}>
          <Select
            placeholder="Select Label For Contact"
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
          >
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
          </Select>
          <FormHelperText>Select A Label for the Contact.</FormHelperText>
        </FormControl>
        <Button type="submit" colorScheme="pink">
          Add Contact
        </Button>
      </form>
    </Box>
  );
};
