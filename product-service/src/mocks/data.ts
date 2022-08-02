import * as Yup from "yup";

export const ProductSchema = Yup.object({
  id: Yup.string(),
  title: Yup.string().required().default(""),
  description: Yup.string().default(""),
  price: Yup.number().positive().required().defined().default(0),
});

export const AvailableProductSchema = ProductSchema.shape({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;

export const products: Product[] = [
    {
      description: "Short Product Description1",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      title: "ProductOne",
    },
    {
      description: "Short Product Description7",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      price: 15,
      title: "ProductTitle",
    },
    {
      description: "Short Product Description2",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      price: 23,
      title: "Product",
    },
    {
      description: "Short Product Description4",
      id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
      price: 15,
      title: "ProductTest",
    },
    {
      description: "Short Product Descriptio1",
      id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
      price: 23,
      title: "Product2",
    },
    {
      description: "Short Product Description7",
      id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
      price: 15,
      title: "ProductName",
    },
  ];