exports.up = knex => {
  return knex.schema
    .createTable('contexts', tbl => {
      tbl.increments();

      tbl
        .string('description')
        .unique()
        .notNullable();
    })
    .createTable('task_contexts', tbl => {
      tbl
        .integer('task_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tasks')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl
        .integer('context_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contexts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.primary(['task_id', 'context_id']);
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('task_contexts')
    .dropTableIfExists('contexts');
};
