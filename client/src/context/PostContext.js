import axios from "axios";
import React, { createContext, useReducer, useState } from "react";
import postReducer, { initState } from "../reducers/PostReducer";
import { apiUrl } from "./constant";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initState);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });
  //get post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: "LOADED_POSTS",
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: "LOADED_FAIL" });
    }
  };
  //Add post
  const addPosts = async (postForm) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, postForm);
      if (response.data.success) {
        dispatch({
          type: "ADD_POST",
          payload: response.data.newPost,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.response.message };
      }
    }
  };
  //delete posts
  const deletePosts = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${id}`);
      if (response.data.success) {
        dispatch({
          type: "DELETE_POST",
          payload: id,
        });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  //find posts
  const findPosts = (id) => {
    const post = state.posts.find((item) => item._id === id);
    dispatch({
      type: "FIND_POST",
      payload: post,
    });
  };
  // load fail
  const cancelPosts = () => {
    dispatch({ type: "CANCEL_POST" });
  };

  //update posts
  const updatePosts = async (postForm) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${postForm._id}`,
        postForm
      );
      if (response.data.success) {
        dispatch({
          type: "UPDATE_POST",
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Post context
  const postContextData = {
    getPosts,
    state,
    showAddModal,
    setShowAddModal,
    addPosts,
    deletePosts,
    showUpdateModal,
    setShowUpdateModal,
    findPosts,
    updatePosts,
    cancelPosts,
    showToast,
    setShowToast,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
