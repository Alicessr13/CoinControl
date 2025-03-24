create table usuarios (
  id_usuario bigint primary key generated always as identity,
  email text not null unique,
  hash_senha text not null
);

create table renda (
  id_renda bigint primary key generated always as identity,
  id_usuario bigint not null,
  descricao text not null,
  valor numeric(10, 2) not null,
  foreign key (id_usuario) references usuarios (id_usuario)
);

create table gasto (
  id_gasto bigint primary key generated always as identity,
  id_usuario bigint not null,
  descricao text not null,
  valor numeric(10, 2) not null,
  foreign key (id_usuario) references usuarios (id_usuario)
);

create table planejamento (
  id_planejamento bigint primary key generated always as identity,
  id_usuario bigint not null,
  descricao text not null,
  valor numeric(10, 2) not null,
  foreign key (id_usuario) references usuarios (id_usuario)
);
