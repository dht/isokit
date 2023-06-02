import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import analyze from 'rollup-plugin-analyzer';
import p from './package.json';
import { externals } from 'shared-base';

const ANALYZE_BUNDLE = false;

const cwd = path.resolve(process.cwd(), '../');

export default defineConfig({
  plugins: [dts({}), react()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'IsoKit',
      formats: ['es', 'umd'],
      fileName: (format) => `isokit.${format}.js`,
    },
    rollupOptions: {
      plugins: [ANALYZE_BUNDLE ? analyze() : null],
      ...externals({
        react: '',
        'react/jsx-runtime': '',
        ...p.dependencies,
      }),
    },
  },
  resolve: {
    alias: {
      'redux-store-builder': `${cwd}/redux-store-builder/src`,
      '@gdi/base-ui': `${cwd}/gdi-base-ui/src`,
      '@gdi/editors': `${cwd}/gdi-editors/src`,
      '@gdi/forms': `${cwd}/gdi-forms/src`,
      '@gdi/tables': `${cwd}/gdi-tables/src`,
    },
  },
});
