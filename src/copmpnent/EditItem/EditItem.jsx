import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { api } from "../../api";
import { getItem } from "../../sessionStorage";

function EditItem() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    api(
      `http://localhost:4000/item/${id}`,
      "get",
      getItem("userInfo").token,
      ""
    )
      .then((data) => {
        setItem(data);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setImage(data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    console.log({ formData });
    await api(
      `http://localhost:4000/item/${id}`,
      "put",
      getItem("userInfo").token,
      { name, price, description, image }
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
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
                  <Form.Group>
                    <Form.Label> {item?.name}</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter new name"
                      onChange={(e) => setName(e.target.value)}
                     
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label> {item?.price}</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter new price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label> {item?.description}</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter new description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>New Image:</Form.Label>
                    <Form.Control
                      type="url"
                      placeholder="Enter new image URL"
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Form.Group>

                  <Button className="general-btn mt-3" type="submit">
                    Update Item
                  </Button>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
export default EditItem;
