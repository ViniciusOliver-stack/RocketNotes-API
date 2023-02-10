exports.up = knex => knex.schema.createTable("notes", table =>{
  //Dentro da minha tabela vou ter um campo incremental de ID
  table.increments("id")
  //As funções serão os tipos
  table.text("title")
  table.text("description")
  //Estamos criando uma tabela do tipo inteiro
  //O user_id vai ter a referência ao id que está na tabela de usuários
  table.integer("user_id").references("id").inTable("users")

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())

})

exports.down = knex => knex.schema.dropTable("notes")