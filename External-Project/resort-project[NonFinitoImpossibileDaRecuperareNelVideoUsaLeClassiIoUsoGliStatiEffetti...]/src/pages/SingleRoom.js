import React from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import { RoomContext } from '../context';
import { useContext, useState, useEffect } from 'react';

const SingleRoom = (props) => {

  const { match } = props;
  const { slug } = match.params;
  const { getRoom } = useContext(RoomContext);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setRoom(getRoom(slug));
  }, []);

  return (
    <div>Hello from SingleRoom</div>
  )
}

export default SingleRoom;
