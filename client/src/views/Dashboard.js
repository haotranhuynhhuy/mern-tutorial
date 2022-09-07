import React, { useContext, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Card from "react-bootstrap/esm/Card";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPosts from "../components/posts/AddPosts";
import addIcon from "../assets/plus-circle-fill.svg";

import Toast from "react-bootstrap/Toast";
import UpdatePosts from "../components/posts/UpdatePosts";

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(AuthContext);
  const { getPosts, state, setShowAddModal, showToast, setShowToast } =
    useContext(PostContext);
  const { posts, isLoading, post } = state;
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body = null;

  if (isLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {user.username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome To Learn IT</Card.Title>
            <Card.Text>Click the button bellow to track a new skill</Card.Text>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              Learn IT
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post, index) => {
            return (
              <Col key={index} className="my-2">
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>
        <Button className="btn-floating" onClick={() => setShowAddModal(true)}>
          <img src={addIcon} alt="" width="60" height="60" />
        </Button>
      </>
    );
  }
  return (
    <>
      {body}
      <AddPosts />
      {post !== null && <UpdatePosts />}
      <Toast
        show={showToast.show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${showToast.type} text-white`}
        onClose={() => setShowToast({ show: false, message: "", type: null })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{showToast.message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default Dashboard;
