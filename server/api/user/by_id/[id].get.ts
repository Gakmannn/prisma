import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id:+id
        }
      })
      return { user, ok: true }
    }
    return { user:null, ok: true }
  } catch (e) {
    console.log(e)
    return { user: null, ok: false, e }
  }
})