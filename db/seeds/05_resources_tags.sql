
DROP TABLE IF EXISTS resources_tags CASCADE;
CREATE TABLE resources_tags (
  resource_id INTEGER PRIMARY KEY REFERENCES resources(id) NOT NULL,
  tag_id VARCHAR(255) PRIMARY KEY REFERENCES tags(id) NOT NULL
);

INSERT INTO resources_tags (resource_id, tag_id)
VALUE (1, 1), (2, 1), (3, 1)
, (4, 2), (5, 2), (6, 1), (6, 2), (6, 3), (7, 3), (8, 3), (9, 1), (9, 2), (9, 3), (10, 4), (11, 4), (12, 4);
