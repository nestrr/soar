import State from "./server-state";

const {
  getUserPresence,
  getRoom,
  existsRoom,
  isUserInRoom,
  storeRoom,
  storeTransport,
  removeUserFromAllRooms,
  removeUserFromRoom,
  getTransport,
  existsProducer,
  getProducer,
  existsConsumer,
  getConsumer,
  getRoomPeers,
  getRoomSize,
  removeProducer,
  removeConsumer,
} = State.getInstance();
export {
  getUserPresence,
  getRoom,
  existsRoom,
  isUserInRoom,
  storeRoom,
  storeTransport,
  removeUserFromAllRooms,
  removeUserFromRoom,
  getTransport,
  existsProducer,
  getProducer,
  existsConsumer,
  getConsumer,
  getRoomPeers,
  getRoomSize,
  removeProducer,
  removeConsumer,
};
