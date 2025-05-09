--------------- SQL ---------------

CREATE TABLE public.usuarios (
  id_usuario SERIAL NOT NULL,
  email VARCHAR(60) NOT NULL UNIQUE,
  hash_senha VARCHAR NOT NULL,
  PRIMARY KEY(id_usuario)
) ;

ALTER TABLE public.usuarios
  ALTER COLUMN id_usuario SET STATISTICS 0;

ALTER TABLE public.usuarios
  ALTER COLUMN email SET STATISTICS 0;

ALTER TABLE public.usuarios
  ALTER COLUMN hash_senha SET STATISTICS 0;

--------------- SQL ---------------

CREATE TABLE public.renda (
  id_renda SERIAL NOT NULL,
  id_usuario INTEGER NOT NULL,
  descricao VARCHAR NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  PRIMARY KEY(id_renda)
) ;

ALTER TABLE public.renda
  ALTER COLUMN id_renda SET STATISTICS 0;

ALTER TABLE public.renda
  ALTER COLUMN id_usuario SET STATISTICS 0;

ALTER TABLE public.renda
  ALTER COLUMN descricao SET STATISTICS 0;

ALTER TABLE public.renda
  ALTER COLUMN valor SET STATISTICS 0;

--------------- SQL ---------------

ALTER TABLE public.renda
  ADD CONSTRAINT renda_fk FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    NOT DEFERRABLE;

--------------- SQL ---------------

CREATE TABLE public.gasto (
  id_gasto SERIAL NOT NULL,
  id_usuario INTEGER NOT NULL,
  descricao VARCHAR NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  PRIMARY KEY(id_gasto)
) ;

ALTER TABLE public.gasto
  ALTER COLUMN id_gasto SET STATISTICS 0;

ALTER TABLE public.gasto
  ALTER COLUMN id_usuario SET STATISTICS 0;

ALTER TABLE public.gasto
  ALTER COLUMN descricao SET STATISTICS 0;

ALTER TABLE public.gasto
  ALTER COLUMN valor SET STATISTICS 0;

--------------- SQL ---------------

ALTER TABLE public.gasto
  ADD CONSTRAINT gasto_fk FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    NOT DEFERRABLE;

--------------- SQL ---------------

CREATE TABLE public.planejamento (
  id_planejamento SERIAL NOT NULL,
  id_usuario INTEGER NOT NULL,
  descricao VARCHAR NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  PRIMARY KEY(id_planejamento)
) ;

ALTER TABLE public.planejamento
  ALTER COLUMN id_planejamento SET STATISTICS 0;

ALTER TABLE public.planejamento
  ALTER COLUMN id_usuario SET STATISTICS 0;

ALTER TABLE public.planejamento
  ALTER COLUMN descricao SET STATISTICS 0;

ALTER TABLE public.planejamento
  ALTER COLUMN valor SET STATISTICS 0;

--------------- SQL ---------------

ALTER TABLE public.planejamento
  ADD CONSTRAINT planejamento_fk FOREIGN KEY (id_usuario)
    REFERENCES public.usuarios(id_usuario)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    NOT DEFERRABLE;
