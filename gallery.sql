-- DROP DATABASE IF EXISTS gallery;

-- CREATE DATABASE gallery;

-- \c gallery

INSERT INTO "Galleries" VALUES
(default, 'Woodland Wonderland','james', 'https://static.pexels.com/photos/20974/pexels-photo.jpg', 'this is my cool thing', NOW(), NOW()),
(default, 'Beautiful Bay', 'bob', 'https://www.ncl.com/sites/default/files/DestinationGalleries.Hawaii.SnorkelingBay900x400.jpg', 'i have a cool thing too', NOW(), NOW()),
(default, 'North Shore', 'steve', 'http://www.nationalgeographic.com/content/dam/travel/2017-digital/hawaii/top-ten/6-coast-north-shore-kauai-hawaii.jpg', 'i have a third thing', NOW(), NOW());