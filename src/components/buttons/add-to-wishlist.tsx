import { Icons } from "@/lib/icons";

export default function AddToWishlist() {
  return (
    <button className='absolute top-2 right-2 bg-grey-300/50 p-1 rounded-full z-10'>
      <Icons.heart className='text-primary' />
    </button>
  )
}
