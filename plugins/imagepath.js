// helper script to transform image paths, 
// if the image host directory structure changes change this file
// instead of rewriting computeds
// host url still resides in nuxt config
export default (context, inject) => {
  inject('imagepath', (pathType, filename) => {
    switch (pathType) {
      case 'writer':
        return context.$config.imageHost + '/writers/' + filename
      case 'writerth':
        return context.$config.imageHost + '/writers/thumbnails/' + filename
      case 'recipe':
        return context.$config.imageHost + '/recipes/' + filename
      case 'recipeth':
        return context.$config.imageHost + '/recipes/thumbnails/' + filename
      default:
        return context.$config.imageHost + '/' + filename
    }
  })
}