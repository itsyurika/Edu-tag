
DROP TABLE IF EXISTS resources_reviews CASCADE;
CREATE TABLE resources_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  resource_id INT REFERENCES resources(id) ON DELETE CASCADE,
  reviewer_id INT REFERENCES users(id) ON DELETE CASCADE,
  rating SMALLINT,
  message TEXT,
  liked BOOLEAN DEFAULT FALSE
);
