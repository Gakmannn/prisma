import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    // const data = await readBody(event)
    const data = {
      post: {
        title: ';asdasdsa',
        authorId: 28,
        categories: [1,2]
      } as any
    }
    
    if (data) {
      const post = await prisma.post.create({
        data: {
          ...data.post,
        },
      })

      return { post, ok: true }
    }
    return { post: null, ok: false, e: 'no data' }
  } catch (e) {
    console.log(e)
    return { post: null, ok: false, e }
  }
})