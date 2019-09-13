exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('projects')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('projects').insert([
        {
          name: 'Node DB Challenge',
          description: 'Complete the challenge.',
          completed: false,
        },
        {
          name: 'Sandwich Maker',
          description: 'Design delicious code.',
          completed: false,
        },
      ]);
    });
};
