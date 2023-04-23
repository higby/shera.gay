export default async request => {
  let imageNumber = Math.floor(Math.random() * 118)
  let imageExtension = request.url.split('.').pop()

  return new URL(`/images/${imageNumber}.${imageExtension}`, request.url)
}

export const config = {
  path: ['/random.jpeg', '/random.avif', 'random.webp']
}
