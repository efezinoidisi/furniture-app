export default function Ellipsis() {
  return (
    <div className='inline-block relative w-20 h-20 mx-auto'>
      <div className='absolute top-8 w-3 h-3 rounded-full bg-white  ease-[cubic-bezier(0, 1, 1, 0)] animate-ellipsis1 left-2'></div>
      <div className='absolute top-8 w-3 h-3 rounded-full bg-white  ease-[cubic-bezier(0, 1, 1, 0)] animate-ellipsis2 left-2'></div>
      <div className='absolute top-8 w-3 h-3 rounded-full bg-white  ease-[cubic-bezier(0, 1, 1, 0)] left-8 animate-ellipsis2'></div>
      <div className='absolute top-8 w-3 h-3 rounded-full bg-white  ease-[cubic-bezier(0, 1, 1, 0)] left-14 animate-ellipsis3'></div>
    </div>
  );
}
