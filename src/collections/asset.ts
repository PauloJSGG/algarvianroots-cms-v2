import { buildCollection } from "@firecms/core";
import LocaleSchema from "./locale";

interface IAsset {
  custom_id: string;
  images: string[];
}

const AssetSchema = buildCollection<IAsset>({
  id: "assets",
  name: "Textos generalizados(links,etc)",
  path: "assets",
  subcollections: [LocaleSchema],
  properties: {
    custom_id: {
      name: "custom_id",
      validation: { required: true, unique: true },
      dataType: "string",
    },
    images: {
      name: "Images",
      dataType: "array",
      of: {
        name: "Images",
        dataType: "string",
        storage: {
          fileName: () => uniqid(),
          storagePath: "images/assets",
          acceptedFiles: ["image/*"],
          metadata: {
            cacheControl: "max-age=1000000",
          },
        },
      },
    },
  },
});

export default AssetSchema;
