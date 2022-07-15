import Avatar from "@mui/material/Avatar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiMessageRounded } from "react-icons/bi";
import MoreVert from "@mui/icons-material/MoreVert";
import Favorite from "@mui/icons-material/Favorite";
import axios from "axios";
import { format } from "timeago.js";
import {
  AiOutlineRetweet,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import BottomBar from "./BottomBar";
import { SettingsInputCompositeOutlined } from "@mui/icons-material";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Container = styled.div`
  width: 100%;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const Right = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
`;
const Left = styled.div`
  flex: 1;
`;
const Name = styled.h5`
  margin: 0;
  display: flex;
  justify-content: space-between;
  padding: 0;
  color: white;
`;
const Tweet = styled.div`
  margin: 0.2rem;
  color: white;
  display: flex;
  flex-direction: column;
`;
const Image = styled.img`
  border-radius: 10px;
  max-height: 250px;
  width: 100%;
  width: 100%;

  margin-top: 10px;
`;
const More = styled.div`
  margin: 0.3rem 0 0 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  width: 80%;
`;
const Comment = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const Top = styled.div`
  color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  opacity: 0.6;
  cursor: "pointer";
`;
const Posts = ({ tweet, image, handleOpen, setInfo, setPostId, block }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(tweet.likes.length);

  const [retweet, setRetweet] = useState(false);
  const [retweets, setRetweets] = useState(tweet.retweets.length);
  let id = localStorage.getItem("user");
  if (id) {
    id = JSON.parse(id);
    id = id._id;
  }

  const handleNavigate = (url) => {
    navigate(url);
  };
  const userId = tweet.userId;

  useEffect(() => {
    if (!tweet) return;
    axios
      .get(`/user?userId=${tweet.userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setUser(data);
      });
  }, [userId]);

  useEffect(() => {
    setLike(tweet.likes.includes(id));
  }, [tweet._id]);
  useEffect(() => {
    setRetweet(tweet.retweets.includes(id));
  }, [tweet._id]);
  const handleLike = () => {
    axios.put(
      `post/${tweet._id}/like`,
      {
        userId: user._id,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setLikes(like ? likes - 1 : likes + 1);
    setLike(!like);
  };
  const handleRetweet = () => {
    axios.put(
      `/post/${tweet._id}`,
      {
        userId: user._id,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRetweets(retweet ? retweet - 1 : retweets + 1);
    setRetweet(!retweet);
  };

  return (
    <>
      {tweet.retweets.includes(id) && !block && (
        <Top>
          {" "}
          <span
            onClick={handleRetweet}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              color: "white",
            }}
          >
            <span>You retweeted</span>
            <AiOutlineRetweet
              style={{
                color: "white",
                cursor: "pointer",
              }}
            />
          </span>
        </Top>
      )}
      <Container>
        <Left>
          <Avatar
            src={`${PF}/post/${user.profilePicture}`}
            sx={{ flex: 1, cursor: "pointer" }}
            onClick={() => handleNavigate(`/profile/${user.username}`)}
          />
        </Left>
        <Right>
          <Name>
            {user ? user.username : null}
            <span style={{ fontWeight: "300" }}>
              {tweet ? format(tweet.createdAt) : format(user.createdAt)}
            </span>
            <MoreVert
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setInfo(user);
                setPostId(tweet._id);
                handleOpen();
              }}
            />{" "}
          </Name>
          <Tweet
            onClick={() => navigate(`/post/${tweet._id}`)}
            style={{ cursor: "pointer" }}
          >
            {tweet.tweet || tweet.comment}
            {tweet.photo && <Image src={`${PF}/post/${tweet.photo}`} />}
          </Tweet>
          <More>
            <Comment onClick={() => navigate(`/tweets/${tweet._id}`)}>
              <BiMessageRounded style={{ color: "white" }} />
            </Comment>

            <Comment>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "white",
                }}
              >
                <AiOutlineRetweet
                  style={{
                    color: retweet ? "rgb(25,118,210)" : "white",
                    cursor: "pointer",
                  }}
                  onClick={handleRetweet}
                />
                {retweets}
              </span>
            </Comment>
            <Comment>
              {like ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "white",
                  }}
                >
                  <Favorite
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "17px",
                    }}
                    onClick={handleLike}
                  />
                  {likes}
                </span>
              ) : (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "white",
                  }}
                >
                  <AiOutlineHeart
                    style={{ color: "white", cursor: "pointer" }}
                    onClick={handleLike}
                  />
                  {likes}
                </span>
              )}
            </Comment>
            <Comment>
              <AiOutlineShareAlt style={{ color: "white" }} />
            </Comment>
          </More>
        </Right>
      </Container>
    </>
  );
};

export default Posts;
