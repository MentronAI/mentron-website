// lib/blog.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blogs')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: {
    name: string
    image: string
    role: string
  }
  image: string
  category: string[]
  featured: boolean
  published: boolean
  readingTime: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  // Create directory if it doesn't exist to avoid errors
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        image: data.image,
        category: data.category || [],
        featured: data.featured || false,
        published: data.published !== false,
        readingTime: readingTime(content).text,
        content,
      } as BlogPost
    })
    .filter((post) => post.published)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))

  return allPostsData
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author,
      image: data.image,
      category: data.category || [],
      featured: data.featured || false,
      published: data.published !== false,
      readingTime: readingTime(content).text,
      content,
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()

  posts.forEach((post) => {
    post.category.forEach((cat) => categories.add(cat))
  })

  return Array.from(categories).sort()
}
