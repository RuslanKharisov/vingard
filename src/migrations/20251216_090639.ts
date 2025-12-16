import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_portfolio_blocks_stats_type" AS ENUM('default', 'secondary');
  CREATE TYPE "public"."enum__portfolio_v_blocks_stats_type" AS ENUM('default', 'secondary');
  CREATE TABLE "portfolio_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "portfolio_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_portfolio_blocks_stats_type" DEFAULT 'default',
  	"title" varchar,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_portfolio_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__portfolio_v_blocks_stats_type" DEFAULT 'default',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "portfolio_blocks_stats_items" ADD CONSTRAINT "portfolio_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "portfolio_blocks_stats" ADD CONSTRAINT "portfolio_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_stats_items" ADD CONSTRAINT "_portfolio_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_portfolio_v_blocks_stats" ADD CONSTRAINT "_portfolio_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_portfolio_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "portfolio_blocks_stats_items_order_idx" ON "portfolio_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_stats_items_parent_id_idx" ON "portfolio_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_stats_order_idx" ON "portfolio_blocks_stats" USING btree ("_order");
  CREATE INDEX "portfolio_blocks_stats_parent_id_idx" ON "portfolio_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "portfolio_blocks_stats_path_idx" ON "portfolio_blocks_stats" USING btree ("_path");
  CREATE INDEX "_portfolio_v_blocks_stats_items_order_idx" ON "_portfolio_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_stats_items_parent_id_idx" ON "_portfolio_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_stats_order_idx" ON "_portfolio_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_portfolio_v_blocks_stats_parent_id_idx" ON "_portfolio_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_portfolio_v_blocks_stats_path_idx" ON "_portfolio_v_blocks_stats" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "portfolio_blocks_stats_items" CASCADE;
  DROP TABLE "portfolio_blocks_stats" CASCADE;
  DROP TABLE "_portfolio_v_blocks_stats_items" CASCADE;
  DROP TABLE "_portfolio_v_blocks_stats" CASCADE;
  DROP TYPE "public"."enum_portfolio_blocks_stats_type";
  DROP TYPE "public"."enum__portfolio_v_blocks_stats_type";`)
}
