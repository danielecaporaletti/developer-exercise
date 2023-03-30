import React from 'react';
import { useContext } from 'react';
import { RoomContext } from '../context';
import Loading from './Loading';
import Room from './Room';
import Title from './Title';

const FeaturedRooms = () => {
  const contextType = useContext(RoomContext);

  //let { loading, featuredRooms: rooms } = contextType;
  const loading = contextType.loading;
  const rooms = contextType.featuredRooms;
  
  const roomsView = rooms.map((room) => {
    return <Room key={room.id} room={room} />
  })

  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading? <Loading /> : roomsView}
      </div>
    </section>
  );
};

export default FeaturedRooms;
