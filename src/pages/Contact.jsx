import React, { useEffect, useState } from "react";
import { Box, Button, Divider, useToast } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact, getContacts } from "../redux/contact/action";
import { AddContact } from "../components/AddContact";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditContactForm } from "../components/EditContactForm";
import { SELECT_CONTACT } from "../redux/appointment/actionTypes";
import { useNavigate } from "react-router-dom";

export const Contact = () => {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contact, setContact] = useState(null);
  const { isLoading, isError, contacts, totalPages } = useSelector(
    (store) => store.contactReducer
  );
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  console.log(isLoading, isError, contacts, totalPages);
  useEffect(() => {
    let params = {
      page: page,
      limit: 10,
    };
    dispatch(getContacts(params, toast));
  }, []);

  function editContactHandler(e, contact) {
    e.stopPropagation();
    setContact(contact);
    onOpen();
  }

  function handleSelection(contact) {
    dispatch({ type: SELECT_CONTACT, payload: contact });
    navigate("/appointment");
  }

  return (
    <Box p={8}>
      <AddContact />
      <Divider my={10}></Divider>
      <TableContainer>
        {isLoading ? (
          <h1>...Loading</h1>
        ) : isError ? (
          <h1>...Error</h1>
        ) : (
          <Table variant="striped" colorScheme="pink">
            <TableCaption>Contacts</TableCaption>
            <Thead>
              <Tr>
                <Th>Full Name</Th>
                <Th>Email</Th>
                <Th isNumeric>Phone Number</Th>
                <Th>Label</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contacts.length > 0 &&
                contacts.map((contact) => {
                  return (
                    <Tr
                      key={contact._id}
                      onClick={() => handleSelection(contact)}
                    >
                      <Td>{contact.name}</Td>
                      <Td>{contact.email}</Td>
                      <Td>+91 {contact.phone}</Td>
                      <Td>{contact.label}</Td>
                      <Td display="flex" gap={2}>
                        <Button
                          colorScheme="pink"
                          variant="outline"
                          onClick={(e) => editContactHandler(e, contact)}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent
                            dispatch(deleteContact(contact._id, toast));
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        )}
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditContactForm contact={contact} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
