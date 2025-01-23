import prisma from "~/lib/prisma"

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event)
    if (data) {
      const user = await prisma.user.create({
        data
      })
      return { user, ok: true }
    }
    return { user:null, ok: false, e:'no data' }
  } catch (e) {
    console.log(e)
    return { user: null, ok: false, e }
  }
})