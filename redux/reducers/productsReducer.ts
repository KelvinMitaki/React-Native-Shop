import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import { AddNewProduct, EditProduct } from "../../screens/EditProductScreen";
import { FetchProducts } from "../../screens/ProductsOverviewScreen";
import { DeleteItem } from "../../screens/UserProductsScreen";

export interface ProductsState {
  availableProducts: Product[];
  userProducts: Product[];
}

type Action = DeleteItem | AddNewProduct | EditProduct | FetchProducts;

const INITIAL_STATE: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(p => p.ownerId === "u1")
};

const productReducer = (
  state = INITIAL_STATE,
  action: Action
): ProductsState => {
  switch (action.type) {
    case "fetchProducts":
      return { ...state, availableProducts: action.payload };
    case "deleteItem":
      const { id, ownerId } = action.payload;
      return {
        ...state,
        userProducts: state.userProducts.filter(
          item => item.id !== id && item.ownerId === ownerId
        ),
        availableProducts: state.availableProducts.filter(
          item => item.id !== id
        )
      };
    case "addProduct":
      return {
        ...state,
        availableProducts: [
          {
            ...action.payload,
            id: action.payload.id!,
            ownerId: "u1",
            price: parseFloat(action.payload.price)
          },
          ...state.availableProducts
        ],
        userProducts: [
          {
            ...action.payload,
            id: action.payload.id!,
            ownerId: "u1",
            price: parseFloat(action.payload.price)
          },
          ...state.availableProducts
        ]
      };
    case "editProduct":
      let userProducts = state.userProducts;
      let availableProducts = state.availableProducts;
      const itemIndex = userProducts.findIndex(i => i.id === action.payload.id);
      const availableProdIndex = availableProducts.findIndex(
        i => i.id === action.payload.id
      );
      if (itemIndex !== -1 && availableProdIndex !== -1) {
        userProducts[itemIndex] = {
          ...action.payload,
          price: parseFloat((action.payload.price as unknown) as string)
        };
        availableProducts[availableProdIndex] = {
          ...action.payload,
          price: parseFloat((action.payload.price as unknown) as string)
        };
        return { ...state, userProducts, availableProducts };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default productReducer;
