import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    const user = await prisma.user.update({
      where: {
        id: +data.id
      },
      data: {
        name: data.name
      }
    })
    return { user, ok: true }
  } catch (e) {
    console.log(e)
    return { user: null, ok: false, e }
  }
})