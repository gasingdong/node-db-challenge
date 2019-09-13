exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('task_contexts')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('task_contexts').insert([
        {
          task_id: 1,
          context_id: 1,
        },
        {
          task_id: 2,
          context_id: 2,
        },
        {
          task_id: 3,
          context_id: 2,
        },
        {
          task_id: 2,
          context_id: 1,
        },
      ]);
    });
};
