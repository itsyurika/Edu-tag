DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  creator_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL
  description TEXT,
  create_date DATE NOT NULL DEFAULT NOW(),
  thumbnail_url TEXT
);

INSERT INTO resources (creator_id, title, url, description)
VALUES (1, 'HTML Standard', 'https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element%E2%80%9D%20target=%E2%80%9C_blank', 'Explanation and examples of HTML elements'), (1, 'HTML Cheatsheet', 'https://digital.com/tools/html-cheatsheet/', 'Quick cheatsheet for all HTML elements and tags'), (1, 'HTML Pattern', 'https://www.html5pattern.com/', 'HTML samples of regularly used Input-patterns of different functionalities'),(1, 'CSS-Tricks: Flexbox', 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', 'The best flexbox explanation with images!'), (1, 'CSS guidelines', 'https://cssguidelin.es/', 'Gives guideline and advice for witing nice, clean CSS'), (1, 'Frontend Mentor', 'https://www.frontendmentor.io/', 'Has tons of sample projects for practicing frontend work!'),(1,'The Modern JavaScript Tutorial', 'https://javascript.info/', 'A great website that has detailed explanation and practice tutorials for JS'), (1, 'LHL 21 Day Coding Challenge', 'https://coding-challenge.lighthouselabs.ca/start', 'Coding challenge website from LHL for my JS coding practice!'), (1, 'Free Code Camp', 'https://www.freecodecamp.org/learn', 'Great website for learning how to code - has lots of practice projects'), (1, 'FontAwesome', 'https://fontawesome.com/', 'Website has all the icons I need for my website design!'), (1, 'pfolios', 'https://pfolios.net/', 'Website that displays lots of portfolios for design inspirations'), (1, 'Material Design Palette', 'https://www.materialpalette.com/', 'Makes color palettes based on the colors I choose');
