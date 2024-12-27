-- CREATE DATABASE finalProject;

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
-- flush privileges;

-- CREATE TABLE coins (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     description TEXT,
--     obverseInfo TEXT,
--     reverseInfo TEXT,
--     issuingCountry VARCHAR(255),
--     composition VARCHAR(255),
--     quality VARCHAR(50),
--     denomination VARCHAR(50),
--     year YEAR,
--     weight DECIMAL(5, 2),
--     price DECIMAL(10, 2)
-- );
-- INSERT INTO coins
--   (name, description, obverseInfo, reverseInfo,issuingCountry,composition,quality,denomination,year,weight,price)
-- VALUES
--   ('Canadian Beaver', '"Canadian beaver". Unique coin with the image of a beaver. Face value - 5 cents. Created under Elizabeth II.', 'In the center of the obverse is a portrait of Queen Elizabeth II, the profile is directed to the right. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is a mint mark.',
--   'In the center of the coin reverse is a Canadian beaver on a rock sticking out of the water. At the top is a semicircle with the inscription "5 cents" between two maple leaves. At the bottom in two lines is the inscription CANADA (CANADA) and the year of minting.',
--   'CANADA','nickel','BU',' 5 cents',1965, 4.54,40),
--   ('Looney', '"Looney". Unique coin with the image of a goat. Canadian dollar symbol.', 'The reverse of the coin depicts a black goat - a symbol of Canada and an inscription divided into the lower and upper semicircle "Canadian dollar".',
--   'The obverse depicts Queen Elizabeth II. The inscription on the left semicircle (English) ELIZABETH II, on the right semicircle D · G · REGINA (ELIZABETH II QUEEN by the Grace of GOD) with dots. Below is the year of coinage.',
--   'CANADA','gold','BU','1 dollar',1970,5.4,65);

-- ALTER TABLE coins
-- ADD image VARCHAR(255);

-- UPDATE coins 
-- SET image="https://i.postimg.cc/BQGyCX2v/Canadian-Beaver-1.png"
-- WHERE id=1;

-- UPDATE coins 
-- SET image="https://i.postimg.cc/DyFjXRKJ/Looney-1.png"
-- WHERE id=2;

-- CREATE TABLE types(
-- type_id INT AUTO_INCREMENT PRIMARY KEY,
-- type VARCHAR(50) NOT NULL
-- );

-- INSERT INTO types (type)
-- VALUES ('Bullion coins'), ('Exclusive coins'), ('Commemorative coins');

-- ALTER TABLE coins
-- ADD COLUMN type_id INT;

-- ALTER TABLE coins
-- ADD CONSTRAINT fk_coin_type
-- FOREIGN KEY (type_id) REFERENCES types(type_id);

-- ALTER TABLE coins
-- DROP CONSTRAINT fk_coin_type;



-- ALTER TABLE coinInfo
-- ADD CONSTRAINT fk_coin_type
-- FOREIGN KEY (type_id) REFERENCES types(type_id);

-- ALTER TABLE coins 
-- DROP COLUMN type_id;

-- -- CREATE TABLE coinInfo (
-- --     commonID INT AUTO_INCREMENT PRIMARY KEY,
-- --     id INT,
-- --     type VARCHAR(50),
-- --     name VARCHAR(255),
-- --     description TEXT,
-- --     observeInfo TEXT,
-- --     reverseInfo TEXT,
-- --     issuingCountry VARCHAR(255),
-- -- 	composition VARCHAR(255),
-- --     quality VARCHAR(255),
-- --     denomination VARCHAR(50),
-- --     year INT,
-- --     weight DECIMAL(5, 2),
-- --     price DECIMAL(10, 2),
-- --     FOREIGN KEY (id) REFERENCES coins(id)
-- -- );

-- ALTER TABLE coinInfo
-- ADD COLUMN image VARCHAR(255);

-- ALTER TABLE coinInfo CHANGE COLUMN observeInfo obverseInfo TEXT;


-- INSERT INTO coinInfo (id, type, name,description,obverseInfo,reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price,image)
-- SELECT 
--     coins.id,
--     types.type,
--     coins.name,
--     coins.description,
--     coins.obverseInfo,
--     coins.reverseInfo,
--     coins.issuingCountry,
--     coins.composition,
--     coins.quality,
--     coins.denomination,
--     coins.year,
--     coins.weight,
--     coins.price,
--     coins.image
-- FROM coins
-- JOIN types ON coins.type_id = types.type_id;

-- ALTER TABLE coins
-- ADD COLUMN typeID INT;

-- ALTER TABLE coinInfo
-- DROP CONSTRAINT fk_coin_type;

-- ALTER TABLE coins
-- ADD CONSTRAINT fk_coin_type
-- FOREIGN KEY (typeID) REFERENCES types(type_id);

-- SELECT c.id, 
--        c.name AS coin_name, 
--        c.description, 
--        c.obverseInfo, 
--        c.reverseInfo, 
--        c.issuingCountry, 
--        c.composition, 
--        c.quality, 
--        c.denomination, 
--        c.year, 
--        c.weight, 
--        c.price, 
--        c.image, 
--        types.type AS coin_type
-- FROM coins c
-- JOIN types types ON c.typeID = types.type_id;

-- UPDATE coins
-- SET typeID ="1"
-- WHERE id=1;

-- UPDATE coins
-- SET typeID =2
-- WHERE id=5;
-- UPDATE coins
-- SET typeID =2
-- WHERE id=6;
--   
--   DROP TABLE coinInfo;
--   
-- CREATE TABLE coinInfo (
--     coin_id INT,
--     coin_name VARCHAR(255),
--     description TEXT,
--     obverseInfo TEXT,
--     reverseInfo TEXT,
--     issuingCountry VARCHAR(255),
--     composition VARCHAR(255),
--     quality VARCHAR(50),
--     denomination VARCHAR(50),
--     year YEAR,
--     weight DECIMAL(5,2),
--     price DECIMAL(10,2),
--     image VARCHAR(255),
--     coin_type VARCHAR(50),
--     image2 VARCHAR(255)
-- );
-- DROP TABLE coinInfo;
-- INSERT INTO coinInfo (
--     coin_id, 
--     coin_name, 
--     description, 
--     obverseInfo, 
--     reverseInfo, 
--     issuingCountry, 
--     composition, 
--     quality, 
--     denomination, 
--     year, 
--     weight, 
--     price, 
--     image, 
--     coin_type,
--     image2
-- )
-- SELECT c.id, 
--        c.name AS coin_name, 
--        c.description, 
--        c.obverseInfo, 
--        c.reverseInfo, 
--        c.issuingCountry, 
--        c.composition, 
--        c.quality, 
--        c.denomination, 
--        c.year, 
--        c.weight, 
--        c.price, 
--        c.image, 
--        types.type AS coin_type,
--        c.image2
-- FROM coins c
-- JOIN types types ON c.typeID = types.type_id;

-- ALTER TABLE coinInfo 
-- ADD COLUMN image2 VARCHAR(255);

-- UPDATE coins
-- SET image2="https://i.postimg.cc/KvSXs9hx/Lion-sedge-2.png"
-- WHERE id=5;
-- INSERT INTO coins
--   (name, description, obverseInfo, reverseInfo,issuingCountry,composition,quality,denomination,year,weight,price,image,image2)
-- VALUES
--   ('South Vietnamese Dong', 'Currency of the Republic of Vietnam in 1955-1975 Coin with the image of wheat.', 'Currency of the Republic of Vietnam in 1955-1975. On the front side, we see wheat, and on the back, a unit symbolizing money.',
--   'The monetary unit of South Vietnam was originally the Indochinese piastre, issued by the Institute of Emissions of the States of Cambodia, Laos and Vietnam. Banknotes of the graduating institute were issued in three types: Cambodian, Lao and Vietnamese. The inscriptions on the banknotes of all samples were made in four languages: French, Khmer, Lao and Vietnamese. Vietnamese-style banknotes depicted a pattern, as well as the inscription “VIÊN PHÁT-HÀNH”. Piastres previously issued by the French Bank of Indochina were also in circulation.',
--   'the Republic of Vietnam','nickel','BU','1 dong',1955,5.05,56,"https://i.postimg.cc/hgCBqrcD/South-Vietnamese-Dong-1.png","https://i.postimg.cc/SQP3Ygxc/South-Vietnamese-Dong-2.png"),
--   ('The British Antelope', 'Unique coin depicting an antelope. British South African gold coin with a face value of 1/2 pound. It has been produced since 1952.', 'On one side of the coin is the head of King George VI, turned to the left. Also at the top in a semicircle is the inscription GEORGIVS SEXTVS REX.',
--   'On the other side of the coin is an Antelope. Around it is the inscription SOUTH AFRICA 1952 SUID AFRICA, dotted with dots. Below is the nominal value.',
--   'British South Africa','gold','BU','1/2 pound',1952,6.3,78,"https://i.postimg.cc/KxRycM8n/The-British-Antelope-1.png","https://i.postimg.cc/Hkzfndck/The-British-Antelope-2.png"),
--   ('Lion sedge', 'Indian coin with the image of a lion Ashoka. Face value 1 one rupee. 1975 edition.', 'It depicts the lion Ashok on his pedestal. It is surrounded by the inscription of the name of the country in two languages, meaning and date, surrounded by stylized stalks of grain.The rupee (from Sanskrit silver) is an Indian historical silver coin, put into circulation in the 15th century, as well as the monetary unit of a number of countries in South Asia.',
--   'The rupee remained the currency of Portuguese possessions in India until 1959, when it was replaced by the escudos of Portuguese India.',
--   'India','steel','BU','1 rupee',1975,4.95,76,"https://i.postimg.cc/hgCBqrcD/South-Vietnamese-Dong-1.png","https://i.postimg.cc/KvSXs9hx/Lion-sedge-2.png"),
--   ('Rial', 'Iranian silver coin with the image of a lion. Face value 5000 five thousand dinars (5 five taps). 1928 year.', 'It depicts a bust of Reza Shah, whose head is turned to the right. On the other side is a lion with a saber in front of the radiant sun. Above it is a crown.',
--   'Before the monetary reform of 1932, the currency of Iran was fog. (1 fog = 10 clicks, 1 crane = 1000 dinars.)',
--   'Iran','silver','BU',' 5000 dinars',1928,6.12,98,"https://i.postimg.cc/qRMSyYKx/Rial-1.png","https://i.postimg.cc/0QW3ffdR/Rial-2.png");
--   
--   
--   CREATE TABLE admin(
--   adminId INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(50) NOT NULL UNIQUE,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL UNIQUE
--   );
--   
--  DELIMITER $$

-- CREATE TRIGGER after_coins_insert
-- AFTER INSERT ON coins
-- FOR EACH ROW
-- BEGIN
--     INSERT INTO coinInfo (coin_id, coin_name, description, obverseInfo, reverseInfo, issuingCountry, composition, quality, denomination, year, weight, price, image, coin_type, image2)
--     VALUES (NEW.id, NEW.name, NEW.description, NEW.obverseInfo, NEW.reverseInfo, NEW.issuingCountry, NEW.composition, NEW.quality, NEW.denomination, NEW.year, NEW.weight, NEW.price, NEW.image, (SELECT type FROM types WHERE type_id = NEW.typeID), NEW.image2);
-- END$$

-- CREATE TRIGGER after_coins_update
-- AFTER UPDATE ON coins
-- FOR EACH ROW
-- BEGIN
--     UPDATE coinInfo 
--     SET coin_name = NEW.name,
--         description = NEW.description,
--         obverseInfo = NEW.obverseInfo,
--         reverseInfo = NEW.reverseInfo,
--         issuingCountry = NEW.issuingCountry,
--         composition = NEW.composition,
--         quality = NEW.quality,
--         denomination = NEW.denomination,
--         year = NEW.year,
--         weight = NEW.weight,
--         price = NEW.price,
--         image = NEW.image,
--         coin_type = (SELECT type FROM types WHERE type_id = NEW.typeID),
--         image2 = NEW.image2
--     WHERE coin_id = NEW.id;
-- END$$

-- -- Coin silindikdə coinInfo cədvəlindəki əlaqəli məlumatı silmək
-- CREATE TRIGGER after_coins_delete
-- AFTER DELETE ON coins
-- FOR EACH ROW
-- BEGIN
--     DELETE FROM coinInfo WHERE coin_id = OLD.id;
-- END$$

-- DELIMITER ;

-- SET SQL_SAFE_UPDATES=0;
-- UPDATE coins
-- SET typeID =3
-- WHERE id=7;
-- SET SQL_SAFE_UPDATES=1;

-- USE finalProject;
-- SET SQL_SAFE_UPDATES=0;
-- DELETE FROM coins WHERE id=14;
-- SET SQL_SAFE_UPDATES=1;

