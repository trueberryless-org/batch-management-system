CREATE TABLE "batches_bt" (
	"id" uuid NOT NULL UNIQUE,
	"number" text NOT NULL,
	"expires_on" date DEFAULT add_months(sysdate, 12) NOT NULL,
	"note" text,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "bundles_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "configurations" (
	"id" uuid NOT NULL UNIQUE,
	"version" integer NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "constituents_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "doughs" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "goods_bt" (
	"id" uuid NOT NULL UNIQUE,
	"current_recipe_id" uuid,
	"number" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id"),
	CONSTRAINT "goo_bt_num_uq" UNIQUE("number")
);

CREATE TABLE "ingredients" (
	"id" uuid NOT NULL UNIQUE,
	"number" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_vegan" boolean DEFAULT false NOT NULL,
	"is_vegetarian" boolean DEFAULT false NOT NULL,
	"is_turkish_halal" boolean DEFAULT true NOT NULL,
	"is_jewish_kosher" boolean DEFAULT true NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id"),
	CONSTRAINT "ing_num_uq" UNIQUE("number")
);

CREATE TABLE "manufactured_batches" (
	"id" uuid NOT NULL UNIQUE,
	"manufactured_on" date DEFAULT now() NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_bundles_bt" (
	"id" uuid NOT NULL UNIQUE,
	"bundle_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_constituents_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_doughs" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_goods_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_nestables_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_package_hierarchies_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_packages" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_palettes" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_products" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_recipe_has_constituents_jt" (
	"manufactured_constituent_id" uuid NOT NULL,
	"manufactured_recipe_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("manufactured_constituent_id","manufactured_recipe_id"),
  UNIQUE("manufactured_constituent_id","manufactured_recipe_id")
);

CREATE TABLE "manufactured_recipes" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_selling_unit_hierarchies_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "manufactured_selling_units" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "nestables_bt" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "package_hierarchies" (
	"id" uuid NOT NULL UNIQUE,
	"parent_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "packages" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "palettes" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "products" (
	"id" uuid NOT NULL UNIQUE,
	"is_active" boolean DEFAULT true NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "raw_materials" (
	"id" uuid NOT NULL UNIQUE,
	"ingredient_id" uuid NOT NULL,
	"received_batches_id" uuid NOT NULL,
	"number" text NOT NULL,
	"override_is_vegan" boolean,
	"override_is_vegetarian" boolean,
	"override_is_turkish_halal" boolean,
	"override_is_jewish_kosher" boolean,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id"),
	CONSTRAINT "raw_mat_num_uq" UNIQUE("number")
);

CREATE TABLE "received_batches" (
	"id" uuid NOT NULL UNIQUE,
	"delivered_on" date DEFAULT now() NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "recipe_has_constituents_jt" (
	"constituent_id" uuid NOT NULL UNIQUE,
	"recipe_id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("constituent_id","recipe_id"),
  UNIQUE("constituent_id","recipe_id")
);

CREATE TABLE "recipes" (
	"id" uuid NOT NULL UNIQUE,
	"name" text,
	"good_id" uuid NOT NULL,
	"predecessor_id" uuid,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "selling_unit_hierarchies" (
	"id" uuid NOT NULL UNIQUE,
	"parent_id" uuid NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "selling_units" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "settings" (
	"id" uuid NOT NULL UNIQUE,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"value" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "unit_conversions_jt" (
	"from_unit_id" uuid NOT NULL UNIQUE,
	"to_unit_id" uuid NOT NULL UNIQUE,
	"conversion_factor" double precision NOT NULL,
	"description" text,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("from_unit_id","to_unit_id"),
  UNIQUE("from_unit_id","to_unit_id")
);

CREATE TABLE "units" (
	"id" uuid NOT NULL UNIQUE,
	"symbol" text NOT NULL,
	"label" text NOT NULL,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "users" (
	"id" uuid NOT NULL UNIQUE,
	"inserted_at" timestamp (3) DEFAULT now() NOT NULL,
	"updated_at" timestamp (3) DEFAULT now() NOT NULL,
	PRIMARY KEY("id")
);

ALTER TABLE "doughs" ADD CONSTRAINT "fk_dou_goo_bt" FOREIGN KEY ("id") REFERENCES "public"."goods_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "goods_bt" ADD CONSTRAINT "goods_bt_current_recipe_id_recipes_id_fk" FOREIGN KEY ("current_recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "goods_bt" ADD CONSTRAINT "fk_goo_bt_con_bt" FOREIGN KEY ("id") REFERENCES "public"."constituents_bt"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "ingredients" ADD CONSTRAINT "fk_ing_con_bt" FOREIGN KEY ("id") REFERENCES "public"."constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "manufactured_batches" ADD CONSTRAINT "fk_man_bat_bat_bt" FOREIGN KEY ("id") REFERENCES "public"."batches_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "manufactured_bundles_bt" ADD CONSTRAINT "manufactured_bundles_bt_bundle_id_bundles_bt_id_fk" FOREIGN KEY ("bundle_id") REFERENCES "public"."bundles_bt"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_constituents_bt" ADD CONSTRAINT "manufactured_constituents_bt_id_constituents_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."constituents_bt"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_doughs" ADD CONSTRAINT "manufactured_doughs_id_doughs_id_fk" FOREIGN KEY ("id") REFERENCES "public"."doughs"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_goods_bt" ADD CONSTRAINT "manufactured_goods_bt_id_goods_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."goods_bt"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_nestables_bt" ADD CONSTRAINT "manufactured_nestables_bt_id_nestables_bt_id_fk" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_package_hierarchies_bt" ADD CONSTRAINT "manufactured_package_hierarchies_bt_id_package_hierarchies_id_fk" FOREIGN KEY ("id") REFERENCES "public"."package_hierarchies"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_packages" ADD CONSTRAINT "manufactured_packages_id_packages_id_fk" FOREIGN KEY ("id") REFERENCES "public"."packages"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_palettes" ADD CONSTRAINT "manufactured_palettes_id_palettes_id_fk" FOREIGN KEY ("id") REFERENCES "public"."palettes"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_products" ADD CONSTRAINT "manufactured_products_id_products_id_fk" FOREIGN KEY ("id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_recipe_has_constituents_jt" ADD CONSTRAINT "fk_man_rec_has_con_jt_man_con_bt" FOREIGN KEY ("manufactured_constituent_id") REFERENCES "public"."manufactured_constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "manufactured_recipe_has_constituents_jt" ADD CONSTRAINT "fk_man_rec_has_con_jt_man_rec" FOREIGN KEY ("manufactured_recipe_id") REFERENCES "public"."manufactured_recipes"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "manufactured_recipes" ADD CONSTRAINT "manufactured_recipes_id_recipes_id_fk" FOREIGN KEY ("id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_selling_unit_hierarchies_bt" ADD CONSTRAINT "manufactured_selling_unit_hierarchies_bt_id_selling_unit_hierarchies_id_fk" FOREIGN KEY ("id") REFERENCES "public"."selling_unit_hierarchies"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "manufactured_selling_units" ADD CONSTRAINT "manufactured_selling_units_id_selling_units_id_fk" FOREIGN KEY ("id") REFERENCES "public"."selling_units"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "nestables_bt" ADD CONSTRAINT "fk_nes_bt_bun_bt" FOREIGN KEY ("id") REFERENCES "public"."bundles_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "package_hierarchies" ADD CONSTRAINT "package_hierarchies_parent_id_palettes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."palettes"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "package_hierarchies" ADD CONSTRAINT "fk_pac_hie_pac_bt" FOREIGN KEY ("id") REFERENCES "public"."packages"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "packages" ADD CONSTRAINT "fk_pac_nes_bt" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "palettes" ADD CONSTRAINT "fk_pal_nes_bt" FOREIGN KEY ("id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "products" ADD CONSTRAINT "fk_pro_goo_bt" FOREIGN KEY ("id") REFERENCES "public"."goods_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_ingredient_id_ingredients_id_fk" FOREIGN KEY ("ingredient_id") REFERENCES "public"."ingredients"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "raw_materials" ADD CONSTRAINT "raw_materials_received_batches_id_received_batches_id_fk" FOREIGN KEY ("received_batches_id") REFERENCES "public"."received_batches"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "received_batches" ADD CONSTRAINT "fk_rec_bat_bat_bt" FOREIGN KEY ("id") REFERENCES "public"."batches_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "recipe_has_constituents_jt" ADD CONSTRAINT "fk_rec_has_con_jt_con_bt" FOREIGN KEY ("constituent_id") REFERENCES "public"."constituents_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "recipe_has_constituents_jt" ADD CONSTRAINT "fk_rec_has_con_jt_rec" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_predecessor_id_recipes_id_fk" FOREIGN KEY ("predecessor_id") REFERENCES "public"."recipes"("id") ON DELETE set default ON UPDATE set default;
ALTER TABLE "recipes" ADD CONSTRAINT "fk_rec_goo_bt" FOREIGN KEY ("good_id") REFERENCES "public"."goods_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "selling_unit_hierarchies_parent_id_nestables_bt_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."nestables_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "selling_unit_hierarchies" ADD CONSTRAINT "fk_sel_uni_hie_sel_uni" FOREIGN KEY ("id") REFERENCES "public"."selling_units"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "selling_units" ADD CONSTRAINT "fk_sel_uni_bun_bt" FOREIGN KEY ("id") REFERENCES "public"."bundles_bt"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "settings" ADD CONSTRAINT "settings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "unit_conversions_jt" ADD CONSTRAINT "fk_uni_con_jt_fro_uni" FOREIGN KEY ("from_unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE cascade;
ALTER TABLE "unit_conversions_jt" ADD CONSTRAINT "fk_uni_con_jt_to_uni" FOREIGN KEY ("to_unit_id") REFERENCES "public"."units"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "users" ADD CONSTRAINT "fk_use_aut_use" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
