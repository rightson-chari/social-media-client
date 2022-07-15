import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import Posts from "../componets/Posts";
import BottomBar from "../componets/BottomBar";
import SinglePost from "../componets/SinglePost";
import Feed from "../componets/Feed";

const Container = styled.div`
  background-color: black;
  min-height: 100vh;
`;
const Post = () => {
  const params = useParams();
  const [image, setImage] = useState();
  const id = params.id;
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tweet, setTweet] = useState("");

  useEffect(() => {
    axios
      .get(`/post/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTweet(res.data));
  }, [id]);

  return (
    <Container>
      <BottomBar open={open} handleClose={handleClose} info={info} />
      {tweet ? (
        <SinglePost
          key={tweet._id}
          tweet={tweet}
          image={image}
          handleOpen={handleOpen}
          setInfo={setInfo}
        />
      ) : (
        ""
      )}
      <Feed comment={`/comment/post/${id}`} />
    </Container>
  );
};

export default Post;
