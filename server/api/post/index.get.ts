import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        categories: true
      },
      take: 10
    })
    const count = await prisma.post.count({})
    return { posts, count, page:1, ok: true }
  } catch (e) {
    console.log(e)
    return { posts: [], ok: false, e }
  }
})