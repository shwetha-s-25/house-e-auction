import {
  VStack,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
} from "@chakra-ui/react";

import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Countdown from "react-countdown";

const HouseItem = ({ days, hours, minutes, seconds, completed, props }) => {
  if (completed) {
    return null;
  }
  return (
    <Flex justify="center" align="center">
      <Stack
        justify="center"
        width="300px"
        bg="white"
        boxShadow="xl"
        borderRadius="xl"
      >
        <Image src={props.item.imgUrl} h="170" alt="houses" />

        <VStack p="4" align="left">
          <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="pink.500">
            Current Bid ${props.item.curPrice}
          </Text>

          <Heading fontSize="24px" letterSpacing="tight">
            {props.item.title}
          </Heading>

          <Text fontSize="13px" color="grey">
            {props.item.address}
          </Text>
          <Divider my="2.5" />

          <HStack spacing="5">
            <HStack>
              <BiBed style={{ color: "#D53F8C" }} />
              <Text fontSize="12px">{props.item.bedrooms}</Text>
            </HStack>

            <HStack>
              <BiBath style={{ color: "#D53F8C" }} />
              <Text fontSize="12px">{props.item.bathrooms}</Text>
            </HStack>

            <HStack>
              <BiArea style={{ color: "#D53F8C" }} />
              <Text fontSize="12px">{props.item.surface}</Text>
            </HStack>
          </HStack>
          <div className="card-body">
            <p className="lead display-10">{props.item.title}</p>
            <br />
            <div className="d-flex flex-column jsutify-content-between align-item-center">
              {props.item.upcomingEvent ? (
                <h5>Auction Start In</h5>
              ) : (
                <h5>Auction End In</h5>
              )}

              <h5>
                {days * 24 + hours} hr: {minutes} min: {seconds} sec
              </h5>
            </div>
            <div className="d-flex justify-content-between align-item-center">
              <div>
                {props.item.curWinner && (
                  <div>current Winner : {props.item.curWinner}</div>
                )}
                {!props.item.upcomingEvent ? (
                  !props.owner ? (
                    <div
                      onClick={() => props.bidAuction()}
                      className="btn btn-outline-secondary"
                    >
                      Bid
                    </div>
                  ) : (
                    <Button
                      p={{ base: 3, md: 2 }}
                      size="100%"
                      onClick={() => props.endAuction(props.item.id)}
                    >
                      Cancel Auction
                    </Button>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default HouseItem;

export const AuctionCard = ({ item }) => {
  let expiredDate = item.duration;
  const { currentUser, bidAuction, endAuction } = useContext(AuthContext);
  console.log(item.title, expiredDate);
  return (
    <Countdown
      owner={currentUser.email === item.email}
      date={expiredDate}
      bidAuction={bidAuction}
      endAuction={endAuction}
      item={item}
      renderer={HouseItem}
    />
  );
};
