import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: 'desc'
      },
      take: 10
    })
    const count = await prisma.user.count({})
    return { users, count, page:1, ok: true }
  } catch (e) {
    console.log(e)
    return { users: [], ok: false, e }
  }
})