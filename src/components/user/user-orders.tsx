import { getAllOrders } from "@/lib/actions/data";
import { Address } from "@/types/shipping";
import { dateString } from "@/utils/helper-functions";
import Image from "next/image";

type OrdersProps = {
  addresses: Array<Address>;
};

type Product = {
  name: string;
  price: number;
  image: string;
};

type Item = {
  id: string;
  quantity: number;
  order: {
    created_at: string;
    shipment_id: string | null;
    total_price: number | null;
  } | null;
  address: Address | undefined;
  products: Array<Product | null> | null;
};

export default async function Orders({ addresses }: OrdersProps) {
  const orders = await getAllOrders();

  let arrangedOrders: Array<
    Item & {
      products: Array<Product | null>;
    }
  > = [];
  orders.forEach((item) => {
    const order = arrangedOrders.find((ord) => ord.id === item.order_id);
    if (order) {
      order.products.push(item.product);

      arrangedOrders.forEach((o) => {
        if (o.id === order.id) return order;

        return o;
      });
      return;
    }
    const address = addresses.find(
      (address) => address.id === item.order?.shipment_id
    );

    arrangedOrders.push({
      id: item.order_id as string,
      products: [item.product],
      quantity: item.quantity,
      order: item.order,
      address,
    });
  });

  return (
    <section className="">
      <h2 className="font-semibold text-2xl  mb-6">My Orders</h2>
      <ul className=" space-y-10">
        {orders.length === 0 ? (
          <li>no order yet</li>
        ) : (
          arrangedOrders.map((order) => {
            return <OrderItem key={order.id} {...order} />;
          })
        )}
      </ul>
    </section>
  );
}

function OrderItem({ quantity, products, order, address, id }: Item) {
  if (!products || !order) return null;
  return (
    <li className="border p-5 space-y-4 rounded">
      <p className="truncate font-medium">{`Order Id: ${id}`}</p>
      <ul className="grid lg:grid-cols-2 gap-x-6 gap-y-10">
        {products.map((product) => {
          if (!product) return;

          return (
            <li key={product.name} className="flex items-center gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-32 aspect-square rounded"
                unoptimized
              />
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <p>{`price: $${product.price}`}</p>
                <p>{`quantity: ${quantity}`}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {address ? (
        <div>
          <h4 className="text-charcoal text-lg font-medium">Address:</h4>
          <address>
            <p>{`${address.street}, ${address.city}, ${address.state}, ${address.country}`}</p>
            <p>{address.phone_number}</p>
          </address>
        </div>
      ) : null}

      <div>
        <p>{`Total: ${order.total_price}`}</p>
        <p>{`Order Date: ${dateString(order.created_at)}`}</p>
      </div>
    </li>
  );
}
