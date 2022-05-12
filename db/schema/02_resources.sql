DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  creator_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  create_date DATE NOT NULL DEFAULT NOW(),
  thumbnail_url TEXT,
  tag VARCHAR(255)
);
