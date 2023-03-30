import React, { useEffect } from 'react';
import { useState } from 'react';
import items from './data';

export const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: false,
  });

  const getRoom = (slug) => {
    const room = state.rooms.find((room) => room.slug === slug);
    return room;
  };

  useEffect(() => {
    const formatRooms = formatData(items);
    setState(prevState => ({ ...prevState, rooms: formatRooms }));
    setState(prevState => ({ ...prevState, featuredRooms: prevState.rooms.filter(room => room.featured === true) }));
    setState(prevState => ({ ...prevState, sortedRooms: formatRooms }));
    //setState((prevState) => ({ ...prevState, loading: false }));
  }, []);

  const formatData = (items) => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => {
        return image.fields.file.url;
      });
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  return (
    <>
      <RoomContext.Provider value={{ ...state, getRoom }}>
        {children}
      </RoomContext.Provider>
    </>
  );
};

export default RoomProvider;