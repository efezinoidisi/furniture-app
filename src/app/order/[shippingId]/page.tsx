interface OrderPageProps {
  params: {
    shippingId: string;
  };
}

export default function OrderPage({ params: { shippingId } }: OrderPageProps) {
  console.log(shippingId);
  return <div>page</div>;
}
