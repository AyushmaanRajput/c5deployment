import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteForum } from "../../redux/appReducer/action";

export const AnswerCard = ({ forum }) => {
  //   console.log(forum.question.userAvatar?.slice(0, 4));
  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  const dispatch = useDispatch();
  // const navigate=useNavigate();
  const toast = useToast();
  function addLikeHandler() {}

  function deleteQuestionHandler() {
    dispatch(deleteForum(forum.id, toast));
  }
  return (
    <Flex
      p={4}
      border={"1px solid #3333"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"} justifyContent={"flex-start"} gap={4}>
        <Box textAlign={"center"}>
          <Avatar
            mb={2}
            size="xl"
            name={forum.question.username}
            src={
              forum.question.userAvatar?.slice(0, 4) == "http"
                ? forum.question.userAvatar
                : "https://bit.ly/code-beast"
            }
          ></Avatar>
          <Text
            textTransform={"uppercase"}
            fontWeight={"500"}
            letterSpacing={"1px"}
          >
            {forum.question.username}
          </Text>
        </Box>
        <Box px={4} justifySelf={"flex-start"}>
          <Heading as="h4" mb={2}>
            {forum.question.questionTitle}
          </Heading>
          <Text as="p" mb={4}>
            {forum.question.questionDescription}
          </Text>
          <Flex
            gap={4}
            mb={4}
            alignItems={"center"}
            justifyContent={"flex-start"}
          >
            <Button size="sm" variant={"outline"}>
              {forum.question.language}
            </Button>
            <Button size="sm" variant={"outline"}>
              {forum.question.postedDate}
            </Button>
            <Button size="sm" variant={"outline"}>
              {forum.question.answers}
            </Button>
          </Flex>
          {forum.question.username == loggedInUser.username &&
            forum.question.userAvatar == loggedInUser.userAvatar && (
              <Flex gap={2} mb={4}>
                <Button size="sm" variant={"outline"} colorScheme="teal">
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={deleteQuestionHandler}
                >
                  Delete
                </Button>
              </Flex>
            )}
        </Box>
      </Flex>
      <Flex>
        <Box>
          <Button onClick={addLikeHandler} colorScheme="teal" mb={2}>
            Like
          </Button>
          <Text fontWeight={"500"} letterSpacing={"1px"}>
            {forum.question.upvotes} upvotes
          </Text>
          <Text fontWeight={"500"} letterSpacing={"1px"}>
            {forum.question.answers} answers
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
