import { buildProperty, buildCollection, EntityReference } from "firecms";
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
  category_reference: EntityReference;
}

const CourseLocaleSchema = buildCollection({
  name: "Locale",
  path: "locales",
  customId: enumLocales,
  properties: {
    meta_description: buildProperty({
      title: "Meta description",
      dataType: "string",
      columnWidth: 400,
      config: { markdown: true }
    }),
    meta_tags: buildProperty({
      title: "Meta description",
      dataType: "array",
      columnWidth: 400,
      of: {
        dataType: "string",
      },
    }),  
    title: buildProperty({
      title: "Title",
      dataType: "string",
      columnWidth: 400,
    }),
    info: buildProperty({
      title: "Info",
      description:
        "Example of a complex array with multiple properties as children",
      validation: { required: true },
      dataType: "array",
      columnWidth: 400,
      oneOf: {
        properties: {
          icon: {
            dataType: "reference",
            name: "Icon",
            path: "icons",
            description: "Reference to icon",
            validation: {
              required: true,
            },
          },
          hyperlink: {
            dataType: "map",
            title: "Hyperlink",
            description: "Hyperlink",
            properties: {
              label: {
                name: "Label",
                dataType: "string",
              },
              url: {
                name: "URL",
                dataType: "string",
              },
            },
          },
          text: {
            dataType: "string",
            title: "Text",
          },
          small_text: {
            dataType: "string",
            title: "Small text",
          },
        },
      },
    }),
    main_description: buildProperty({
      title: "Descrição principal",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Titulo",
          dataType: "string",
        },
        text: {
          title: "Texto",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    description: buildProperty({
      title: "Descrição",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    itinerary: buildProperty({
      title: "itinerary",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    content: buildProperty({
      title: "What it includes",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    points: buildProperty({
      title: "Points of interest",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    what_to_bring: buildProperty({
      title: "What to bring",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    information_of_reservation: buildProperty({
      title: "Information of the reservation",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
    cancelation_policy: buildProperty({
      title: "Cancelation Policy",
      dataType: "map",
      columnWidth: 400,
      properties: {
        label: {
          title: "Label",
          dataType: "string",
        },
        text: {
          title: "Text",
          dataType: "string",
          markdown: true,
        },
      },
    }),
  },
});

const CourseSchema = buildCollection<ICourse>({
  name: "Experiências",
  path: "courses",
  subcollections: [CourseLocaleSchema],
  properties: {
    custom_id: {
      name: "custom_id",
      validation: { required: true },
      dataType: "string",
    },
    category: {
      name: "Category",
      validation: { required: true },
      dataType: "string",
      enumValues: {
        experiences: "Experiences",
        workshops: "Workshops",
        hikes: "Hikes",
        find_more: "Find more",
      },
    },
    category_reference: {
      name: "Category",
      dataType: "reference",
      path: "categories",
      previewProperties: ["name"]
    },
    pluralo_id: {
      name: "pluralo_id",
      dataType: "string",
    },
    priority: {
      name: "Priority",
      dataType: "number",
      defaultValue: 0,
    },
    price: {
      name: "Price",
      dataType: "number",
      hideFromCollection: true,
    },
    active: {
      name: "Active",
      dataType: "boolean",
    },
    image: {
      dataType: "string",
      storage: {
        fileName: () => uniqid(),
        acceptedFiles: ["image/*"],
        storagePath: "images/courses",
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    bar: {
      name: "Bar image",
      dataType: "string",
      storage: {
        fileName: () => uniqid(),
        acceptedFiles: ["image/*"],
        storagePath: "images/courses",
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    images: {
      dataType: "array",
      name: "Images",
      of: {
        dataType: "string",
        storage: {
          fileName: () => uniqid(),
          acceptedFiles: ["image/*"],
          storagePath: "images/courses",
          metadata: {
            cacheControl: "max-age=1000000",
          },
        },
      },
      description: "This fields allows uploading multiple images at once",
    },
    color: {
      name: "color",
      validation: { required: true },
      dataType: "string",
      enumValues: {
        brown: "Brown",
        yellow: "Yellow",
        "yellow-darker": "Yellow Darker",
        blue: "Blue",
        green: "green",
      },
    },
    video: {
      dataType: "string",
      storage: {
        fileName: () => uniqid(),
        storagePath: "videos/courses",
        acceptedFiles: ["video/*"],
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
  },
});

export default CourseSchema;
export { CourseLocaleSchema };
