type ColorsProps = {
  colors: string[];
};

export default function Colors({ colors }: ColorsProps) {
  return (
    <div className='flex gap-2 items-center'>
      {colors.map((color) => {
        return (
          <span
            key={color}
            className='size-2 rounded-full'
            style={{ backgroundColor: color }}
          ></span>
        );
      })}
    </div>
  );
}
