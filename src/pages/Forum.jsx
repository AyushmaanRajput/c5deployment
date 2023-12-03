import { Box, Divider, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ForumModal } from "../components/forum/ForumModal";
import { Forums } from "../components/forum/Forums";
import { useDispatch } from "react-redux";
import { getForums } from "../redux/appReducer/action";
import { Pagination } from "../components/common/Pagination";

export const Forum = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [page, setPage] = useState(1);

  useEffect(() => {
    let params = {
      _page: page,
      _limit: 5,
    };
    dispatch(getForums(toast, params));
  }, [page]);

  return (
    <Box p={4}>
      <ForumModal />
      <Divider my={10} />
      <Forums page={page} setPage={setPage} />
      <Pagination page={page} setPage={setPage} />
    </Box>
  );
};
