import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostContext } from "../../context/PostContext";

const UpdatePosts = () => {
  const {
    showUpdateModal,
    setShowUpdateModal,
    setShowToast,
    cancelPosts,
    updatePosts,
    state: { post },
  } = useContext(PostContext);
  const [updateForm, setUpdateForm] = useState({
    _id: post._id,
    title: post.title,
    description: post.description,
    url: post.url,
    status: post.status,
  });
  const { title, description, url, status } = updateForm;

  const handleChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  //submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { message, success } = await updatePosts(updateForm);
    setShowToast({
      show: true,
      message,
      type: success ? "success" : "danger",
    });
    resetForm();
  };

  //reset form
  const resetForm = () => {
    cancelPosts();
    setShowUpdateModal(false);
  };
  return (
    <Modal show={showUpdateModal}>
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={handleChange}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={handleChange}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={resetForm}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePosts;
