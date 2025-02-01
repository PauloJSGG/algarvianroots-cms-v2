import { buildCollection, buildProperty } from "@firecms/core";
import { EnumValues } from "@firecms/core";
import { locales } from "../types/locales";

type Locale = {
  title: string;
  description: string;
  text: string;
};

const localeArticleCollection = buildCollection<Locale>({
  id: "article_locales",
  path: "article_locales",
  icon: "Translate",
  customId: locales,
  name: "Traduções",
  singularName: "Tradução",
  properties: {
    title: {
      dataType: "string",
      name: "Titulo",
      validation: { required: true },
    },
    description: {
      dataType: "string",
      name: "Descrição",
      multiline: true,
    },
    text: {
      dataType: "string",
      name: "Conteudo do artigo",
      markdown: true,
      storage: {
        storagePath: (data) => `images/articles/${data.entityId}`,
        acceptedFiles: ["image/*"],
        imageCompression: {
          quality: 60,
          maxWidth: 1280,
        },
        maxSize: 1000000,
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },
  },
});

export const localeArticleCollectionGroup = buildCollection({
  ...localeArticleCollection,
  name: "Traduções dos Artigos",
  description: "Traduções dos artigos",
  group: "Traduções",
  collectionGroup: true,
});

// This is a demo collection with many of the available properties
export const articleCollection = buildCollection({
  id: "articles",
  name: "Artigos",
  description: "Esta é uma coleção de artigos/blog",
  path: "articles",
  subcollections: [localeArticleCollection],
  properties: {
    // storing a single image
    main_image: {
      dataType: "string",
      name: "Imagem principal",
      storage: {
        // fileName: (data) => `${data.file}.${data.file.}`,
        storagePath: (data) => `images/articles/${data.entityId}`,
        imageCompression: {
          quality: 60,
          maxWidth: 1280,
        },
        acceptedFiles: ["image/*"],
        maxSize: 1000000,
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    },

    link: {
      dataType: "string",
      name: "Link",
      url: true,
      validation: {
        required: false,
      },
    },

    //slug
    slug: {
      dataType: "string",
      name: "Slug",
      validation: {
        required: true,
        lowercase: true,
        matches: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      },
    },

    // simple boolean
    active: buildProperty({
      dataType: "boolean",
      name: "Ativo?",
      defaultValue: true,
    }),

    // auto update on create
    created_at: {
      dataType: "date",
      name: "Criado a",
      autoValue: "on_create",
      hideFromCollection: true,
    },

    // auto update on update
    updated_on: {
      dataType: "date",
      name: "Atualizado a",
      autoValue: "on_update",
      hideFromCollection: true,
    },
  },
});
