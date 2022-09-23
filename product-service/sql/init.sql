drop table if exists stocks;

drop table if exists products;

create extension if not exists "uuid-ossp";

create table if not exists products (
	id uuid primary key default uuid_generate_v4(),
	title text,
	description text,
	price integer
);

create table if not exists stocks (
	count integer,
	product_id uuid,
	foreign key(product_id) references products(id)
);

insert into products (id, title, description, price) values
('7567ec4b-b10c-48c5-9345-fc73c48a80aa', 'ProductOne', 'Short Product Description1', 24),
('7567ec4b-b10c-48c5-9345-fc73c48a80a1', 'ProductTitle', 'Short Product Description7', 15),
('7567ec4b-b10c-48c5-9345-fc73c48a80a3', 'Product', 'Short Product Description2', 23),
('7567ec4b-b10c-48c5-9345-fc73348a80a1', 'ProductTest', 'Short Product Description4', 15),
('7567ec4b-b10c-48c5-9445-fc73c48a80a2', 'Product2', 'Short Product Descriptio1', 23),
('7567ec4b-b10c-45c5-9345-fc73c48a80a1', 'ProductName', 'Short Product Description7', 15);

insert into stocks (count, product_id) values
(2, '7567ec4b-b10c-48c5-9345-fc73c48a80aa'),
(3, '7567ec4b-b10c-48c5-9345-fc73c48a80a1'),
(4, '7567ec4b-b10c-45c5-9345-fc73c48a80a1');
