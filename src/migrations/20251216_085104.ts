import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_stats_type" AS ENUM('default', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_type" AS ENUM('default', 'secondary');
  ALTER TABLE "pages_blocks_stats" ADD COLUMN "type" "enum_pages_blocks_stats_type" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_stats" ADD COLUMN "type" "enum__pages_v_blocks_stats_type" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_stats" DROP COLUMN "type";
  ALTER TABLE "_pages_v_blocks_stats" DROP COLUMN "type";
  DROP TYPE "public"."enum_pages_blocks_stats_type";
  DROP TYPE "public"."enum__pages_v_blocks_stats_type";`)
}
