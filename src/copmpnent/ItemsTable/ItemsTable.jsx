"use strict";

import { Button, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import { api } from "../../api";

import { getItem } from "../../sessionStorage";
import { toast, ToastContainer } from "react-toastify";
import Table from "../Table";
import { Link, useNavigate } from "react-router-dom";

export default function ItemsTable({ data }) {
  const [items, setItems] = useState();
  const [update, setUpdate] = useState(false);
  const navigate=useNavigate();

  const handleEdit = async (id) => {
   navigate(`/edititem/${id}`)
  };
  const handleDelete = async (id) => {

    await api(
      `http://localhost:4000/item/${id}`,
      "delete",
      getItem("userInfo").token
    ).then((data) => {
      // dispatch(delHistory(id));
      setUpdate(!update)
      toast.success("Deleted");
    });
  };
  const deleteFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        className="general-btn"
        title="Delete this record"
        onClick={() => handleDelete(row.id)}
      >
        <i className="fa fa-trash "></i>
      </Button>
    );
  };
  const editFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <Button
        className="general-btn"
        title="Delete this record"
        onClick={() => handleEdit(row.id)}
      >
        <i className="fa fa-edit"></i>
      </Button>
    );
  };
  const imageFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <img
        src={row.image}
        className="img-fluid rounded img-th "
        size="sm"
        alt={row.name}
      ></img>
    );
  };

  const columns = [
    {
      dataField: "id",
      text: "Id",
      sort: true,
      headerStyle: { width: "3%" },
      style: { width: "3%" },
    },
    {
      dataField: "image",
      text: "Image",
      formatter: imageFormatter,
      headerStyle: { width: "6%" },
      style: { width: "6%" },
    },
    {
      dataField: "name",
      text: "Name",
      headerStyle: { width: "8%" },
      style: { width: "8%" },
    },
    {
      dataField: "price",
      text: "Price",

      headerStyle: { width: "7%" },
      style: { width: "7%" },
    },
    {
      dataField: "description",
      text: "Description",

      headerStyle: { width: "10%" },
      style: { width: "10%" },
    },
    {
      dataField: "delete",
      text: "Delete",
      formatter: deleteFormatter,
      headerStyle: { width: "6%" },
      style: { width: "6%" },
    },
    {
      dataField: "edit",
      text: "Edit",
      formatter: editFormatter,
      headerStyle: { width: "5%" },
      style: { width: "5%" },
    },
  ];

  const fetchData = async () => {
    await api(`http://localhost:4000/item?userId=${getItem("userInfo").id}`, "get", "", "").then((data) => {
      
      setItems(data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <>
    {getItem("userInfo")?
    <div className="d-flex flex-column site mt-5">
      <ToastContainer
        position="top-center"
        style={{ width: "200px", height: "100px" }}
      />
      <Container className="d-flex justify-content-center ">
        <h2>Items Table</h2>
      </Container>
      <Container className="d-flex justify-content-end fluid">
        <Col xs={3}>
          <Button className="general-btn" size="lg" onClick={()=>{navigate("/newitem")}}>
            New Item
          </Button>
        </Col>
      </Container>

      <Row className="justify-content-center  mb-3">
        <Col md={8} lg={8} xs={8}>
          <div className="table-horiz-scroll mt-5 mx-3">
            {items && <Table data={items} columns={columns} />}
          </div>
        </Col>
      </Row>
    </div>:(
        <div className="mx-5 my-5">
          <h5>
            You shoud signin <Link to="/signin">click here</Link>
          </h5>
        </div>
      )}
    </>
  );
}
