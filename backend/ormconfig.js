/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
const dbconfig = {
  synchronize: false,
  migrations:['migrations/*.js'],
  cli:{
      migrationsDir: 'migrations'
  }
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbconfig, {
            
            type: 'postgres',
            host:'localhost',
            port:5432,
            username:'postgres',
            password:'swejal',
            database:'postgres',
    //   url: 'postgres://usduimlf:dAI6KO7oP1nGvB4uXW_t7Q287FZR38G3@balarama.db.elephantsql.com/usduimlf',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dbconfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true, //runs after every test
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown environment');
}

module.exports = dbconfig;
