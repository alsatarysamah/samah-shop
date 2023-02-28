import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { getItem } from "../../sessionStorage";
import { api } from "../../api";
import Item from "../Item/Item";

export default function Home() {
  const [items, setitems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await api(
        "http://localhost:4000/item",
        "get",
        "",
        ""
      ).then((data) => {
        console.log(data);
        setitems(data);
      });
    };
    fetchData();
  }, []);
  return (
    <>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      <h1 className="mx-5">list of item</h1>
      <Row>
        <div className="d-flex flex-wrap justify-content-center">
          {items?.map((item, idx) => (
            <Col sm={6} md={4} lg={3} className="mb-3">
              <Item item={item} id={idx} descShow={false}></Item>
            </Col>
          ))}
        </div>
      </Row>
    </>
  );
}
