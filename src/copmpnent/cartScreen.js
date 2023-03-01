import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { getItem, setItem } from "../sessionStorage";

export default function CartScreen(props) {
  const [cartItem, setCartItem] = useState(getItem("cart") || []);
  const [updateItem,setUpdateItem]=useState(false)
  const updateCart = async (item, qun) => {
   
    let cart = getItem("cart") || [];
    const existItem = cart.find((element) => element.item.id === item.id);

    if (existItem) {
      cart.forEach((element) => {
        if (element.item.id === item.id) {
         
          element.qun = qun;
        }
      });
    }
    setItem("cart", cart);
    setUpdateItem(!updateItem)
  };

  const handleRemove = (item) => {
  
    // dispatch({type:"REMOVE",payload:item})
  };

  useEffect(() => {
    setCartItem(getItem("cart"));
  }, [updateItem]);
  return (
    <>
      <Helmet>
        <title>Shop Cart</title>
      </Helmet>
      <h1 className="mx-5">Shop Cart</h1>
      <Row className="mx-5">
        <Col md={8} sm={3}>
          {cartItem?.length === 0 ? (
            <p>
              Cart is empty<Link to="/">Go Shopping</Link>
            </p>
          ) : (
            <ListGroup>
              {cartItem?.map((item) => (
                <ListGroup.Item key={item.item.id}>
                  <Row className="align-items-center mb-3 ">
                    <Col md={4}>
                      <img
                        src={item.item.image}
                        alt={item.item.name}
                        className="img-fluid rounded img-th"
                      ></img>{" "}
                    </Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() => updateCart(item.item, item.qun - 1)}
                        disabled={item.qun === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.qun}</span>
                      <Button
                        variant="light"
                        onClick={() => updateCart(item.item, item.qun + 1)}
                       
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>
                    <Col>{item.item.price}</Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() => handleRemove(item.item)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                   ({cartItem?.reduce((acc, c) => acc + c.qun, 0)}{" "}
                    Items) == JD{" "}
                    {cartItem?.reduce((acc, c) => acc + c.item.price * c.qun, 0)}
                  </h3>
                </ListGroup.Item>
               
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
