const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Suppress "multiple lockfiles" warning: this project lives inside a parent
  // monorepo (truffle-flattener) that has its own package-lock.json.
  // Setting turbopack.root (absolute) tells Next.js to treat this directory
  // as the project root instead of the monorepo root.
  turbopack: {
    root: path.resolve(__dirname),
  },
}

module.exports = nextConfig
