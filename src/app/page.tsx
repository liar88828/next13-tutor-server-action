import { addProductToDatabase } from "../../actions/serverActions";
import AddProductButton from "../../components/AddProductButton";
import { TProducts } from "../../typeProduce";

export const apiProduct: string =
  "https://64abfb149edb4181202ee8ce.mockapi.io/products/";
const getPostsData: () => Promise<TProducts> = async () =>
{
  const res: Response = await fetch( apiProduct, {
    cache: "no-cache",
    next: {
      tags: [ "products" ],
    },
  } );
  return res.json();
};

export default async function Home ()
{
  const [ products ] = await Promise.all( [ getPostsData() ] );

  return (
    <main className="relative">
      <h1 className="text-3xl font-bold text-center"> Product Warehouse </h1>
      <div className="fixed right-[10rem] bottom-[5rem] "
      >
        <AddProductButton />
      </div>

      <form
        action={ addProductToDatabase }
        className="flex flex-col gap-5 max-w-xl mx-auto p-5"
      >
        <input
          type="text"
          name="product"
          placeholder="Enter Product name..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          type="text"
          name="price"
          placeholder="Enter Product name..."
          className="border border-gray-300 p-2 rounded-md"
        />

        {/* <input type="image" formAction={ submitImage } /> */ }


        <button
          type="submit"
          className="bg-blue-500 p-2 rounded-md text-white">
          Add Product
        </button>
      </form>

      <h2 className="font-bold p-5">List og Product</h2>
      <div className="flex flex-wrap gap-5">
        { !products ? <h1>salah</h1> : products.map( ( p: any ) =>
        {
          if ( p == undefined || !p ) return <h1>Hot found</h1>;
          else
          {
            return (
              <div className="p-5 shadow" key={ p.id }>
                <p>{ p.product }</p>
                <p>Rp.{ p.price }</p>
              </div>
            );
          }
        } ) }
      </div>
    </main>
  );
}
