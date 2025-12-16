import axios from "axios";

//  LOGIN
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/api/v1/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to Login");
  }
  const data = await res.data;
  return data;
};

//  SIGNUP
export const signupUser = async (name: string, email: string, password: string) => {
  const res = await axios.post("/api/v1/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  const data = await res.data;
  return data;
};

//  AUTH STATUS CHECK
export const checkAuthStatus = async () => {
  const res = await axios.get("/api/v1/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};

//  SEND CHAT REQUEST
export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/api/v1/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  const data = await res.data;
  return data;
};

//  GET USER CHATS
export const getUserChats = async () => {
  const res = await axios.get("/api/v1/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to get chats");
  }
  const data = await res.data;
  return data;
};

//  DELETE USER CHATS
export const deleteUserChats = async () => {
  const res = await axios.delete("/api/v1/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chat");
  }
  const data = await res.data;
  return data;
};

//  LOGOUT
export const logoutUser = async () => {
  const res = await axios.get("/api/v1/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to logout");
  }
  const data = await res.data;
  return data;
};