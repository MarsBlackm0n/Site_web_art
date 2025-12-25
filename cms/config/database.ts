export default ({ env }) => ({
  connection: {
    client: env("DATABASE_CLIENT", "postgres"),
    connection: env("DATABASE_URL"),
    ssl: env.bool("DATABASE_SSL", false),
  },
});
