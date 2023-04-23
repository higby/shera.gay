export default async request => {
  const comparisonDate = new Date(2018, 10, 18)
  let hours = Math.abs(new Date() - comparisonDate) / 36e5

  let imageNumber = Math.floor(hours % 118)
  let imageExtension = request.url.split('.').pop()

  return new URL(`/images/${imageNumber}.${imageExtension}`, request.url)
}

export const config = {
  path: ['/gay.jpeg', '/gay.avif', 'gay.webp']
}
