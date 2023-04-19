-- MySQL Script generated by MySQL Workbench
-- Wed 19 Apr 2023 01:47:18 PM CST
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dbproyectoayd
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dbproyectoayd` ;

-- -----------------------------------------------------
-- Schema dbproyectoayd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbproyectoayd` ;
USE `dbproyectoayd` ;

-- -----------------------------------------------------
-- Table `dbproyectoayd`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`user` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `mail` VARCHAR(100) NOT NULL,
  `state` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`repartidor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`repartidor` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`repartidor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `mail` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(11) NOT NULL,
  `depto` VARCHAR(100) NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `license` INT NOT NULL,
  `own_transport` VARCHAR(45) NOT NULL,
  `cv` LONGBLOB NOT NULL,
  `approved` INT NOT NULL,
  `password` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`pedido` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` INT NULL,
  `date` DATETIME NULL,
  `total_price` INT NULL,
  `user_id` INT NOT NULL,
  `repartidor_id` INT NULL,
  `address` VARCHAR(100) NULL,
  `payment_method` VARCHAR(45) NULL,
  `rate` VARCHAR(45) NULL,
  `empresa` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_pedido_repartidor1_idx` (`repartidor_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `dbproyectoayd`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_repartidor1`
    FOREIGN KEY (`repartidor_id`)
    REFERENCES `dbproyectoayd`.`repartidor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`category` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `imagen` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`empresa`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`empresa` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`empresa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `category` INT NOT NULL,
  `mail` VARCHAR(45) NOT NULL,
  `depto` VARCHAR(100) NOT NULL,
  `municipio` VARCHAR(45) NOT NULL,
  `approved` INT NULL,
  `password` VARCHAR(100) NULL,
  `imagen` TEXT NULL,
  `category_id` INT NULL,
  `docauth` LONGBLOB NOT NULL,
  `docreg` LONGBLOB NOT NULL,
  `docregsan` LONGBLOB NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_empresa_category1_idx` (`category_id` ASC) VISIBLE,
  CONSTRAINT `fk_empresa_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `dbproyectoayd`.`category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`categoryProduct`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`categoryProduct` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`categoryProduct` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `idEmpresa` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`products` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `empresa_id` INT NOT NULL,
  `imagen` TEXT NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `categoryProduct_id` INT NOT NULL,
  `disponibilidad` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_empresa1_idx` (`empresa_id` ASC) VISIBLE,
  INDEX `fk_products_categoryProduct1_idx` (`categoryProduct_id` ASC) VISIBLE,
  CONSTRAINT `fk_products_empresa1`
    FOREIGN KEY (`empresa_id`)
    REFERENCES `dbproyectoayd`.`empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categoryProduct1`
    FOREIGN KEY (`categoryProduct_id`)
    REFERENCES `dbproyectoayd`.`categoryProduct` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`comment` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `repartidor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_repartidor1_idx` (`repartidor_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `dbproyectoayd`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_repartidor1`
    FOREIGN KEY (`repartidor_id`)
    REFERENCES `dbproyectoayd`.`repartidor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`documents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`documents` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `pdf` BLOB NOT NULL,
  `empresa_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_documents_empresa1_idx` (`empresa_id` ASC) VISIBLE,
  CONSTRAINT `fk_documents_empresa1`
    FOREIGN KEY (`empresa_id`)
    REFERENCES `dbproyectoayd`.`empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`ofertas_combos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`ofertas_combos` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`ofertas_combos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` INT NOT NULL,
  `empresa_id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `stock` INT NOT NULL,
  `imagen` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ofertas_empresa1_idx` (`empresa_id` ASC) VISIBLE,
  CONSTRAINT `fk_ofertas_empresa1`
    FOREIGN KEY (`empresa_id`)
    REFERENCES `dbproyectoayd`.`empresa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`detail_ofertacombo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`detail_ofertacombo` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`detail_ofertacombo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cant` INT NOT NULL,
  `price_unit` INT NOT NULL,
  `products_id` INT NOT NULL,
  `ofertas_combos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detail_ofertacombo_products1_idx` (`products_id` ASC) VISIBLE,
  INDEX `fk_detail_ofertacombo_ofertas_combos1_idx` (`ofertas_combos_id` ASC) VISIBLE,
  CONSTRAINT `fk_detail_ofertacombo_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `dbproyectoayd`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_ofertacombo_ofertas_combos1`
    FOREIGN KEY (`ofertas_combos_id`)
    REFERENCES `dbproyectoayd`.`ofertas_combos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbproyectoayd`.`detail_pedido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbproyectoayd`.`detail_pedido` ;

CREATE TABLE IF NOT EXISTS `dbproyectoayd`.`detail_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cant` INT NOT NULL,
  `pedido_id` INT NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_detail_pedido_pedido1_idx` (`pedido_id` ASC) VISIBLE,
  INDEX `fk_detail_pedido_products1_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_detail_pedido_pedido1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `dbproyectoayd`.`pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detail_pedido_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `dbproyectoayd`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
