import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import { Box, Button, Flex, Heading, useToast } from "@chakra-ui/react";
import "react-calendar/dist/Calendar.css";
import { bookSlot, getSlotsForDay } from "../redux/appointment/action";

export const Appointment = () => {
  const { isLoading, isError, selectedContact, slots } = useSelector(
    (store) => store.appointmentReducer
  );
  const [value, setValue] = useState(new Date());
  // console.log(value.getDay());
  // console.log(isLoading, isError, selectedContact, slots);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(
      getSlotsForDay(
        value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear(),
        toast
      )
    );
  }, [value]);

  let arr = [
    "8:30 AM - 2:00 PM",
    "9:00 AM - 2:00 PM",
    "9:30 AM - 4:30 PM",
    "11:00 AM - 7:00 PM",
    "5:30 AM - 8:30 PM",
  ];
  function handleSlotBooking(el, i) {
    let obj = {
      time: el,
      date:
        value.getDate() + "-" + value.getMonth() + "-" + value.getFullYear(),
      userId: selectedContact._id,
    };
    console.log(obj);
    dispatch(bookSlot(obj, toast));
  }
  return (
    <>
      <Flex
        p={4}
        // alignItems={"center"}
        justifyContent="space-between"
        flexWrap={"wrap"}
        gap={4}
      >
        <Box
          w={"fit-content"}
          p={4}
          border="1px solid #3333"
          borderRadius={8}
          boxShadow={"lg"}
        >
          <Calendar
            onChange={setValue}
            value={value}
            tileDisabled={({ date }) => date < new Date().getDate()}
          />
        </Box>
        <Box height={"100%"}>
          <Heading mb={4}>Avaiable Slots</Heading>
          {arr.map((el, i) => {
            return (
              <Button
                key={i}
                colorScheme="pink"
                variant={value.getDay() !== 0 ? "solid" : "disabled"}
                disabled={value.getDay() == 0}
                mx={2}
                my={2}
                onClick={() => {
                  handleSlotBooking(el, i);
                }}
              >
                {el}
              </Button>
            );
          })}
        </Box>
      </Flex>
      <Box p={4}>
        <Heading>Booked Slots For Selected Date</Heading>
        <Box>
          {slots.length > 0 &&
            slots.map((el, i) => {
              return (
                <Box key={i} p={4} boxShadow={"md"} fontWeight={500}>
                  Date : {el.date} at {el.time} by {el.userId.name}
                </Box>
              );
            })}
        </Box>
      </Box>
    </>
  );
};
