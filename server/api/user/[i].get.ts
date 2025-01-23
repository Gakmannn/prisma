import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const i = event.context.params?.i
  try {
    if (i && isFinite(+i)) {
      const users = await prisma.user.findMany({
        orderBy: {
          id: 'desc'
        },
        take: 10,
        skip: 10 * (+i-1)
      })
      const count = await prisma.user.count({})
      return { users, count, page: +i, ok: true }
    }
    return { user:[], ok: false }
  } catch (e) {
    console.log(e)
    return { users: [], ok: false, e }
  }
})