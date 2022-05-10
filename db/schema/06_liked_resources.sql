
DROP TABLE IF EXISTS liked_resources CASCADE;
CREATE TABLE liked_resources (
  user_id INTEGER REFERENCES users(id) NOT NULL,
  resource_id INTEGER REFERENCES resources(id) NOT NULL,
  PRIMARY KEY (user_id, resource_id)
);
