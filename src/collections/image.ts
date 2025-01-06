import { buildProperty, buildCollection } from "firecms";
import enumLocales from "./locales.enum";
import uniqid from "uniqid";
interface IImage {
  custom_id: string;
  image: string;
  active: boolean;
  priority: number;
}

const ImageLocaleSchema = buildCollection({
  customId: enumLocales,
  name: "Locale",
  path: "locales",
  properties: {
    title: buildProperty({
      title: "Título",
      dataType: "string",
      columnWidth: 400,
    }),
    description: buildProperty({
      title: "Descrição",
      dataType: "string",
      columnWidth: 400,
      markdown: true,
    }),
  },
});

const ImageSchema = buildCollection<IImage>({
  name: "Imagens página inicial",
  path: "images_landing",
  subcollections: [ImageLocaleSchema],
  // defaultValues: {
  //   mobile: false,
  // },
  properties: {
    custom_id: {
      name: "custom_id",
      validation: { required: true },
      dataType: "string",
    },
    image: {
      dataType: "string",
      storage: {
        fileName: `{rand}.{file.ext}`,
        acceptedFiles: ["image/*"],
        storagePath: "images/landing-page",
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    priority: buildProperty({
      title: "Prioridade",
      dataType: "number",
      defaultValue: 0,
    }),
    active: {
      dataType: "boolean",
      name: "Active",
    },
  },
});

export default ImageSchema;
export { ImageLocaleSchema };
