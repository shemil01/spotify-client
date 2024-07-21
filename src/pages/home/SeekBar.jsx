import React, { useRef } from 'react';

const SeekBar = ({ currentTime, duration, onSeek }) => {
  const seekBarRef = useRef(null);

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    onSeek(seekTime);
  };

  return (
    <div className='flex items-center space-x-3 '>
      <span>{new Date(currentTime * 1000).toISOString().substr(14, 5)}</span>
      <input 
        type="range"
        ref={seekBarRef}
        min='0'
        max='100'
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
        className='w-[100]'
      />
      <span>{new Date(duration * 1000).toISOString().substr(14, 5)}</span>
    </div>
  );
};

export default SeekBar;
