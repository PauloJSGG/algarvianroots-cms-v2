import { buildProperty, buildCollection } from "firecms";
import enumLocales from "./locales.enum";

const LocaleSchema = buildCollection({
  path: "locales",
  customId: enumLocales,
  name: "Locale",
  hideFromNavigation: false,
  properties: {
    content: buildProperty({
      title: "Content",
      description:
        "Example of a complex array with multiple properties as children",
      validation: { required: true },
      dataType: "array",
      columnWidth: 400,
      oneOf: {
        properties: {
          images: {
            title: "Images",
            dataType: "array",
            of: {
              dataType: "string",
              storageMeta: {
                mediaType: "image",
                storagePath: "images",
                acceptedFiles: ["image/*"],
                metadata: {
                  cacheControl: "max-age=1000000",
                },
              },
            },
            description:
              "This fields allows uploading multiple images at once and reordering",
          },
          text: {
            dataType: "string",
            title: "Text",
            markdown: true,
          },
          small_text: {
            dataType: "string",
            title: "Small text",
            markdown: true,
          },
        },
      },
    }),
  },
});

export default LocaleSchema;
