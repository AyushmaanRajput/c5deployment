import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { Box, FormControl, Heading, Input, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postForum } from "../../redux/appReducer/action";

export const ForumModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  console.log(loggedInUser);
  const [formData, setFormData] = useState({
    username: "",
    userAvatar: "",
    questionTitle: "",
    questionDescription: "",
    upvotes: 0,
    postedDate: null,
    language: "",
    answers: 0,
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let date = new Date().toDateString();
    let newDate = date;
    console.log(newDate);
    // console.log(formData);
    dispatch(
      postForum(
        {
          answers: [],
          question: {
            ...formData,
            username: loggedInUser.username,
            userAvatar: loggedInUser.userAvatar,
            postedDate: newDate,
          },
        },
        toast,
        navigate
      )
    );
  }
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size={"lg"}>
        Ask Question
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ask A Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={4}>
            <form onSubmit={handleSubmit}>
              <FormControl mb={2}>
                <label>Question Title:</label>
                <br />
                <Input
                  placeholder="Enter the title of the question"
                  onChange={(e) =>
                    setFormData({ ...formData, questionTitle: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mb={2}>
                <label>Question Description:</label>
                <br />
                <Textarea
                  placeholder="Add description for the question"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      questionDescription: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mb={2}>
                <label>Language Used:</label>
                <br />
                <Select
                  placeholder="Select A Language"
                  onChange={(e) =>
                    setFormData({ ...formData, language: e.target.value })
                  }
                >
                  <option value="Javascript">Javascript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                </Select>
              </FormControl>

              <Flex gap={4} justifyContent={"flex-end"} alignItems={"center"}>
                <Button
                  colorScheme="teal"
                  variant={"outline"}
                  onClick={onClose}
                >
                  Close
                </Button>
                <Input
                  colorScheme="teal"
                  type="submit"
                  value="Ask Question"
                  bg="teal"
                  color="white"
                  w="fit-content"
                />
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
