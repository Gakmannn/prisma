import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const email = event.context.params?.email
  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      return { user, ok: true }
    }
    return { user: null, ok: true }
  } catch (e) {
    console.log(e)
    return { user: null, ok: false, e }
  }
})