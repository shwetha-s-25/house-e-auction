import { Center, Grid, Heading, Spinner, Stack } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { HouseContext } from "../../context/HouseContext";
import { useFirestore } from "../../hooks/useFirestore";
import HouseItem, { AuctionCard } from "../Houses/HouseItem";

const Upcominglist = () => {
  const { houses, isLoading } = useContext(HouseContext);
  const { currentUser } = useContext(AuthContext);
  const { docs } = useFirestore("auctions");
  // console.log(docs,currentUser);
  const [show, setShow] = useState(true);

  if (isLoading) {
    return (
      <Center>
        <Spinner align="center" color="pink.500" />
      </Center>
    );
  }

  if (houses.length === 0) {
    return (
      <Stack maxH="400px">
        <Heading size="lg" p={{ base: "6", md: "10" }} align="center">
          Oops... Can try another one?
        </Heading>
      </Stack>
    );
  }

  return (
    <Grid
      my="3"
      rowGap="4"
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      {currentUser ? (
        docs &&
        docs
          .filter((doc) => {
            return doc.email === currentUser.email && doc.upcomingEvent;
          })
          .map((doc) => {
            console.log(doc.title);
            return (
              <Link to={`/property-details/${doc.id}`} key={doc.id}>
                <AuctionCard key={doc.id} item={doc} />
              </Link>
            );
          })
      ) : (
        <Stack maxH="400px">
          <Heading size="lg" p={{ base: "6", md: "10" }} align="center">
            Please login to sell your property
          </Heading>
        </Stack>
      )}
    </Grid>
  );
};

export default Upcominglist;
