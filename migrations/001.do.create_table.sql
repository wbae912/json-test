CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  items json NOT NULL
);