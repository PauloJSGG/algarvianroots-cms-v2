import { buildProperty, buildCollection } from "firecms";
import enumLocales from "./locales.enum";

interface ILink {
  custom_id: string;
  hide: boolean;
}

const LinkLocaleSchema = buildCollection({
  name: "Link locale",
  customId: enumLocales,
  path: "locales",
  properties: {
    label: buildProperty({
      title: "Label",
      description:
        "Example of a complex array with multiple properties as children",
      validation: { required: true, unique: true },
      dataType: "string",
      columnWidth: 400,
    }),
  },
});

const LinkSchema = buildCollection<ILink>({
  name: "Links",
  path: "links",
  subcollections: [LinkLocaleSchema],
  properties: {
    custom_id: {
      name: "Custom ID",
      validation: { required: true, unique: true },
      dataType: "string",
      enumValues: {
        "about-us": "About us",
        contact: "Contact",
        courses: "Courses",
      },
    },
    hide: {
      name: "Hide",
      dataType: "boolean",
    },
  },
});

export default LinkSchema;
export { LinkLocaleSchema };
