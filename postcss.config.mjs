const config = {
  plugins: {
    "@tailwindcss/postcss": {
      // Suppress canonicalClasses suggestions for gradient utilities
      diagnostics: {
        suggestCanonicalClasses: false,
      },
    },
  },
};

export default config;
