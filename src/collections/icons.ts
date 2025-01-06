import { buildProperty, buildCollection } from "firecms";
import enumLocales from "./locales.enum";
import uniqid from "uniqid";
interface IImage {
  custom_id: string;
  image: string;
  active: boolean;
}

const Iconchema = buildCollection({
  name: "Icons",
  path: "icons",
  properties: {
    icon: {
      name: "Icon",
      dataType: "string",
      storage: {
        fileName: () => uniqid(),
        acceptedFiles: ["image/*"],
        storagePath: "images/icons-v2",
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
    name: {
      name: "Name",
      dataType: "string",
    },
  },
});

export default Iconchema;
