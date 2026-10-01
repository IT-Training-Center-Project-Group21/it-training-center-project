import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        about: resolve(process.cwd(), 'about.html'),
        contact: resolve(process.cwd(), 'contact.html'),
        courses: resolve(process.cwd(), 'courses.html'),
        'enroll-now': resolve(process.cwd(), 'enroll-now.html'),
        'lesson-css': resolve(process.cwd(), 'lesson css.html'),
        'lesson-html': resolve(process.cwd(), 'lesson html.html'),
        'lesson-js': resolve(process.cwd(), 'lesson js.html'),
        'lesson-python': resolve(process.cwd(), 'lesson python.html'),
        'lesson-spl': resolve(process.cwd(), 'lesson spl.html'),
        'lesson-ux': resolve(process.cwd(), 'lesson ux.html'),
        'courses.js': resolve(process.cwd(), 'courses.js'),
        'html style.js': resolve(process.cwd(), 'html style.js'),
        'css style.js': resolve(process.cwd(), 'css style.js'),
        'js style.js': resolve(process.cwd(), 'js style.js'),
        'sql.js': resolve(process.cwd(), 'sql.js'),
        'style.js': resolve(process.cwd(), 'style.js'),
        'ux&ui.js': resolve(process.cwd(), 'ux&ui.js'),
        
      },
    },
  },
})
