
DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  creator_id NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  create_date NOT NULL DEFAULT NOW(),
  thumbnail_url TEXT
);
