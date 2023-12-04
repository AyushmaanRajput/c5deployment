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
import { postContact, updateContact } from "../redux/contact/action";

export const EditContactForm = ({ contact, onClose }) => {
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    label: contact.label,
    phone: contact.phone,
  });

  const dispatch = useDispatch();
  const toast = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    dispatch(updateContact(contact._id, formData, toast, onClose));
  }

  return (
    <Box py={4} pt={0}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={2}>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            value={formData.name}
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
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FormHelperText>Enter your email.</FormHelperText>
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            value={formData.phone}
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
            value={formData.label}
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
          Update Contact
        </Button>
      </form>
    </Box>
  );
};
