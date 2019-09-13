exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('project_resources')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('project_resources').insert([
        {
          project_id: 1,
          resources_id: 1,
        },
        {
          project_id: 1,
          resources_id: 2,
        },
        {
          project_id: 1,
          resources_id: 3,
        },
        {
          project_id: 2,
          resources_id: 2,
        },
        {
          project_id: 2,
          resources_id: 4,
        },
      ]);
    });
};
