exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('tasks')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          description: 'Read the README',
          notes: 'Bla bla',
          project_id: 1,
        },
        {
          description: 'Design the project',
          project_id: 1,
        },
        {
          description: 'Make a sandwich',
          notes: 'Some notes',
          project_id: 2,
        },
        {
          description: 'Download the sandwich',
          project_id: 2,
        },
        {
          description: 'Recreate the sandwich in VSCode',
          project_id: 2,
        },
      ]);
    });
};
