drop database if exists parking;

create database parking;

create table parking_lot(
    code varchar not null,
    capacity integer not null,
    open_hour integer not null,
    close_hour integer not null);

insert into parking_lot values ('shopping',5,8,22);
  
create table parked_car(
    plate varchar(8) not null,
    code varchar not null,
    enter_date date not null);