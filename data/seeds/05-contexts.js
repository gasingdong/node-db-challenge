exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('contexts')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('contexts').insert([
        {
          description: 'at computer',
        },
        {
          description: 'at work',
        },
        {
          description: 'at home',
        },
        {
          description: 'online',
        },
      ]);
    });
};
