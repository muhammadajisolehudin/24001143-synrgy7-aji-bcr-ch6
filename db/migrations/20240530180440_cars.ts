import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder)=>{
        table.string('id', 255).primary().notNullable();
        table.string('plat_no', 10).unique().notNullable();
        table.string('name', 100).notNullable();
        table.string('color', 20);
        table.string('img', 255);
        table.integer('tahun_produksi').notNullable(); 
        table.boolean('status').notNullable().defaultTo(true);
        table.integer('price').notNullable();

        table.string('create_by').unsigned().notNullable();
        table.foreign('create_by').references('users.id');

        table.string('update_by').unsigned().notNullable();
        table.foreign('update_by').references('users.id');

        table.timestamps(true, true); 

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars');
}

