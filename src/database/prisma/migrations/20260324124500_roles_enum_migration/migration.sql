DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE "user_role" AS ENUM ('USER', 'ADMIN');
  END IF;
END $$;

CREATE OR REPLACE FUNCTION to_user_role_array(input_roles text[])
RETURNS "user_role"[]
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT COALESCE(
    array_agg(
      CASE
        WHEN role IN ('USER', 'ADMIN') THEN role::"user_role"
        ELSE 'USER'::"user_role"
      END
    ),
    ARRAY[]::"user_role"[]
  )
  FROM unnest(input_roles) AS role
$$;

ALTER TABLE "users"
ALTER COLUMN "roles" DROP DEFAULT,
ALTER COLUMN "roles" TYPE "user_role"[] USING to_user_role_array("roles"),
ALTER COLUMN "roles" SET DEFAULT ARRAY['USER'::"user_role"];

DROP FUNCTION to_user_role_array(text[]);
