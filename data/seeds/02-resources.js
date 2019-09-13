exports.seed = knex => {
  // Deletes ALL existing entries
  return knex('resources')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('resources').insert([
        {
          name: 'Anthony Mack',
          description: 'Software engineer',
        },
        {
          name: 'Persephone Simmons',
          description: 'Back-end developer',
        },
        {
          name: 'Conference room',
          description: 'Company meeting room',
        },
        {
          name: 'MongoDB',
          description: 'Database software',
        },
        {
          name: 'Chainsaw',
          description: 'Mechnical tool for sawing things.',
        },
      ]);
    });
};
