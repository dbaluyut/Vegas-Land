require("dotenv").config();
const conn = require("./db");
const sha512 = require("js-sha512");
const { createSalt } = require("./utils/salt");

const tables = [
  "galleries",
  "venue_labels",
  "happy_hr",
  "venues",
  "locations",
  "labels",
  "admins",
];

async function main() {
  for (let table of tables) {
    const hasTable = await conn.schema.hasTable(table);
    if (hasTable) {
      await conn.schema.dropTable(table);
    }
  }

  await conn.schema.createTable(`locations`, (table) => {
    table.increments("id");
    table.string("street_1", 50);
    table.string("street_2", 50);
    table.string("city", 50);
    table.string("state", 50);
    table.integer("zip");
  });

  await conn.schema.createTable(`venues`, (table) => {
    table.increments("id");
    table.string("title", 50);
    table.text("desc");
    table.string("salt", 50);
    table.integer("location_id").unsigned();
    table.foreign("location_id").references("locations.id");
    table.enu("type", ["bar", "restaurant", "shop", "experience"]);
    table.string("link", 255);
  });

  await conn.schema.createTable(`labels`, (table) => {
    table.increments("id");
    table.string("desc", 255);
    table.string("icon", 255);
  });

  await conn.schema.createTable(`admins`, (table) => {
    table.increments("id");
    table.string("username", 50);
    table.string("password", 50);
    table.string("salt", 50);
  });

  await conn.schema.createTable(`venue_labels`, (table) => {
    table.integer("venue_id").unsigned();
    table.foreign("venue_id").references("venues.id");
    table.integer("label_id").unsigned();
    table.foreign("label_id").references("labels.id");
  });

  await conn.schema.createTable(`happy_hr`, (table) => {
    table.increments("id");
    table.integer("venue_id").unsigned();
    table.foreign("venue_id").references("venues.id");
    table.string("happy_hr_start", 255);
    table.string("happy_hr_stop", 255);
    table.string("happy_hr_day", 255);
  });

  await conn.schema.createTable(`galleries`, (table) => {
    table.increments("id");
    table.integer("venue_id").unsigned();
    table.foreign("venue_id").references("venues.id");
    table.string("image", 255);
  });

  await conn('labels').insert({desc: 'Masks Required', icon: ''})
  await conn('labels').insert({desc: 'Takeout', icon: ''})
  await conn('labels').insert({desc: 'Sit-down', icon: ''})
  await conn('labels').insert({desc: 'Curbside Pickup', icon: ''})
  await conn('labels').insert({desc: 'Limited Capacity', icon: ''})
  await conn('labels').insert({desc: 'Social Distancing Enforced', icon: ''})
  await conn('labels').insert({desc: 'Sanitize', icon: ''})
  await conn('labels').insert({desc: 'Outdoor Seating', icon: ''})
  await conn('labels').insert({desc: 'Pet-Friendly', icon: ''})
  //   const salt = createSalt(20)
  //   await conn('users').insert({username: 'test', password: sha512('test' + salt), salt: salt})

  process.exit();
}

main();
