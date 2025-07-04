-- Crear tabla user
CREATE TABLE "user" (
  id_user SERIAL PRIMARY KEY,
  user_name VARCHAR(100),
  email VARCHAR(150)
);

-- Crear tabla project
CREATE TABLE "project" (
  id_proj SERIAL PRIMARY KEY,
  proj_name VARCHAR(100),
  details TEXT
);

-- Crear tabla intermedia user_project
CREATE TABLE "user_project" (
  id SERIAL PRIMARY KEY,
  fk_user INTEGER,
  fk_proj INTEGER NOT NULL,
  assigned TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Relaciones (después de crear las tablas)
-- Si se elimina un user, el campo fk_user se vuelve NULL
ALTER TABLE "user_project"
  ADD CONSTRAINT fk_user_proj
  FOREIGN KEY (fk_user)
  REFERENCES "user"(id_user)
  ON DELETE SET NULL;

-- Si se elimina un project, se eliminan sus relaciones en cascada
ALTER TABLE "user_project"
  ADD CONSTRAINT fk_proj_user
  FOREIGN KEY (fk_proj)
  REFERENCES "project"(id_proj)
  ON DELETE CASCADE;

-- Crear tabla intermedia user_project
CREATE TABLE "historial" (
  id SERIAL PRIMARY KEY,
  fk_user INTEGER NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "historial"
  ADD CONSTRAINT fk_historial_user
  FOREIGN KEY (fk_user)
  REFERENCES "user"(id_user)
  ON DELETE CASCADE;
