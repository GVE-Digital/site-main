/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gvedigital.com',
  generateRobotsTxt: false, // robots.txt gerado manualmente com regras customizadas
  sitemapSize: 5000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/_next/*'],
  additionalPaths: async () => [
    { loc: '/', priority: 1.0, changefreq: 'weekly' },
    { loc: '/servicos', priority: 1.0, changefreq: 'weekly' },
    { loc: '/cases', priority: 1.0, changefreq: 'weekly' },
    { loc: '/contato', priority: 1.0, changefreq: 'monthly' },
    { loc: '/sobre', priority: 0.8, changefreq: 'monthly' },
  ],
  transform: async (config, path) => {
    const highPriority = ['/', '/servicos', '/cases', '/contato']
    const mediumPriority = ['/sobre', '/blog']

    let priority = config.priority
    if (highPriority.includes(path)) priority = 1.0
    else if (mediumPriority.some(p => path.startsWith(p))) priority = 0.8

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
