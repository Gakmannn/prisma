export default defineEventHandler(async (event) => {

  // const data = event.context.fields
  // data.img = event.context.files[0].newFileName

  return { url: 'img/'+event.context.files[0].newFileName }
})