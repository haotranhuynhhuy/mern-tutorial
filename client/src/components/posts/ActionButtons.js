import React, { useContext } from "react";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import Button from "react-bootstrap/esm/Button";
import { PostContext } from "../../context/PostContext";
const ActionButtons = ({ url, _id }) => {
  const { deletePosts, setShowUpdateModal, findPosts, setShowToast } =
    useContext(PostContext);
  const handleDelete = async (id) => {
    try {
      const { message, success } = await deletePosts(id);
      setShowToast({
        show: true,
        message,
        type: success ? "success" : "danger",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (_id) => {
    findPosts(_id);
    setShowUpdateModal(true);
  };
  return (
    <>
      <Button className="post-button" href={url} target={"_blank"}>
        <img src={playIcon} alt="" width="24" height="24p" />
      </Button>
      <Button className="post-button" onClick={() => handleEdit(_id)}>
        <img src={editIcon} alt="" width="24" height="24p" />
      </Button>
      <Button className="post-button" onClick={() => handleDelete(_id)}>
        <img src={deleteIcon} alt="" width="24" height="24p" />
      </Button>
    </>
  );
};

export default ActionButtons;
