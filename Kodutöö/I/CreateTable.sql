-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema schedule
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema schedule
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `schedule` DEFAULT CHARACTER SET utf8 ;
USE `schedule` ;

-- -----------------------------------------------------
-- Table `schedule`.`lecturers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`lecturers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`courses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`subjects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`subjects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `subject` VARCHAR(60) NOT NULL,
  `scheduled` VARCHAR(200) NULL,
  `lecturers_id` INT NOT NULL,
  `courses_id` INT NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`, `lecturers_id`, `courses_id`),
  INDEX `fk_subjects_lecturers_idx` (`lecturers_id` ASC) VISIBLE,
  INDEX `fk_subjects_courses1_idx` (`courses_id` ASC) VISIBLE,
  CONSTRAINT `fk_subjects_lecturers`
    FOREIGN KEY (`lecturers_id`)
    REFERENCES `schedule`.`lecturers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subjects_courses1`
    FOREIGN KEY (`courses_id`)
    REFERENCES `schedule`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL DEFAULT  CURRENT_TIMESTAMP,
  `dateDeleted` DATETIME NULL,
  `dateUpdated` DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `schedule`.`subjects_has_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `schedule`.`subjects_has_rooms` (
  `subjects_id` INT NOT NULL,
  `subjects_lecturers_id` INT NOT NULL,
  `rooms_id` INT NOT NULL,
  PRIMARY KEY (`subjects_id`, `subjects_lecturers_id`, `rooms_id`),
  INDEX `fk_subjects_has_rooms_rooms1_idx` (`rooms_id` ASC) VISIBLE,
  INDEX `fk_subjects_has_rooms_subjects1_idx` (`subjects_id` ASC, `subjects_lecturers_id` ASC) VISIBLE,
  CONSTRAINT `fk_subjects_has_rooms_subjects1`
    FOREIGN KEY (`subjects_id` , `subjects_lecturers_id`)
    REFERENCES `schedule`.`subjects` (`id` , `lecturers_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_subjects_has_rooms_rooms1`
    FOREIGN KEY (`rooms_id`)
    REFERENCES `schedule`.`rooms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;