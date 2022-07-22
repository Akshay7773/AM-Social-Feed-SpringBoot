import {
  Avatar,
  CardActions,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { authenticationService } from "../../utils/auth.service";

function CommentDisplay({
  comments,
  setCommentText,
  setSingleCommentId,
  selectedPost,
  setComments,
  expanded,
  setExpanded,
}: any) {
  console.log(comments);
  function checkTimeHandlerForComments(comment: any) {
    const date1 = new Date();
    const date2 = new Date(comment?.createdAt);

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
      return parseInt(getDifferenceInHours(date1, date2)) + " hrs";
    } else if (getDifferenceInMinutes(date1, date2) >= 1) {
      return parseInt(getDifferenceInMinutes(date1, date2)) + " min";
    } else {
      return parseInt(getDifferenceInSeconds(date1, date2)) + " sec";
    }
  }
  const setTheReply = (comments: any) => {
    // console.log("hello", comment);
    setCommentText(`@${comments._user.firstname} `);
    setSingleCommentId(comments._id);
  };
  function colourhandler(likes: any) {
    const activeUser = JSON.parse(localStorage.getItem("currentUser") || "");
    if (likes.includes(activeUser._id)) return "red";
    else return "grey";
  }
  const [id, setId] = useState(-1);
  const handleExpandClick = (i: any) => {
    console.log(i);
    setId(i);
    setExpanded(!expanded);
  };
  const likeToComment = async (postId: any, commentId: any, i: number) => {
    let b = await authenticationService.likeSingleComment(postId, commentId);
    // console.log(b.likes);
    let temp = [...comments];
    temp[i].likes = b.likes;
    setComments(temp);
  };

  const likeToReply = () => {
    authenticationService.likeToReply();
  };

  function checkTimeHandlerForReply(reply: any) {
    const date1 = new Date();
    const date2 = new Date(reply?.createdAt);

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
      return parseInt(getDifferenceInHours(date1, date2)) + " hrs";
    } else if (getDifferenceInMinutes(date1, date2) >= 1) {
      return parseInt(getDifferenceInMinutes(date1, date2)) + " min";
    } else {
      return parseInt(getDifferenceInSeconds(date1, date2)) + " sec";
    }
  }

  return (
    <div>
      {comments &&
        comments.map((cmnts: any, i: number) => (
          <div
            style={{
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                height: "60px",
                alignItems: "center",
              }}
            >
              <div>
                {cmnts?._user?.image !== "" ? (
                  <Avatar
                    src={cmnts?._user?.image}
                    sx={{
                      height: "40px",
                      width: "40px",
                      mt: "8px",
                      ml: "16px",
                    }}
                  ></Avatar>
                ) : (
                  <Avatar>{cmnts?.user?.firstname[0].toUpperCase()}</Avatar>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      height: "22px",
                      margin: "0 16px",
                      textAlign: "left",
                    }}
                  >
                    {cmnts?._user?.firstname}
                  </p>
                  <p
                    style={{
                      margin: "unset",
                      padding: "unset",
                      color: "#919EAB",
                      fontWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    {cmnts?.text}
                  </p>
                </div>
                <div style={{ display: "flex" }}>
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
                    {checkTimeHandlerForComments(cmnts)}
                  </p>
                  <p
                    style={{
                      margin: "unset",
                      padding: "unset",
                      color: "#919EAB",
                      fontWeight: "400",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                    onClick={() => setTheReply(cmnts)}
                  >
                    Reply
                  </p>
                </div>{" "}
                {cmnts?.replies.length ? (
                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        margin: "0 0 0 16px",
                        textAlign: "start",
                        padding: "unset",
                        color: "#919EAB",
                        fontWeight: "400",
                        fontSize: "14px",
                      }}
                    >
                      -
                    </p>
                    <CardActions disableSpacing>
                      <p
                        style={{
                          textAlign: "start",
                          margin: "0px 16px",
                          padding: "unset",
                          color: "#919EAB",
                          fontWeight: "400",
                          fontSize: "14px",
                          cursor: "pointer",
                        }}
                        expand={expanded}
                        onClick={() => handleExpandClick(i)}
                        aria-expanded={expanded}
                        aria-label="show more"
                        // onClick={() => displayComments()}
                      >
                        {cmnts?.replies.length} replies
                      </p>
                    </CardActions>
                  </div>
                ) : null}
              </div>

              <div
                style={{
                  marginLeft: "auto",
                  marginRight: "25px",
                  display: "ruby",
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: colourhandler(cmnts.likes),
                  }}
                  onClick={() => likeToComment(selectedPost._id, cmnts._id, i)}
                />
                <p>{cmnts.likes.length}</p>
              </div>
            </div>
            <Collapse in={expanded && id === i} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph sx={{ mb: "-20px" }}>
                  {cmnts?.replies.map((reply: any) => (
                    <div
                      style={{
                        display: "flex",
                        textAlign: "center",
                        marginTop: "15px",
                        marginLeft: "55px",
                        marginBottom: "10px",
                        // margin: "unset",
                      }}
                    >
                      <div>
                        {" "}
                        {reply?._user?.image !== "" ? (
                          <Avatar
                            src={reply?._user?.image}
                            sx={{
                              height: "40px",
                              width: "40px",
                              mt: "8px",
                              ml: "16px",
                            }}
                          ></Avatar>
                        ) : (
                          <Avatar>
                            {reply?._user?.firstname[0].toUpperCase()}
                          </Avatar>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            // marginTop: "px",
                          }}
                        >
                          <p
                            style={{
                              height: "22px",
                              margin: "0 16px",
                              textAlign: "left",
                              // width: "38px",
                            }}
                          >
                            {reply?._user?.firstname}
                          </p>
                          <p
                            style={{
                              margin: "unset",
                              padding: "unset",
                              color: "#919EAB",
                              fontWeight: "400",
                              fontSize: "14px",
                            }}
                          >
                            {reply?.replyText}
                          </p>
                        </div>
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              // margin: "unset",
                              margin: "0 16px",

                              padding: "unset",
                              color: "#919EAB",
                              fontWeight: "400",
                              fontSize: "14px",
                            }}
                          >
                            {checkTimeHandlerForReply(reply)}
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "auto",
                          marginRight: "10px",
                          display: "ruby",
                        }}
                      >
                        <FavoriteIcon
                          //   sx={{ color: colourhandler(cmnts.likes) }}
                          onClick={() => likeToReply()}
                        />
                        <p>{cmnts.likes.length}</p>
                      </div>
                    </div>
                  ))}
                </Typography>
              </CardContent>
            </Collapse>
          </div>
        ))}{" "}
    </div>
  );
}

export default CommentDisplay;
