import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    // const data = await readBody(event)
    const data = {
      user: {
        email: 'newksdfj1'
      },
      posts: [
        { title: 'sdfsdfsd' },
        { title: 'sdfsdfsdedrwe' },
        { title: 'sdfsdfsdedrwe3123' },
      ] as any[]
    }
    if (data) {
      const user = await prisma.user.create({
        data: {
          ...data.user,
          posts: {
            createMany: {
              data: data.posts
            }
          }
        },
        include: {
          posts: true
        }
      })
      
      return { user, ok: true }
    }
    return { user: null, ok: false, e: 'no data' }
  } catch (e) {
    console.log(e)
    return { user: null, ok: false, e }
  }
})