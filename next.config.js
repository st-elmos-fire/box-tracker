
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const { createSecureHeaders } = require("next-secure-headers");

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'markdown-loader'
    })
    return config
  },
  sassOptions: {
    outputStyle: 'expanded',
    indentWidth: 4,
    additionalData: `
        @use 'styles/vars' as *;
        @use 'styles/breakpoints' as *;
        @use 'styles/utilities' as utils;
        @use 'styles/animations' as animations;
      `
  },
  async headers() {
    // Default content security policy
    const cspString = isDev
      ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
      : ["'self'"]
    // Add additional content security policy directives
    const connectSrc = [...cspString, process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN]


    const directives = {
      'default-src': cspString,
      'script-src': cspString,
      'style-src': cspString,
      'img-src': [...cspString, 'blob:', process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL],
      'font-src': cspString,
      'connect-src': connectSrc,
      'frame-src': ["'self'"],
      'media-src': ["'self'"]
    }

    return [{
      source: "/(.*)",
      headers: createSecureHeaders({
        contentSecurityPolicy: {
          directives
        },
        forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
        referrerPolicy: "same-origin",
      })
    }];
  },
}, {}

