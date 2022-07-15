import React, { useState } from "react";
import styled from "styled-components";
import Cancel from "@mui/icons-material/Cancel";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useEffect } from "react";
import axios from "axios";
import Posts from "../componets/Posts";
import Picker from "emoji-picker-react";
import { Drawer } from "@mui/material";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 1);
`;
const Span = styled.button`
  color: white;
  background: ${(params) =>
    params.empty ? "transparent" : "rgb(25, 118, 210)"};
  width: 80px;
  height: 30px;
  border-radius: 30px;
`;
const Draft = styled.button`
  color: white;
  background: rgb(25, 118, 210);
  width: 70px;
  height: 30px;
  border-radius: 30px;
`;
const Nav = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  position: sticky;
  z-index: 10;
  top: -2px;
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.9);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  justify-content: center;
  height: 30px;
  width: 30px;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  gap: 1rem;
`;
const ShareHolder = styled.div`
  box-shadow: inset 4px 2px 5px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;
const Input = styled.input`
  width: 90%;
  padding: 0.7rem;
  border: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  outline: none;
  color: white;
`;
const Options = styled.div`
  display: flex;
  margin-left: 4rem;
  flex-wrap: wrap;
  gap: 1rem;
`;
const Item = styled.div`
  display: flex;
  color: rgb(25, 118, 210);
  margin-left: 10px;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
`;
const Image = styled.img`
  border-radius: 10px;
  max-height: 250px;
  width: 100%;
  width: 100%;
  margin-top: 10px;
`;
const ImageHolder = styled.div`
  position: relative;
  margin: 1rem;
`;
const CancelImage = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
`;
const Tweet = () => {
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [currentPost, setCurrentPost] = useState("");
  const [postUser, setPostUser] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [file, setFile] = useState(null);
  const [empty, setEmpty] = useState(true);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (!postId) return;

    axios
      .get(`/post/${postId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data;

        setCurrentPost(data);
      });
  }, []);

  useEffect(() => {
    if (!postId) return;
    axios
      .get(`/user?userId=${currentPost.userId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setPostUser(data);
      });
  }, [currentPost]);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setPost(`${post} ${emojiObject.emoji}`);
  };

  useEffect(() => {
    setEmpty(!post.length > 0);
  }, [post]);
  let id = localStorage.getItem("user");
  id = JSON.parse(id);
  id = id._id;
  useEffect(() => {
    axios
      .get(`/user?userId=${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setUser(data);
      });
  }, []);

  const handleTweet = () => {
    if (empty) {
      return;
    }

    const data = { userId: id, tweet: post };
    if (file) {
      const dataFile = new FormData();
      const fileName = `${Date.now()}${file.name}`;
      function renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
          type: originalFile.type,
          lastModified: originalFile.lastModified,
        });
      }
      const newFile = renameFile(file, fileName);
      dataFile.append("file", newFile);
      dataFile.append("name", fileName);
      data.photo = fileName;
      axios.post("/upload", dataFile, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFile(null);
    }

    axios
      .post("/post", data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res.data));
    setPost("");
    setEmpty(true);
  };
  const handleComment = () => {
    if (empty) {
      return;
    }

    const data = { userId: id, comment: post };
    if (file) {
      const dataFile = new FormData();
      const fileName = `${Date.now()}${file.name}`;
      function renameFile(originalFile, newName) {
        return new File([originalFile], newName, {
          type: originalFile.type,
          lastModified: originalFile.lastModified,
        });
      }
      const newFile = renameFile(file, fileName);
      dataFile.append("file", newFile);
      dataFile.append("name", fileName);
      data.photo = fileName;
      axios.post("/upload", dataFile, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFile(null);
    }
    axios
      .post(`/comment/${postId}`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => console.log(res.data));
    setPost("");
    setEmpty(true);
  };

  return (
    <Container>
      <Nav>
        <Back>
          <Link to="/">
            <ArrowBack sx={{ color: "white" }} />
          </Link>
        </Back>
        <Right>
          <Span
            empty={empty}
            onClick={postId ? handleComment : handleTweet}
            style={{ cursor: "pointer" }}
          >
            {postId ? "Comment" : "Tweet"}
          </Span>
          <Draft>Draft</Draft>
        </Right>
      </Nav>
      <ShareHolder>
        {currentPost ? (
          <Content>
            <Posts tweet={currentPost} block="block" />
          </Content>
        ) : null}

        <Content>
          <Avatar src={`${PF}/post/${user.profilePicture}`} />
          <Input value={post} onChange={(e) => setPost(e.target.value)} emoji />
        </Content>
        <Options>
          <Item>
            <label htmlFor="file">
              {" "}
              <PhotoSizeSelectActualIcon />
            </label>

            <label htmlFor="file"> Photos or Videos</label>

            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept=".png,.jpeg,.jpg"
              onChange={(e) => {
                setEmpty(false);
                setFile(e.target.files[0]);
              }}
            />
          </Item>
          <Item>
            <GifIcon />
            Gif
          </Item>
          <Item onClick={() => setEmoji(true)}>
            <EmojiEmotionsIcon />
            Emoji
          </Item>
        </Options>
        {file && (
          <ImageHolder>
            <Image src={URL.createObjectURL(file)} />
            <CancelImage
              onClick={() => {
                setFile(null);
                setEmpty(true);
              }}
              sx={{ cursor: "pointer" }}
            >
              <Cancel sx={{ color: "white" }} />
            </CancelImage>
          </ImageHolder>
        )}

        <Drawer anchor="bottom" open={emoji} onClose={() => setEmoji(false)}>
          <div style={{ margin: "1rem auto" }}>
            <Picker
              style={{ background: "black" }}
              onEmojiClick={onEmojiClick}
            />
          </div>
        </Drawer>
      </ShareHolder>
    </Container>
  );
};

export default Tweet;
