import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { PostContext } from "../../context/PostContext";
const AddPosts = () => {
  const { showAddModal, setShowAddModal, addPosts, setShowToast } =
    useContext(PostContext);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });
  const { title, description, url } = addForm;
  const handleChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };
  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { message, success } = await addPosts(addForm);
      resetForm();
      setShowToast({
        show: true,
        message: message,
        type: success ? "success" : "danger",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //reset form
  const resetForm = () => {
    setAddForm({ title: "", description: "", url: "", status: "TO LEARN" });
    setShowAddModal(false);
  };
  return (
    <Modal show={showAddModal}>
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
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={handleChange}
            />
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

export default AddPosts;
