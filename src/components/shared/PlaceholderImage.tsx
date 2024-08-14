import getPlaceholder from '@/utils/plaiceholder';
import Image from 'next/image';

export default async function PlaceholderImage({
  img,
  alt = '',
  width = 500,
  height = 500,
  className,
}: {
  img: string;
  alt?: string;
  width?: number;
  height?: number;
  className: string;
}) {
  const placeholder = await getPlaceholder(img);
  return (
    <Image
      src={img}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      placeholder={'blur'}
      blurDataURL={placeholder?.base64}
      className={className}
    />
  );
}
