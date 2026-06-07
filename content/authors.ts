export interface Author {
  slug: string
  name: string
  role: string
  image: string
  bio: string
}

const AUTHORS: Record<string, Author> = {
  'ananya-krishnan': {
    slug: 'ananya-krishnan',
    name: 'Ananya Krishnan',
    role: 'Content Lead',
    image: '/images/authors/ananya.png',
    bio: 'Writes about AI-assisted learning, spaced-repetition research, and adaptive assessment for K-12, higher education, and corporate L&D. Covers product developments and research briefings for Mentron.',
  },
}

export function getAuthor(name: string): Author | undefined {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return AUTHORS[slug]
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS)
}
