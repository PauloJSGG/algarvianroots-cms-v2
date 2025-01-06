import { buildProperty, buildCollection } from "firecms";
import enumLocales from "./locales.enum";
import uniqid from "uniqid";

interface ICourse {
  custom_id: string;
  category: string;
  price: number;
  active: boolean;
  image: string;
  images: Array<string>;
  bar: string;
  color: string;
  video: string;
  pluralo_id: string;
  priority: number;
}

const CategoryLocaleSchema =  buildCollection({
  name: "Locale",
  path: "locales",
  customId: enumLocales,
  properties: {
    name: buildProperty({
      title: "Título",
      dataType: "string",
      columnWidth: 400,
      validation: { required: true },
    }),
}
})

const CategorySchema = buildCollection({
  name: "Categorias",
  path: "categories",
  subcollections: [CategoryLocaleSchema],
  properties: {
    custom_id: {
      name: "custom_id",
      validation: { required: true },
      dataType: "string",
    },
    priority: buildProperty({
      title: "Prioridade",
      dataType: "number",
      defaultValue: 0,
    }),
    active: {
      dataType: "boolean",
      defaultValue: true,
    },
    image: {
      dataType: "string",
      storage: {
        fileName: () => uniqid(),
        acceptedFiles: ["image/*"],
        storagePath: "images/categories",
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
  },
});

export default CategorySchema;