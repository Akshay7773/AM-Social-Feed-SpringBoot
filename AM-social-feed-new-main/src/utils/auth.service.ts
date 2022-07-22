import { BehaviorSubject } from "rxjs";
import { get, patch, post, put } from "./http/httpMethods";
import Cookie from "js-cookie";
import history from "../routes/history";
import { paths } from "../routes/routes.config";
import { showErrorToast, showSuccessToast } from "./toastUtil";
import { defaultUsers } from "../@types/user";
import { baseURL } from "./constants/urls";
let currentUserFromStorage: any;
/*
 * Get current user from local storage
 */
try {
  currentUserFromStorage = localStorage.getItem("currentUser");
  currentUserFromStorage = JSON.parse(currentUserFromStorage);
  //   if (currentUserFromStorage) {
  //     loadCurrentUser();
  //   }
} catch (e) {
  showErrorToast("Could not find user in local storage");
  logout();
}

const currentUserSubject = new BehaviorSubject(
  currentUserFromStorage || undefined
);
const currentOrganizationSubject = new BehaviorSubject(
  (currentUserFromStorage &&
    currentUserFromStorage._org &&
    currentUserFromStorage._org[0]) ||
    undefined
);

/*
 * Export as a Type
 */
export const authenticationService = {
  logout,
  authToken,
  register,
  verifyCredentials,
  loadCurrentUser,
  requestPasswordReset,
  setPassword,
  isUserAndTokenAvailable,
  verifyOTP,
  handleLogin,
  localLogout,
  resendOTP,
  unsubscribeAll,
  signUp,
  forgotPass,
  gotoLogin,
  getAllPosts,
  addPost,
  editProfile,
  likePost,
  getComments,
  getLoggedUser,
  addComment,
  updateUser,
  googleLogin,
  likeSingleComment,
  replyComment,
  likeToReply,
  uploadImage,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  },
  currentOrganization: currentOrganizationSubject.asObservable(),
  get currentOrganizationValue() {
    return currentOrganizationSubject.value;
  },
};

//image uploading
function uploadImage(response: any) {
  console.log(response.get("image"));

  return post("http://localhost:8080/uploads", response, {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization:
      //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHJhZGhhQGdtYWlsLmNvbSIsImV4cCI6MTY1ODMyODM3NSwiaWF0IjoxNjU4MjkyMzc1fQ.PSTbf5KLNolZ8ilaW14rXZ1QaKPUw2IYx3fZh2DPuy0",
    },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}

function gotoLogin() {
  history.push(paths.login);
  window.location.reload();
}
const token = Cookie.get("_token");

//login with googel

function googleLogin(payload: any) {
  return post("http://localhost:8080/auth/google-login", {
    idToken: payload,
  }).then((resp) =>
    setTimeout(() => {
      handleLogin(resp);
    }, 2000)
  );
}

/*
 * Verify OTP method
 */
function verifyCredentials(payload: any) {
  // return new Promise((resolve, reject) => {
  //   handleLogin({ token: "AABBCC", user: defaultUsers[0] });
  //   resolve(true);
  // });
  console.log(payload);
  return post(`http://localhost:8080/auth/login`, payload)
    .then((response: any) => {
      showSuccessToast("Logged in successfully");
      console.log(response);
      setTimeout(() => {
        handleLogin(response);
        // handleLogin({ token: "AABBCC", user: defaultUsers[0] });
        console.log(response);

        return response;
      }, 1500);
    })
    .catch((error: any) => {
      showErrorToast(
        error.message || "Error occurred while validating credentials!"
      );
      // handleLogin({ token: "AABBCC", user: defaultUsers[0] });
      return error;
    });
}

/*
 * Verify OTP method
 */
function requestPasswordReset(payload: any) {
  return post("http://localhost:8080/auth/forgot-password", payload).then(
    (response: any) => {
      return response;
    }
  );
}

//get all posts
console.log(token);
function getAllPosts() {
  console.log("hello to world");
  return get("http://localhost:8080/getall", {
    headers: {
      Authorization: `Bearer ${token}`,
      // Authorization:
      //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaHJhZGhhQGdtYWlsLmNvbSIsImV4cCI6MTY1ODMyODM3NSwiaWF0IjoxNjU4MjkyMzc1fQ.PSTbf5KLNolZ8ilaW14rXZ1QaKPUw2IYx3fZh2DPuy0",
    },
  }).then((response: any) => {
    console.log(response);
    return response;
  });
}
//like post
function likePost(payload: string) {
  console.log(payload);
  return put(
    "http://localhost:8080/posts",
    { postId: payload },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res: any) => {
    console.log(res);
  });
}
//get comments of single post
function getComments(payload: string) {
  // console.log(payload);
  return get(`http://localhost:8080/comments/${payload}`, {
    headers: {
      Authorization: token,
    },
  }).then((response: any) => {
    return response;
  });
}

//reply to comment
function replyComment(comments: any, postId: any, singleCommentId: any) {
  console.log("reply to the comments", comments, postId, singleCommentId);
  return patch(
    `http://localhost:8080/comments/${postId}`,
    {
      commentId: singleCommentId,
      replyText: comments,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((response: any) => console.log(response));
}

function likeToReply() {
  console.log("like to reply");
}

//add new post
function addPost(payload: any) {
  console.log(payload.get("image"));
  return post("http://localhost:8080/posts", payload, {
    headers: {
      Authorization: token,
    },
  }).then((response: any) => {
    showSuccessToast("post uploaded successfully");
    return response;
  });
}

//comment on post
function addComment(payload: any, commentText: string) {
  // console.log(commentText);
  return post(
    `http://localhost:8080/comments/${payload}`,
    { text: commentText },
    {
      headers: {
        Authorization: token,
      },
    }
  );
}

//get logged user
function getLoggedUser() {
  // return get("http://localhost:8080/auth/self", {
  //   headers: {
  //     Authorization: token,
  //   },
  // }).then((resp) => {
  //   return resp;
  // });
}

//update user Data
function updateUser(payload: any) {
  // console.log(payload.get("image"));
  return put("http://localhost:8080/users", payload, {
    headers: {
      Authorization: token,
    },
  })
    .then((resp: any) => {
      showSuccessToast("Profile updated successfully");
      return resp;
    })
    .catch((error: any) => {
      console.log(error);
    });
}

/*
 * Set new password
 */
function setPassword(payload: any, token: string) {
  return post(
    `http://localhost:8080/auth/reset-password?token=${token}`,
    payload
  ).then((response: any) => {
    showSuccessToast("Password changed successfully");

    // history.push("/auth/login");
    // window.location.reload();

    return response;
  });
}
/*
 * Unsubscribe all subjects to avoid memory leak
 */
function unsubscribeAll() {
  currentUserSubject.unsubscribe();
  currentOrganizationSubject.unsubscribe();
}

/*
 * Logout method
 */
function logout() {
  return get(`/api/auth/logout`)
    .then((response) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
      // window.location.reload()
      return response;
    })
    .catch((error) => {
      // remove user from local storage to log user out
      localStorage.removeItem("currentUser");

      Cookie.remove("_token", { path: "/" });

      currentUserSubject.next({});

      history.push("/auth/login");
    });
}

/*
 * Local logout, don't send API call
 */
function localLogout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");

  Cookie.remove("_token", { path: "/" });

  currentUserSubject.next({});

  history.push("/auth/login");
  window.location.reload();
}

/*
 * Get auth token from cookie
 */
function authToken() {
  return Cookie.get("_token");
}

/*
 * Register user method
 */
function register(payload: any) {
  // console.log("hello register", payload);
  // http://localhost:8080/auth/register
  return post(`${baseURL}/auth/register`, payload).then((response: any) => {
    console.log(response);
    handleLogin(response);
    // return response;
  });
}

/*
 * Verify OTP
 */
function verifyOTP(payload: any) {
  return post("/api/auth/second-factor", payload).then((response: any) => {
    return response;
  });
}

/*
 * Verify OTP
 */
function resendOTP() {
  return get("/api/auth/regenerate-second-factor").then((response: any) => {
    handleLogin(response);
    return response;
  });
}

/*
 * Verify invitation
 */
function isUserAndTokenAvailable() {
  return authToken() && JSON.parse(localStorage.getItem("currentUser") as any);
}

//like single comment

function likeSingleComment(postId: any, commentId: any) {
  console.log("like to single comment", postId, commentId);
  return put(
    `http://localhost:8080/comments/${postId}`,
    { commentId: commentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then((res: any) => {
    return res;
  });
}

/*
 * Fetch current user
 */
function loadCurrentUser() {
  // get(`/api/auth/self`).then((response: any) => {
  //   localStorage.setItem("currentUser", JSON.stringify(response));
  //   currentUserSubject.next(response);
  //   currentOrganizationSubject.next(response._org[0]);
  // });
}

/*
 * Register user method
 */

//newly created
function signUp() {
  history.push(paths.register);
  window.location.reload();
}

//newly created
function forgotPass() {
  history.push(paths.forgotPass);
  window.location.reload();
}

//edit profile
function editProfile() {
  history.push(paths.editProfile);
  window.location.reload();
}

function handleLogin(response: any) {
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  Cookie.set("_token", response.token, { path: "/" });

  localStorage.setItem("currentUser", JSON.stringify(response.user));

  currentUserSubject.next(response.user);

  // currentOrganizationSubject.next(response.user._org[0]);

  if (response.user && !response.user._pre) {
    history.push(paths.home);
    window.location.reload();
  }
}
