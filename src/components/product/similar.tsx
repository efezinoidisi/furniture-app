import { CategoryType, ProductType } from '@/types/product';
import { getAllProducts } from '@/utils/helper-functions';
import ProductCarousel from '../carousel/product-carousel';

type SimilarProps = {
  categories: string[];
  productId: string;
};

export default async function Similar({ categories, productId }: SimilarProps) {
  const products = await getAllProducts();

  const similarProducts = products.filter((product) => {
    return (
      product.id !== productId &&
      !product.category.some((category) => categories.includes(category.name))
    );
  });

  return (
    <>
      <h3>similar products</h3>
      <ProductCarousel products={similarProducts} />
    </>
  );
}

const isInList = (id: string, list: ProductType[]) => {
  return list.find((item) => item.id === id) ? true : false;
};
