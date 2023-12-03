import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ForumCard } from "./ForumCard";
import { Pagination } from "../common/Pagination";
import { Box } from "@chakra-ui/react";

export const Forums = ({ page, setPage }) => {
  const { isLoading, isError, forums } = useSelector(
    (store) => store.appReducer
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <Box>
      {forums.length > 0 &&
        forums.map((forum, i) => {
          return <ForumCard key={i} forum={forum} />;
        })}

      
    </Box>
  );
};
