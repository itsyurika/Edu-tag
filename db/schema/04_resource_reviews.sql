
DROP TABLE IF EXISTS resource_reviews CASCADE;
CREATE TABLE resource_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  resource_id INT NOT NULL REFERENCES resources(id),
  reviewer_id INT NOT NULL REFERENCES users(id),
  rating SMALLINT NOT NULL,
  message TEXT,
  like BOOLEAN
);
