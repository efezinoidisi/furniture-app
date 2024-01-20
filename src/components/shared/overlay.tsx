'use client';

export default function Overlay({ handleClick }: { handleClick: () => void }) {
  return (
    <div className='inset-0 bg-black/40 fixed z-10' onClick={handleClick}></div>
  );
}
