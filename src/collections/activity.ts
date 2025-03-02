import { buildCollection, buildProperty } from "@firecms/core";
import { locales } from "../types/locales";
type Locale = {
  name: string;
  description: string;
  info: string;
  itinerary: string;
  what_it_includes: string;
  points_of_interest: string;
  what_to_bring: string;
  // reservation_information: string;
  // cancellation_policy: string;
};

const localeActivityCollection = buildCollection<Locale>({
  id: "activity_locales",
  path: "activity_locales",
  icon: "Translate",
  customId: locales,
  name: "Traduções",
  singularName: "Tradução",
  properties: {
    name: {
      dataType: "string",
      name: "Nome",
      validation: { required: true },
    },
    description: {
      name: "Descrição",
      validation: { required: true },
      dataType: "string",
      multiline: true,
    },
    info: {
      name: "Informação",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    itinerary: {
      name: "Itenerário",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    what_it_includes: {
      name: "O que inclui",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    points_of_interest: {
      name: "Pontos de interesse",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
    what_to_bring: {
      name: "O que trazer?",
      validation: { required: true },
      dataType: "string",
      markdown: true,
    },
  },
});

export const localeActivityCollectionGroup = buildCollection({
  ...localeActivityCollection,
  name: "Traduções das atividades",
  description:
    "Traduções das atividades. Pode adicionar traduções para diferentes idiomas.",
  group: "Traduções",
  collectionGroup: true,
});

// This is a demo collection with many of the available properties
export const activityCollection = buildCollection({
  id: "activities",
  name: "Atividades",
  path: "activities",
  subcollections: [localeActivityCollection],
  properties: {
    //slug
    slug: {
      dataType: "string",
      name: "Slug",
      validation: {
        unique: true,
        required: true,
        lowercase: true,
        matches: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      },
    },
    pluralo_id: {
      dataType: "string",
      name: "Pluralo ID",
      validation: {
        required: false,
      },
    },
    category: {
      dataType: "string",
      name: "Categoria",
      enumValues: {
        workshops: "Workshop",
        tours: "Tours",
        experiences: "Experiences",
        hikes: "Hikes",
        birdwatching: "Birdwatching",
        accommodation: "Accommodation",
        transportation: "Transportation",
        tailor_made: "Tailor-made",
      },
      validation: {
        required: true,
      },
    },
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
      name: "Actualizado a",
      autoValue: "on_update",
      hideFromCollection: true,
    },

    // video
    video: {
      name: "Video",
      dataType: "string",
      validation: { required: false },
      storage: {
        storagePath: (data) => `videos/activities/${data.entityId}`,
        acceptedFiles: ["video/*"],
        fileName: (context) => {
          return context.file.name;
        },
        maxSize: 20000000,
      },
      columnWidth: 400,
    },

    main_image: {
      name: "Imagem principal",
      dataType: "string",
      validation: { required: true },
      storage: {
        storagePath: (data) => `images/activities/${data.entityId}`,
        acceptedFiles: ["image/*"],
        imageCompression: {
          quality: 60,
          maxWidth: 1280,
        },
      },
    },

    // storing multiple images
    images: {
      dataType: "array",
      name: "Imagens",
      of: {
        dataType: "string",
        storage: {
          storagePath: (data) => `images/activities/${data.entityId}`,
          imageCompression: {
            quality: 60,
            maxWidth: 1280,
          },
          acceptedFiles: ["image/*"],
          metadata: {
            cacheControl: "max-age=1000000",
          },
        },
      },
      description: "Permite fazer upload de várias imagens de uma só vez",
    },
    duration: {
      dataType: "number",
      name: "Duração",
      description: "Duração em horas",
    },
    guide: {
      dataType: "boolean",
      name: "Guia?",
      description: "Está incluído guia?",
      defaultValue: true,
    },
    snack: {
      dataType: "boolean",
      name: "Snack?",
      description: "Está incluído snack?",
      defaultValue: true,
    },
    group: {
      dataType: "map",
      name: "Grupo",
      description: "É uma actividade de grupo",
      properties: {
        active: {
          dataType: "boolean",
          name: "Ativo?",
          // description: "Está incluído grupo?",
        },
        min: {
          dataType: "number",
          name: "Mínimo",
          description: "Número mínimo de participantes",
        },
        max: {
          dataType: "number",
          name: "Máximo",
          description: "Número máximo de participantes",
        },
      },
    },
    transport: {
      dataType: "boolean",
      name: "Transporte?",
      description: "Está incluído transporte?",
      defaultValue: true,
    },
    hike: {
      dataType: "map",
      name: "Caminhada",
      description: "Informação sobre a caminhada",
      properties: {
        active: {
          dataType: "boolean",
          name: "Ativo?",
          description: "Está incluida caminhada?",
        },
        distance: {
          dataType: "number",
          name: "Distância",
          description: "Distância em km",
        },
        duration: {
          dataType: "number",
          name: "Duração",
          description: "Duração em horas",
        },
        difficulty: {
          dataType: "string",
          name: "Dificuldade",
          enumValues: {
            easy: "Fácil",
            medium: "Médio",
            hard: "Difícil",
          },
        },
      },
    },

    workshop: {
      dataType: "map",
      name: "Workshop",
      description: "Informação sobre o workshop",
      properties: {
        active: {
          dataType: "boolean",
          name: "Ativo?",
          description: "Está incluido workshop?",
        },
        duration: {
          dataType: "number",
          name: "Duração",
          description: "Duração em horas",
          defaultValue: 2,
        },
        equipment: {
          dataType: "string",
          name: "Equipamento",
          description: "Equipamento necessário",
          defaultValue: "arts_and_crafts",
          enumValues: {
            arts_and_crafts: "Artes e ofícios",
          },
        },
      },
    },

    meeting_point: {
      dataType: "map",
      name: "Ponto de encontro",
      description: "Where does the activity start?",
      properties: {
        name: {
          dataType: "string",
          name: "Nome",
          defaultValue: "AlgarvianRoots HQ",
        },
        link: {
          dataType: "string",
          name: "Link",
          defaultValue: "https://goo.gl/maps/z1hNMwrJWHgzhFmc6",
        },
      },
    },
  },
});
