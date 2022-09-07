export const initState = {
  post: null,
  isLoading: true,
  posts: [],
};
const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADED_POSTS":
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case "LOADED_FAIL":
      return {
        ...state,
        isLoading: true,
        posts: [],
      };
    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "DELETE_POST":
      const _id = action.payload;
      const posts = state.posts.filter((item) => item._id !== _id);
      return {
        ...state,
        posts: posts,
      };
    case "FIND_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "UPDATE_POST":
      const updatingPost = state.posts.map((item) => {
        return item._id === action.payload._id ? action.payload : item;
      });
      return {
        ...state,
        post: null,
        posts: updatingPost,
      };
    case "CANCEL_POST":
      return {
        ...state,
        post: null,
      };
    default:
      return state;
  }
};
export default postReducer;
