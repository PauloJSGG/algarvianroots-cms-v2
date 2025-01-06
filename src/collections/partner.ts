import { buildProperty, buildCollection } from "firecms";
import enumLocales from "./locales.enum";
import uniqid from "uniqid";

interface IPartner {
  custom_id: string;
  image: string;
  priority: number;
  url: string;
  // video: string;
  // category: string;
  // price: number;
  // active: boolean;
  // images: Array<string>;
  // bar: string;
  // color: string;
  // pluralo_id: string;
}

// const CategoryLocaleSchema =  buildCollection({
//   name: "Locale",
//   path: "locales",
//   customId: enumLocales,
//   properties: {
//     name: buildProperty({
//       title: "Título",
//       dataType: "string",
//       columnWidth: 400,
//       validation: { required: true },
//     }),
// }
// })

const PartnerSchema = buildCollection<IPartner>({
  name: "Parceiros",
  path: "partners",
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
    url: buildProperty({
      title: "Url",
      dataType: "string",
      validation: { required: false },
    }),
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

export default PartnerSchema;