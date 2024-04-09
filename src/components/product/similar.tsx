import { getAllProducts } from "@/lib/actions/data";
import ProductCarousel from "../carousel/product-carousel";

type SimilarProps = {
  category?: string;
  productId: string;
};

export default async function Similar({ category, productId }: SimilarProps) {
  const products = (await getAllProducts()) || [];

  const similarProducts = products.filter(
    (product) => product.id !== productId && product.category?.name === category
  );

  return (
    <>
      <h3 className="font-semibold capitalize text-xl mt-6 mb-3">
        similar products
      </h3>
      <ProductCarousel products={similarProducts} />
    </>
  );
}
