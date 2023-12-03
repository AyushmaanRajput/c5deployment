import {
  Box,
  Button,
  Divider,
  Heading,
  Textarea,
  useToast,
  Flex,
  Avatar,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnswerCard } from "../components/answer/AnswerCard";
import { useNavigate } from "react-router-dom";
import { updateForum } from "../redux/appReducer/action";

export const Answer = () => {
  const currentForum = useSelector((store) => store.appReducer.currentForum);
  const loggedInUser = useSelector((store) => store.authReducer.loggedInUser);
  // console.log(currentForum, "answer");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  let [value, setValue] = React.useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  function addAnswerHandler() {
    dispatch(
      updateForum(
        {
          ...currentForum,
          answers: [
            ...currentForum.answers,
            {
              userAvatar: loggedInUser.userAvatar,
              username: loggedInUser.username,
              postedDate: new Date().toDateString(),
              answerText: value,
            },
          ],
        },
        currentForum.id,
        toast
      )
    );
  }

  return (
    <Box p={8}>
      <AnswerCard forum={currentForum} />
      <Box py={4}>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Add Your Answer Here"
          size="md"
          mb={4}
        />
        <Button colorScheme="teal" onClick={addAnswerHandler}>
          Post Answer
        </Button>
      </Box>
      <Divider my={2} />
      <Box py={4}>
        <Heading as="h5" size="md" mb={4}>
          Answers {currentForum.answers.length}
        </Heading>
        {currentForum.answers.map((answer, i) => {
          return (
            <Box key={i}>
              <Flex
                alignItems={"center"}
                justifyContent={"flex-start"}
                gap={2}
                mb={4}
                boxShadow={"md"}
                p={2}
                borderRadius={4}
                border={"1px solid #3333"}
              >
                <Box textAlign={"center"}>
                  <Avatar
                    mb={2}
                    size="md"
                    name={answer.username}
                    src={
                      answer.userAvatar?.slice(0, 4) == "http"
                        ? answer.userAvatar
                        : "https://bit.ly/code-beast"
                    }
                  ></Avatar>
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={"500"}
                    letterSpacing={"1px"}
                  >
                    {answer.username}
                  </Text>
                </Box>
                <Box px={4} justifySelf={"flex-start"}>
                  <Text as="p" mb={4}>
                    {answer.answerText}
                  </Text>
                </Box>
              </Flex>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
