const knex = require('../database/knex')

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body
    const user_id = request.user.id

    const note_id = await knex("notes").insert({
      title,
      description,
      user_id
    })

    //Vamos percorrer os links que temos
    const linksInsert = links.map(link => {
      return{
        note_id, //Estamos passando o id que a nota está vinculada
        url: link //Estamos criando um objeto novo
      }
    })

    //Estamos inserindo dentro da nossa tabela
    await knex("links").insert(linksInsert)

    const tagsInsert = tags.map(name => {
      return{
        note_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert)

    response.json()

  }

  async show(request, response) {
    const { id } = request.params
    //Where -> Vamos pegar um nota baseada no ID e iremos pegar somente uma NOTA
    const note = await knex("notes").where({ id }).first()
    //Vamos buscar pelas TAGS e vamos dizer que note_id é igual a id e vamos ordenar por nome
    const tags = await knex("tags").where({ note_id: id}).orderBy("name")
    const links = await knex("links").where({ note_id: id }).orderBy("created_at")

    return response.json({
      //Vamos despejar todos os detalhes das nossas "note"
      ...note,
      tags,
      links
    })

  }

  async delete(request, response){
    const { id } = request.params

    await knex("notes").where({ id }).delete()

    return response.json()
  }

   async index(request, response){
    const { title, tags } = request.query
    //Vamos filtrar pelas notas do ID do usuário
    const user_id = require.user.id

    let notes

    if(tags){
      const filterTags = tags.split(',').map( tag => tag.trim())

      notes = await knex("tags")
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id) 
        .whereLike("notes.title", `%${title}%`) //Vamos filtrar pelo título
        .whereIn("name", filterTags)
        .innerJoin("notes", "notes.id", "tags.note_id")
        .orderBy("title ")
      
    }else{
      notes = await knex("notes")
      .where({ user_id})
      .whereLike("title", `%${title}%`)
      .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id })
    const notesWithTags = notes.map(note => {
      const notesTags = userTags.filter(tag => tag.note_id === note.id)

      return{
        ...note,
        tags: notesTags
      }
    })

    return response.json(notesWithTags)
  }
}

module.exports = NotesController