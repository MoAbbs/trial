import React from 'react';
import useSound from 'use-sound';
import boopSfx  from './../../notifys/for-sure.ogg'

const Notify = (props) => {
  const [play] = useSound(boopSfx);
  return <input type='hidden' className='play-sound'  onClick={play}/>;
};

export default Notify;