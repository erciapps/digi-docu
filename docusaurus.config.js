import { themes as prismThemes } from 'prism-react-renderer';
import autoprefixer from 'autoprefixer';
import tailwindcss from '@tailwindcss/postcss';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DIGI',
  tagline: 'Erciapps are cool',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://digi-erciapps.sytes.net',
  baseUrl: '/',

  organizationName: 'erciapps',
  projectName: 'digi-docu',
  trailingSlash: false,
  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // 🔌 Plugins
  plugins: [
    '@docusaurus/plugin-ideal-image',
    'docusaurus-plugin-image-zoom',

    // 👇 Plugin integrado para Tailwind + Autoprefixer
    function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(tailwindcss);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions;
        },
      };
    },
  ],

  // ⚙️ Preset clásico + integración CSS personalizada
  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // 🔥 AGREGAR ESTO: Deshabilitar TOC lateral por defecto
          sidebar: {
            hideable: false,
            autoCollapseCategories: false,
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          // 👇 Procesado por Tailwind y PostCSS
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  // 🎨 Tema visual y comportamiento del sitio
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',

    // 🔥 AGREGAR ESTO: Configuración para ocultar TOC
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },

    // 🔥 AGREGAR ESTO: Deshabilitar TOC en todas las páginas por defecto
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },

    navbar: {
      title: '',
      logo: {
        alt: 'ErciApps',
        src: 'img/ercilogo.png',
        target: '_self', // 🔹 abre en la misma pestaña
        href: 'https://erciapps.sytes.net',
        height: 40, // 🔹 tamaño del logo
        width: 40,
      },
      items: [
        { to: '/', label: 'INICIO', position: 'left' },
        { to: '/docs/category/ut1---entornos-it-y-ot', label: 'UT1', position: 'left' },
      ],
    },

    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ErciApps`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'csharp', 'bash', 'python'],
    },

    zoom: {
      selector: '.markdown img, .markdown picture img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
    },

    // ✅ Meta viewport necesario para que las media queries funcionen bien
    headTags: [
      {
        tagName: 'meta',
        attributes: {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      },
    ],
  },

  // 🖋️ Fuente moderna
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  ],
};

export default config;