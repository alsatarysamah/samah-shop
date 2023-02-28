import { useContext, useEffect, useState } from "react";
import "./item.css";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ModalDialog from "../Modal/Modal";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { api } from "../../api";
import { getItem, setItem } from "../../sessionStorage";


export default function Item({ item, descShow }) {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const [isFavorite, setIsFavorite] = useState(
    favorites?.some((favorite) => favorite.itemId === item.id)
  );
 
  const newFav = {
    name: item.name,
    image: item.image,
    price: item.price,
    description: item.description,
    itemId: item.id,
  };

  const handleAddFavoriteClick = async () => {
    await api(
      `http://localhost:4000/fav`,
      "post",
      getItem("userInfo").token,
      newFav
    ).then((data) => {
      setIsFavorite(!isFavorite);
      const favorites = getItem("favorites") || [];
      setItem("favorites", [...favorites, newFav]);
    });
  };

  const addToCartHandler = (item) => {
    let cart=getItem("cart")
    const existItem = cart.find((element) => element.id === item.id);
  
  
   if(existItem){
    cart.forEach((element)=>{if(element.item.id===item.id)element.qun++;})
   }
   else{
    cart.push({item:item,qun:1})
   }
   setItem("cart",cart)

    navigate("/cart")
  };
  const handleClick = (e) => {
    setModalShow(true);
  };

  const handleDelFavoriteClick = async () => {
 
    let favId;
  
    favorites.forEach((element) => {
      if (element.itemId === item.id) favId = element.id;
    });
  
    await api(
      `http://localhost:4000/fav/${favId}`,
      "delete",
      getItem("userInfo").token,
      ""
    ).then((data) => {
     
      const favorites = getItem("favorites")|| [];
      const updatedFavorites = favorites.filter(
        (favorite) => favorite.itemId !== item.id
      );
     setItem("favorites", updatedFavorites)
    });
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    const favorites = getItem("favorites")|| [];
    setIsFavorite(
      favorites.some((favorite) => favorite.itemId === item.id)
    );
    const fetchFavorites = async () => {
      try {
        await api(
          `http://localhost:4000/fav?userId=${getItem("userInfo").id}`,
          "get",
          getItem("userInfo").token,
          ""
        ).then((data) => {
         
          setFavorites(data);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [isFavorite]);
  return (
    <>
      <Card key={item.id} className="item">
        <div className="favorite-icon">
          {isFavorite ? (
            <FaHeart
              color="red"
              size={30}
              className="mx-3"
              onClick={handleDelFavoriteClick}
            />
          ) : (
            <FaRegHeart
              style={{ color: "#FF577F" }}
              className="mx-3"
              size={30}
              onClick={handleAddFavoriteClick}
            />
          )}
        </div>
        <img
          src={item.image}
          className="card-img-top"
          alt={item.name}
          onClick={handleClick}
        ></img>

        <Card.Body>
          <Card.Title onClick={handleClick}>{item.name}</Card.Title>

          <Card.Text>{item.price} JD</Card.Text>
          {descShow ? <Card.Text>{item.description}</Card.Text> : null}

          {!descShow ? (
            <Button
              className="general-btn"
              onClick={() => addToCartHandler(item)}
            >
              Add to cart
            </Button>
          ) : null}
        </Card.Body>
      </Card>
      {modalShow && (
        <ModalDialog
          show={modalShow}
          onHide={() => setModalShow(false)}
          item={item}
        />
      )}
    </>
  );
}
