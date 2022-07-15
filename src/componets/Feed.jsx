import { Refresh } from "@mui/icons-material";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BottomBar from "./BottomBar";
import Posts from "./Posts";
const Feed = ({ likes, media, comment, replies }) => {
  const [tweets, setTweets] = useState([]);
  const [image, setImage] = useState("");
  const [changer, setChanger] = useState(0);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState("");
  const [postId, setPostId] = useState("");
  const params = useParams();
  const username = params.username;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setImage("https://source.unsplash.com/random");

    fetch(
      replies
        ? replies
        : comment
        ? comment
        : likes
        ? likes
        : media
        ? media
        : username
        ? `/post/profile/${username}`
        : "/post/profile/timeline",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;

        if (data.length) {
          setTweets(data);
        }
      });
  }, [likes, media, username, comment]);

  return (
    <div style={{ position: "relative", paddingBottom: "50px" }}>
      <BottomBar
        open={open}
        handleClose={handleClose}
        info={info}
        postId={postId}
      />
      {tweets ? (
        tweets.map((tweet) => {
          return (
            <Posts
              key={tweet._id}
              tweet={tweet}
              image={image}
              handleOpen={handleOpen}
              setInfo={setInfo}
              setPostId={setPostId}
            />
          );
        })
      ) : comment ? (
        <button
          style={{
            color: "white",
            position: "absolute",
            left: 0,
            width: "200px",
            background: "rgb(25,118,210)",
            right: 0,
            margin: "10px auto",
            padding: ".5rem",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".6rem",
            cursor: "pointer",
          }}
        >
          Not Comments For This Post
        </button>
      ) : (
        <button
          style={{
            color: "white",
            position: "absolute",
            left: 0,
            width: "200px",
            background: "rgb(25,118,210)",
            right: 0,
            margin: "10px auto",
            padding: ".5rem",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: ".6rem",
            cursor: "pointer",
          }}
          onClick={() => window.location.reload()}
        >
          Not retrieved tweets <Refresh />
        </button>
      )}
    </div>
  );
};

export default Feed;
