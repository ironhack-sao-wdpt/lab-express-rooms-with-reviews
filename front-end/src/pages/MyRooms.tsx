import { useState, useEffect, useContext } from "react";
import axiosApi from "../apis/axiosApi";
import RoomCards from "../components/RoomCards";
import { AuthContext } from "../context/authContext";
import Container from "@mui/material/Container";
import DeleteModal from "../components/DeleteModal";

const MyRooms = () => {
  type roomsInterface = [
    {
      name: string;
      description: string;
      imageUrl: string;
      _id: string | number;
      createdBy: string;
      reviews: [
        { comment: string; _id: string | number; roomId: string | number }
      ];
    }
  ];

  const [products, setProducts] = useState<roomsInterface>();

  const [loggedInUser] = useContext(AuthContext);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axiosApi.get("/room");
        const filteredData = response.data.filter(
          (element: roomsInterface[0]) =>
            element.createdBy === loggedInUser.user._id
        );
        setProducts([...filteredData] as roomsInterface);
      } catch (err) {
        console.error(err);
      }
    }
    if (loggedInUser.token) {
      fetchProducts();
    }
  }, [loggedInUser.token]);

  return (
    <Container
      sx={{ marginTop: 2, display: "flex", justifyContent: "space-around" }}
    >
      {products?.map((element) => {
        return (
          <RoomCards
            room={element}
            buttons={[{ text: "Editar", link: `/editroom/` }]}
          />
        );
      })}
    </Container>
  );
};

export default MyRooms;
