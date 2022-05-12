-- Not needed for MPA EJS way
DROP TABLE IF EXISTS resources_tags CASCADE;
CREATE TABLE resources_tags (
  resource_id INTEGER REFERENCES resources(id) NOT NULL,
  tag_id INTEGER REFERENCES tags(id) NOT NULL,
  PRIMARY KEY (resource_id, tag_id)
);
