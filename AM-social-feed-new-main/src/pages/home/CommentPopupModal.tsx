import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { Avatar, Card, Grid, Modal, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import CarouselSlider from "react-carousel-slider";
import { authenticationService } from "../../utils/auth.service";
import ImageDisplayCommentPopup from "./ImageDisplayCommentPopup";

import CommentDisplay from "./CommentDisplay";

function CommentPopupModal({
  open,
  setOpen,
  selectedPost,
  maxSteps,
  comments,
  likes,
  setLikes,
  checkTimeHandler,
  setComments,
}: any) {
  const handleClose = () => {
    setOpen(false);
    setCommentText("");
  };

  const [singleCommentId, setSingleCommentId] = useState("" as any);
  console.log("comments", comments);

  const liketoPost = (id: string) => {
    // console.log("hello like to post", id);
    authenticationService
      .likePost(id) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        setLikes((prev: any) => prev + 1);
      })
      .catch((error: any) => {
        console.log("error in like post");
      });
  };

  const likeColorHandler = (post: any) => {
    const activeUser = JSON.parse(localStorage.getItem("currentUser") || "");
    const data =
      post &&
      post.likes &&
      post.likes.filter((user: string) => user === activeUser._id);
    if (data && data.length > 0) return "red";
    else return "grey";
  };

  const [commentText, setCommentText] = useState<string>("");

  const commentPost = (postId: string) => {
    // console.log(postId, "   ", commentId);
    if (commentText.includes("@")) {
      // console.log(commentText);
      let a = commentText.split(" ");
      let comments = "";
      for (let i = 1; i < a.length; i++) {
        comments = comments + a[i] + " ";
      }

      // console.log(comments);
      authenticationService
        .replyComment(comments, postId, singleCommentId)
        .then((resp) => {
          setCommentText("");
          const cmnts = async () => {
            const comments = await authenticationService.getComments(postId);
            setComments(comments);
          };
          cmnts();
        });
    } else {
      authenticationService.addComment(postId, commentText).then((resp) => {
        setCommentText("");
        const cmnts = async () => {
          const comments = await authenticationService.getComments(postId);
          setComments(comments);
        };
        cmnts();
      });
    }
  };

  //like to comment handler

  console.log("check comments for likes", comments);
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", outline: "none" }}>
        <div style={{ width: "600px", height: "600px" }}>
          <ImageDisplayCommentPopup
            selectedPost={selectedPost}
            maxSteps={maxSteps}
          />
        </div>
        <div
          style={{
            width: "450px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <Box sx={{ mt: "-10px" }}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <Avatar
                    src={
                      selectedPost &&
                      selectedPost._user &&
                      selectedPost._user.image
                    }
                    sx={{
                      height: "40px",
                      width: "40px",
                      mt: "8px",
                      ml: "16px",
                    }}
                  ></Avatar>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      width: "103px",
                      height: "22px",
                      margin: "0 16px",
                      textAlign: "left",
                    }}
                  >
                    {selectedPost?._user?.firstname}
                  </p>
                  <p
                    style={{
                      fontWeight: "600px",
                      fontSize: "14px",
                      height: "22px",
                      color: "#637381",
                      margin: "0 16px",
                      textAlign: "left",
                      // marginTop: "22px",
                    }}
                  >
                    Kolhapur
                  </p>
                </div>
              </div>
            </Typography>{" "}
            <p style={{ margin: "7px 0 0 72px", textAlign: "left" }}>
              {selectedPost?.caption}
            </p>
          </Box>
          <Box>
            <Card sx={{ mt: "11px" }}>
              <Grid
                style={{
                  height: "342px",
                  overflowY: "scroll",
                  borderRadius: "2px",
                }}
              >
                <CommentDisplay
                  comments={comments}
                  setCommentText={setCommentText}
                  setSingleCommentId={setSingleCommentId}
                  selectedPost={selectedPost}
                  setComments={setComments}
                  expanded={expanded}
                  setExpanded={setExpanded}
                />
              </Grid>
            </Card>{" "}
          </Box>
          <FavoriteBorderIcon
            sx={{
              display: "list-item",
              ml: "19.33px",
              mt: "9px",
              mb: "11px",
              height: "29px",
              width: "27px",
              color: likeColorHandler(selectedPost),
              fontSize: "30px",
            }}
            onClick={() => liketoPost(selectedPost._id)}
          />
          <p
            style={{
              marginLeft: "16.33px",
              display: "flex",
              width: "50px",
              height: "11px",
              fontWeight: "400",
              marginTop: "unset",
            }}
          >
            {selectedPost?.likes?.length} likes
          </p>
          <p
            style={{
              display: "flex",

              color: "#919EAB",
              // width: "70px",
              marginTop: "4px",
              height: "18px",
              fontWeight: "450",
              fontSize: "15px",
              lineHeight: "18px",
              marginLeft: "16.33px",
            }}
          >
            {checkTimeHandler}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "6px",
              height: "37px",
              alignSelf: "stretch",
              padding: "4px 0px 4px 16px",
            }}
          >
            <p
              style={{
                marginTop: "5%",
                // width: "25px",

                fontSize: "22px",
                marginRight: "8px",
              }}
            >
              &#128512;
            </p>
            <TextField
              // style={{ marginTop: "5px" }}
              id="standard-basic"
              // label="Comment"
              sx={{
                // border: "1px solid red",
                fontSize: "14px",
                width: "321px",
                height: "28px",
                fontWeight: "400",
                textAlign: "center",
                mt: "-2px",
              }}
              value={commentText}
              placeholder="comment"
              variant="standard"
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              onChange={(e) => setCommentText(e.target.value)}
            />{" "}
            <Button
              onClick={() => commentPost(selectedPost._id)}
              variant="text"
              sx={{ ml: "22px" }}
            >
              Post
            </Button>
          </div>
        </div>{" "}
      </Box>
    </Modal>
  );
}

export default CommentPopupModal;
