-- DROP DATABASE IF EXISTS gallery;

-- CREATE DATABASE gallery;

-- \c gallery

INSERT INTO "Galleries" VALUES
(default, 'james the author', 'http://mylink.com', 'this is my cool thing', NOW(), NOW()),
(default, 'bob another author', 'http://otherlink.com', 'i have a cool thing too', NOW(), NOW()),
(default, 'steve also author', 'http://linknumber3.com', 'i have a third thing', NOW(), NOW());