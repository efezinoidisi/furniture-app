export default function ProductSkeleton() {
  return (
    <div className='flex flex-col justify-between w-full h-full gap-y-2 border border-grey-300 pb-4 rounded-t-2xl rounded-b-md overflow-hidden'>
      <span className='h-32 w-full block bg-grey-300 animate-pulse'></span>
      <span className='block h-4 w-full bg-grey-300 animate-pulse'></span>
      <div className='flex gap-3 px-2'>
        <span className='block size-2 rounded-full bg-grey-300 animate-pulse'></span>
        <span className='block size-2 rounded-full bg-grey-300 animate-pulse'></span>
        <span className='block size-2 rounded-full bg-grey-300 animate-pulse'></span>
      </div>
      <div className='flex justify-between items-center px-2'>
        <span className='block h-3 w-14 bg-grey-300 animate-pulse'></span>
        <span className='block h-3 w-14 bg-grey-300 animate-pulse'></span>
      </div>
    </div>
  );
}
