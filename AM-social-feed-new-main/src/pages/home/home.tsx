import React, { useState, useEffect, Fragment } from "react";
import "./home.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { authenticationService } from "../../utils/auth.service";
import CommentPopupModal from "./CommentPopupModal";
export default function Login() {
  // const token = Cookie.get("_token");

  const [posts, setPosts] = useState<any>([]);
  const [likes, setLikes] = useState<any>(0);
  const [selectedPost, setSelectedPost] = useState<any>([]);

  useEffect(() => {
    const getPosts = async () => {
      let a = await authenticationService.getAllPosts();
      console.log(a);
      setPosts(a);
      // let b = a.results.find((ele: any) => ele._id === selectedPost?._id);
      // console.log("b is ", b);
      // setSelectedPost(b);
    };
    getPosts();
  }, [likes]);

  // console.log(selectedPost);
  const renderSlides = (imgArr: string[]) =>
    imgArr.map((imagePath) => (
      <CardMedia
        component="img"
        height="100%"
        width="100%"
        sx={{
          objectFit: "fill",
          height: "550px",
          width: "1000px",
        }}
        image={`http://localhost:8080/image/${imagePath}`}
        alt="Paella dish"
      />
    ));

  const liketoPost = (id: string) => {
    authenticationService
      .likePost(id) //{ email: "fake@example.com", password: "akash@123" })
      .then((response: any) => {
        setLikes((prev: any) => prev + 1);
        console.log("hello like");
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
  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState<string>("");

  const commentPost = (postId: string) => {
    // console.log(postId);
    authenticationService.addComment(postId, commentText).then((resp) => {
      setCommentText("");
      const cmnts = async () => {
        const comments = await authenticationService.getComments(postId);
        setComments(comments);
      };
      cmnts();
    });
  };

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const [maxSteps, setmaxSteps] = useState(0);

  const setDisplayComment = (post: any) => {
    setSelectedPost(post);
    setmaxSteps(post.images.length);
    console.log("comments");
    setOpen(true);
    const cmnts = async () => {
      const comments = await authenticationService.getComments(post._id);
      setComments(comments);
    };
    cmnts();
  };

  function checkTimeHandler(post: any) {
    const date1 = new Date();
    const date2 = new Date(post?.createdAt);

    // console.log(getDifferenceInDays(date1, date2));
    // console.log(getDifferenceInHours(date1, date2));
    // console.log(getDifferenceInMinutes(date1, date2));
    // console.log(getDifferenceInSeconds(date1, date2));
    // console.log(getMonthDifference(date2, date1));
    function getDifferenceInDays(date1: any, date2: any) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60 * 24);
    }

    function getDifferenceInHours(date1: any, date2: any) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60);
    }

    function getDifferenceInMinutes(date1: any, date2: any) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60);
    }

    function getDifferenceInSeconds(date1: any, date2: any) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / 1000;
    }
    function getMonthDifference(date1: any, date2: any) {
      return (
        date2.getMonth() -
        date1.getMonth() +
        12 * (date2.getFullYear() - date1.getFullYear())
      );
    }
    if (getMonthDifference(date2, date1) > 12) {
      return parseInt(getMonthDifference(date2, date1) / 12) + "Years ago";
    } else if (getMonthDifference(date2, date1) >= 1) {
      return parseInt(getMonthDifference(date2, date1)) + " months ago";
    } else if (getDifferenceInDays(date1, date2) === 1) {
      return "yesterday";
    } else if (
      getDifferenceInDays(date1, date2) >= 1 &&
      getDifferenceInDays(date1, date2) < 31
    ) {
      return parseInt(getDifferenceInDays(date1, date2)) + " days ago";
    } else if (getDifferenceInHours(date1, date2) >= 1) {
      return parseInt(getDifferenceInHours(date1, date2)) + " hours ago";
    } else if (getDifferenceInMinutes(date1, date2) >= 1) {
      return parseInt(getDifferenceInMinutes(date1, date2)) + " minutes ago";
    } else {
      return parseInt(getDifferenceInSeconds(date1, date2)) + " seconds ago";
    }
  }
  console.log("first", posts);
  const [expanded, setExpanded] = React.useState(false);
  const [id, setId] = useState(-1);
  const handleExpandClick = (i: any) => {
    console.log(i);
    setId(i);
    setExpanded(!expanded);
  };
  return (
    <div>
      <Box>
        {/* <AddPost value={setCnt} /> */}
        {posts &&
          posts &&
          posts.map((post: any, i: any) => (
            <div
              style={{
                marginTop: "68px",
              }}
            >
              <Card className="postDisplay">
                {/* <CardHeader
                  avatar={
                    post._user.image ? (
                      <Avatar
                        className="Avatar"
                        src={post?._user?.image}
                        aria-label="recipe"
                      ></Avatar>
                    ) : (
                      <Avatar sx={{ backgroundColor: "blue" }}>
                        {post._user.firstname[0].toUpperCase()}
                      </Avatar>
                    )
                  }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
                  title={
                    <div>
                                    <p>{post.postedBy.username}</p>

                      <p className="userName">{post._user.firstname}</p>
                      <p style={{ marginTop: "-20px" }}>Goa</p>
                    </div>
                  }
                  // subheader={`posted by: ${post._user.firstname}`}
                /> */}
                <CardHeader
                  title={
                    <div>
                      <p>{post.postedBy.username}</p>
                      {/* 
                      <p className="userName">{post._user.firstname}</p>
                      <p style={{ marginTop: "-20px" }}>Goa</p> */}
                    </div>
                  }
                />
                <div>
                  <Slider
                    dots={false}
                    slidesToShow={1}
                    slidesToScroll={1}
                    // autoplay={true}
                    // autoplaySpeed={3000}
                  >
                    {renderSlides(post.images)}
                  </Slider>
                </div>

                <CardActions disableSpacing>
                  {/* <IconButton aria-label="add to favorites"> */}

                  {/* <FavoriteIcon
                    style={{
                      // color: post.likes.length > 0 ? "red" : "",
                      color: likeColorHandler(post),
                      fontSize: "30px",
                    }}
                    onClick={() => liketoPost(post._id)}
                  /> */}
                  {/* </IconButton> */}
                  {/* {post.likes.length} */}
                  <ChatBubbleOutlineIcon
                    sx={{
                      fontSize: "30px",
                      ml: "10px",
                    }}
                  />
                </CardActions>
                <CardActions
                  sx={{
                    ml: "10px",
                    mt: "-20px",
                  }}
                >
                  {/* <p className="userFirstName">{post._user.firstname}</p> */}
                  <p className="caption">{post.caption}</p>
                </CardActions>
                <p
                  style={{
                    color: "#7A8888",
                    marginTop: "-10px",
                    marginLeft: "18px",
                    cursor: "pointer",
                  }}
                  onClick={() => setDisplayComment(post)}
                >
                  {" "}
                  View all 6 comments
                </p>
                <p className="timeHandler">{checkTimeHandler(post)}</p>
                <hr
                  style={{
                    borderColor: "rgba(145, 158, 171, 0.24)",
                    // position: "absolute",
                    // height: "1px",
                  }}
                />
                <CardActions>
                  <div className="textfieldAndEmoji">
                    <p
                      style={{
                        marginTop: "-1%",
                        width: "25px",

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
                        fontSize: "14px",
                        width: "490px",
                        height: "22px",
                        fontWeight: "400",
                        mt: "-7%",
                      }}
                      // value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="comment"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true, // <== added this
                      }}
                    />{" "}
                    <Button
                      onClick={() => commentPost(post.id)}
                      variant="text"
                      sx={{ mt: "-25px" }}
                    >
                      Post
                    </Button>
                  </div>
                </CardActions>
              </Card>
            </div>
          ))}
        <div>
          <CommentPopupModal
            open={open}
            setOpen={setOpen}
            selectedPost={selectedPost}
            maxSteps={maxSteps}
            comments={comments}
            likes={likes}
            setLikes={setLikes}
            checkTimeHandler={checkTimeHandler(selectedPost)}
            setComments={setComments}
          />
        </div>
      </Box>
    </div>
  );
}
