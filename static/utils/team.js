// img will be generated from id, with jpg img
// check src/.vuepress/public/authors/
export const teamsTranslatations = {
  developer: {
    label: 'Pôle développeur',
    options: ['techs', 'status'],
  },
  commercial: {
    label: 'Pôle commercial',
    options: ['status'],
  },
  director: {
    label: 'Pôle dirigeant',
    options: ['status'],
  },
}
export const statusTranslations = {
  developer: {
    lead: {
      male: 'Lead développeur web',
      female: 'Lead développeuse web',
    },
    base: {
      male: 'Développeur web',
      female: 'Développeuse web',
    },
    junior: {
      male: 'Développeur web junior',
      female: 'Développeuse web junior',
    },
    'junior-voc': {
      male: 'Développeur web junior en alternance',
      female: 'Développeuse web junior en alternance',
    },
  },
  manager: {
    base: {
      male: 'Manager',
      female: 'Manageuse',
    },
  },
  commercial: {
    base: {
      male: 'Commercial',
      female: 'Commerciale',
    },
  },
  webdesigner: {
    base: {
      male: 'Web designer',
      female: 'Web designeuse',
    },
  },
  'management-assistant': {
    base: {
      male: 'Assistant de gestion et projet web',
      female: 'Assistante de gestion et projet web',
    },
  },
  'seo-expert': {
    base: {
      male: 'Expert SEO',
      female: 'Experte SEO',
    },
  },
  'commercial-business': {
    base: {
      male: 'Business developer',
      female: 'Business developer',
    },
  },
  'content-manager': {
    base: {
      male: 'Content manager',
      female: 'Content manager',
    },
  },
  director: {
    base: {
      male: 'Dirigeant',
      female: 'Dirigeante',
    },
  },
}
export const techs = {
  java: {
    label: 'Java',
  },
  php: {
    label: 'PHP',
  },
  laravel: {
    label: 'Laravel',
  },
  symfony: {
    label: 'Symfony',
  },
  nuxtjs: {
    label: 'Nuxt.js',
  },
  js: {
    label: 'JavaScript',
  },
  vuejs: {
    label: 'Vue.js',
  },
}

export const teams = {
  // developers
  developer: [
    {
      name: {
        firstname: 'Ewilan',
        lastname: 'Rivière',
      },
      gender: 'female',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '2019-10-01',
      profile: {
        team: 'developer',
        type: 'developer',
        status: 'junior-voc',
        options: {
          techs: ['js', 'vuejs'],
        },
      },
      citations: [
        "Si c'est fait en Markdown, je suis d'accord.",
        "Mais y'a pas de badges dans ton readme !",
      ],
    },
    {
      name: {
        firstname: 'Adrien',
        lastname: 'Beaudouin',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'developer',
        type: 'developer',
        status: 'lead',
        options: {
          techs: ['js', 'vuejs'],
        },
      },
      citations: ['Attends, tu as utilisé du Sass avec Tailwind ?!'],
    },
    {
      name: {
        firstname: 'Mathieu',
        lastname: 'Monnier',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'developer',
        type: 'developer',
        options: {
          techs: ['js', 'vuejs'],
        },
      },
      citations: [
        "Une mise en prod un vendredi après-midi à 17h ?<br/>Qu'est-ce qui pourrait mal tourner, hein ?",
      ],
    },
    {
      name: {
        firstname: 'Laure',
        lastname: 'Coussout',
      },
      gender: 'female',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'developer',
        type: 'developer',
        status: 'junior',
        options: {
          techs: ['java', 'php'],
        },
      },
      citations: [
        'Donc après avoir travaillé sur Prestashop 1.6, je dois bosser sur un WordPress multi-site ?<br/>Tout.va.bien',
      ],
    },
    {
      name: {
        firstname: 'Laurent',
        lastname: 'Chevalier',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'developer',
        type: 'developer',
        status: 'lead',
        options: {
          techs: ['java'],
        },
      },
      citations: [
        "J'ai rien contre cette techno, c'est pas du Java, c'est tout.",
      ],
    },
    {
      name: {
        firstname: 'Mathys',
        lastname: 'Allain',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'developer',
        type: 'developer',
        status: 'junior',
        options: {
          techs: ['java'],
        },
      },
      citations: ['Du Ionic ?! Moi vivant, jamais !'],
    },
  ],
  // commercial
  commercial: [
    {
      name: {
        firstname: 'Michel',
        lastname: 'Trauth',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'commercial',
        type: 'manager',
      },
      citations: [
        "Je n'ai rien contre une techno cool, tant qu'elle permet la productivité.",
        'Non, les clients ne veulent pas écrire des articles en Markdown.',
      ],
    },
    {
      name: {
        firstname: 'Julie',
        lastname: 'Urbaniack',
      },
      gender: 'female',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'commercial',
        type: 'commercial-business',
      },
      citations: [
        "J'ai appelé le client hier, j'ai rendez-vous avec lui à 16h, le dossier est en béton.<br/>Tu as des questions ?",
      ],
    },
    {
      name: {
        firstname: 'Nina',
        lastname: 'Vaillant',
      },
      gender: 'female',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'commercial',
        type: 'seo-expert',
      },
      citations: [
        "Tu es au courant qu'il n'y a pas de balise h1 sur cette page ?",
      ],
    },
    {
      name: {
        firstname: 'Adèle',
        lastname: 'Fougère',
      },
      gender: 'female',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'commercial',
        type: 'management-assistant',
      },
    },
    {
      name: {
        firstname: 'Camille',
        lastname: 'Boniface',
      },
      gender: 'female',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'commercial',
        type: 'webdesigner',
      },
      citations: [
        "J'ai une annonce importante à faire : est-ce que quelqu'un aurait un taille-crayon s'il vous plaît ?",
      ],
    },
    {
      name: {
        firstname: 'Aurélien',
        lastname: 'Page',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'commercial',
        type: 'content-manager',
      },
    },
  ],
  // director
  director: [
    {
      name: {
        firstname: 'Michael',
        lastname: 'Hyot',
      },
      gender: 'male',
      story:
        'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
      from: '',
      profile: {
        team: 'director',
        type: 'director',
      },
    },
  ],
}
