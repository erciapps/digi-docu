import {themes as prismThemes} from 'prism-react-renderer';

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

  // ✅ Nueva forma de configurar advertencias de Markdown
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

  plugins: [
    '@docusaurus/plugin-ideal-image',
    'docusaurus-plugin-image-zoom',   // 👈 añadido el plugin de zoom
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ErciApps',
      logo: {
        alt: 'ErciApps',
        src: 'img/logo.svg',
        href: 'https://erciapps.sytes.net',
      },
      items: [
        {to: '/', label: 'INICIO', position: 'left'},
        {to: '/docs/category/ut1---entornos-it-y-ot', label: 'UT1', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} ErciApps`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },

    // 👇 configuración del zoom
    zoom: {
      selector: '.markdown img, .markdown picture img',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(50, 50, 50)',
      },
      config: {
        // puedes meter aquí opciones extra de medium-zoom
      },
    },
  },
};

export default config;
