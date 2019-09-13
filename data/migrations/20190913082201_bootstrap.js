exports.up = knex => {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();

      tbl.string('name').notNullable();

      tbl.string('description');

      tbl.boolean('completed').notNullable();
    })
    .createTable('tasks', tbl => {
      tbl.increments();

      tbl.string('description').notNullable();

      tbl.string('notes');

      tbl.boolean('completed').notNullable();

      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('resources', tbl => {
      tbl.increments();

      tbl
        .string('name')
        .notNullable()
        .unique();

      tbl.string('description');
    })
    .createTable('project_resources', tbl => {
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl
        .integer('resources_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.primary(['project_id', 'resources_id']);
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects');
};
