import BreadCrump from "@/components/breadcrumb/breadcrump";
import AddToCart from "@/components/buttons/add-to-cart";
import AddToWishlist from "@/components/buttons/add-to-wishlist";
import Back from "@/components/buttons/back";
import Share from "@/components/product/share";
import Similar from "@/components/product/similar";
import ProductPrice from "@/components/shared/product-price";
import { getProduct } from "@/lib/actions/data";
import Image from "next/image";

type Props = {
  params: {
    productId: string;
  };
};

export default async function ProductPage(props: Props) {
  const { params } = props;

  const { productId } = params;

  const product = (await getProduct(productId)) ?? null;

  if (!product) {
    throw new Error("product not found");
  }
  const breadCrump = [
    {
      path: "/products",
      title: "all products",
    },
    {
      path: "product",
      title: product.name,
    },
  ];

  return (
    <main className="page-size flex flex-col gap-y-3 md:gap-y-5 lg:gap-y-7 mt-7 pb-10">
      <Back />
      <h2 className="sr-only">product details</h2>
      <BreadCrump items={breadCrump} />
      <div className="flex items-center gap-5 text-grey-100">
        <AddToWishlist variant="save" product={product} />
        <Share />
      </div>

      <section className="grid md:grid-cols-2 gap-10">
        <div className="w-full h-full relative">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={750}
            className="object-cover object-center aspect-square w-full h-full rounded-2xl"
            unoptimized
          />
        </div>

        <div className="flex flex-col justify-center gap-3">
          <h3 className="capitalize font-bold text-2xl md:text-3xl lg:text-[2rem] font-fira-code">
            {product.name}
          </h3>
          <ProductPrice price={product.price} discount={product.discount} />
          <span
            className={`self-end px-2 py-1 rounded-3xl capitalize bg-gray-300 ${
              product.stock ? "text-[#13a33c]" : "text-red-500"
            }`}
          >
            {product.stock ? "available" : "sold out"}
          </span>
          {/* <Colors colors={product.colors} /> */}
          <div className="flex items-center gap-5">
            <AddToCart
              product={product}
              className="bg-accent border border-black hover:bg-inherit text-white hover:text-inherit px-6 py-2 capitalize w-full"
              showText
            />
          </div>
        </div>
      </section>

      <section>
        <h3 className="capitalize font-semibold text-lg">product details</h3>
        <p className="text-base text-[#5e5d6c] leading-8">
          {product.description}
        </p>
      </section>

      <Similar category={product.category?.name} productId={product.id} />
    </main>
  );
}
