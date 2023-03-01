import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { api } from "../../api";
import { getItem } from "../../sessionStorage";
import { Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNewItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = { name, price, description, image };
      api(
        `http://localhost:4000/item`,
        "post",
        getItem("userInfo").token,
        newItem
      ).then((data) => {
       
        if (data) {
          toast.success("Added");
          navigate("/itemstable");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className=" d-flex justify-content-center align-items-center mt-5">
      <Col md={8} lg={6} xs={12}>
        <Card className="shadow px-4">
          <Card.Body>
            <div className="mb-3 mt-md-4">
              <h2 className="fw-bold mb-2 text-center  ">Edit Item</h2>
              <div className="mb-1">
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Label>Item Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="price">
                    <Form.Label>Item Price:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="description">
                    <Form.Label>Item Description:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="image">
                    <Form.Label>Item Image:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button className="general-btn mt-3" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default AddNewItem;
