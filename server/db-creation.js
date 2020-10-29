require("dotenv").config()
const conn = require("./db")
const sha512 = require("js-sha512")
const { createSalt } = require("./utils/salt")

const tables = [
  "galleries",
  "venue_labels",
  "happy_hr",
  "venues",
  "locations",
  "labels",
  "admins",
]

async function main() {
  for (let table of tables) {
    const hasTable = await conn.schema.hasTable(table)
    if (hasTable) {
      await conn.schema.dropTable(table)
    }
  }

  await conn.schema.createTable(`locations`, (table) => {
    table.increments("id")
    table.string("street_1", 50)
    table.string("street_2", 50)
    table.string("city", 50)
    table.string("state", 50)
    table.integer("zip")
  })

  await conn.schema.createTable(`venues`, (table) => {
    table.increments("id");
    table.string("title", 50);
    table.text("desc");
    table.integer("location_id").unsigned();
    table.foreign("location_id").references("locations.id");
    table.enu("type", ["bar", "restaurant", "shop", "experience"]);
    table.string("link", 255);
  });

  await conn.schema.createTable(`labels`, (table) => {
    table.increments("id")
    table.string("desc", 255)
    table.string("icon", 255)
  })

  await conn.schema.createTable(`admins`, (table) => {
    table.increments("id")
    table.string("username", 50)
    table.string("password", 255)
    table.string("salt", 50)
  })

  await conn.schema.createTable(`venue_labels`, (table) => {
    table.integer("venue_id").unsigned()
    table.foreign("venue_id").references("venues.id")
    table.integer("label_id").unsigned()
    table.foreign("label_id").references("labels.id")
  })

  await conn.schema.createTable(`happy_hr`, (table) => {
    table.increments("id");
    table.integer("venue_id").unsigned();
    table.foreign("venue_id").references("venues.id");
    table.string("happy_hr_start", 255);
    table.string("happy_hr_stop", 255);
    table.string("day", 255);
  });

  await conn.schema.createTable(`galleries`, (table) => {
    table.increments("id")
    table.integer("venue_id").unsigned()
    table.foreign("venue_id").references("venues.id")
    table.string("image", 255)
  })


  //DB INSERT LABELS

  await conn("labels").insert({ desc: "Masks Required", icon: "" })
  await conn("labels").insert({ desc: "Takeout", icon: "" })
  await conn("labels").insert({ desc: "Sit-down", icon: "" })
  await conn("labels").insert({ desc: "Curbside Pickup", icon: "" })
  await conn("labels").insert({ desc: "Limited Capacity", icon: "" })
  await conn("labels").insert({ desc: "Social Distancing Enforced", icon: "" })
  await conn("labels").insert({ desc: "Sanitize", icon: "" })
  await conn("labels").insert({ desc: "Outdoor Seating", icon: "" })
  await conn("labels").insert({ desc: "Pet-Friendly", icon: "" })
  const salt = createSalt(20)

  //DB INSERT ADMINS
  await conn("admins").insert({
    username: "will_stoddard",
    password: sha512("password1" + salt),
    salt: salt,
  })
  await conn("admins").insert({
    username: "derrique_baluyut",
    password: sha512("password2" + salt),
    salt: salt,
  })
  await conn("admins").insert({
    username: "bereket_girma",
    password: sha512("password3" + salt),
    salt: salt,
  })

  //DB INSERT LOCATIONS

  //RESTAURANTS
  await conn("locations").insert({
    street_1: "900 S Las Vegas Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1130 S Casino Center Blvd",
    street_2: "#110",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "10 E Charleston Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1120 S Main St",
    street_2: "Suite 110",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "124 S 6th St",
    street_2: "#100",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "707 E Carson Ave",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "523 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1126 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1108 S 3rd St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1114 S Casino Center Blvd",
    street_2: "#1",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "616 E Carson Ave",
    street_2: "#110",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "201 N 3rd St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "500 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  //BARS

  await conn("locations").insert({
    street_1: "1218 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1120 S Main St",
    street_2: "#150",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "917 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1327 S Main St",
    street_2: "Ste 160",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1225 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "197 E California Ave",
    street_2: "#130",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1121 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "197 E California Ave",
    street_2: "#140",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "#135",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "124 S 11th St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "#250",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1025 S 1st St",
    street_2: "#100",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1516 S Las Vegas Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  //EXPERIENCES AND SHOPS
  await conn("locations").insert({
    street_1: "707 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "300 Stewart Ave",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "770 Las Vegas Blvd N",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1031 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1031 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "725 S Las Vegas Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "713 S Las Vegas Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "600 E Charlseton Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1023 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  //this is fremont street experience
  await conn("locations").insert({
    street_1: "Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "425 Fremont St",
    street_2: "#160",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "#270",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "Suite 163",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "#140",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1028 NV-582",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1229 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1131 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
  })

  await conn("locations").insert({
    street_1: "1001 S 1st St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "818 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "723 S 1st St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  await conn("locations").insert({
    street_1: "1 N Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
  })

  //DB INSERT VENUES

  //RESTAURANTS
  await conn("venues").insert({
    title: "The Goodwich Downtown",
    desc: null,
    location_id: 1,
    type: "restaurant",
    link: "https://thegoodwich.com/",
  });

  await conn("venues").insert({
    title: "Esther's Kitchen",
    desc: null,
    location_id: 2,
    type: "restaurant",
    link: "https://www.estherslv.com/",
  });

  await conn("venues").insert({
    title: "Cornish Pasty Co.",
    desc: null,
    location_id: 3,
    type: "restaurant",
    link: "https://www.cornishpastyco.com/",
  });

  await conn("venues").insert({
    title: "Makers & Finders Coffee",
    desc: null,
    location_id: 4,
    type: "restaurant",
    link: "https://www.makerslv.com/",
  });

  await conn("venues").insert({
    title: "Carson Kitchen",
    desc: null,
    location_id: 5,
    type: "restaurant",
    link: "https://www.carsonkitchen.com/las/index.html",
  });

  await conn("venues").insert({
    title: "eat.",
    desc: null,
    location_id: 6,
    type: "restaurant",
    link: "https://eatdtlv.chefnatalieyoung.com/",
  });

  await conn("venues").insert({
    title: "Le Thai",
    desc: null,
    location_id: 7,
    type: "restaurant",
    link: "https://lethaivegas.com/",
  });

  await conn("venues").insert({
    title: "PublicUs",
    desc: null,
    location_id: 8,
    type: "restaurant",
    link: "http://www.publicuslv.com/",
  });

  await conn("venues").insert({
    title: "D E Thai Kitchen",
    desc: null,
    location_id: 9,
    type: "restaurant",
    link: "https://www.dethaikitchen.com/",
  });

  await conn("venues").insert({
    title: "Vesta Coffee Roasters",
    desc: null,
    location_id: 10,
    type: "restaurant",
    link: "https://vestacoffee.com/",
  });

  await conn("venues").insert({
    title: "7th & Carson",
    desc: null,
    location_id: 11,
    type: "restaurant",
    link: "https://www.7thandcarson.com/",
  });

  await conn("venues").insert({
    title: "Pizza Rock",
    desc: null,
    location_id: 12,
    type: "restaurant",
    link: "https://pizzarocklasvegas.com/",
  });

  await conn("venues").insert({
    title: "MTO Café",
    desc: null,
    location_id: 13,
    type: "restaurant",
    link: "https://mtocafe.com/",
  });

  //BARS

  await conn("venues").insert({
    title: "Velveteen Rabbit",
    desc: null,
    location_id: 14,
    type: "bar",
    link: "https://velveteenrabbitlv.com/",
  });

  await conn("venues").insert({
    title: "Hop Nuts Brewing",
    desc: null,
    location_id: 15,
    type: "bar",
    link: "http://www.hopnutsbrewing.com/",
  });

  await conn("venues").insert({
    title: "Atomic Liquors",
    desc: null,
    location_id: 16,
    type: "bar",
    link: "http://atomic.vegas/",
  });

  await conn("venues").insert({
    title: "Nevada Brew Works",
    desc: null,
    location_id: 17,
    type: "bar",
    link: "https://nevadabrewworks.com/",
  });

  await conn("venues").insert({
    title: "ReBAR",
    desc: null,
    location_id: 18,
    type: "bar",
    link: "https://rebarlv.com/",
  });

  await conn("venues").insert({
    title: "CraftHaus Brewery",
    desc: null,
    location_id: 19,
    type: "bar",
    link: "https://www.crafthausbrewery.com/home",
  });

  await conn("venues").insert({
    title: "Jammyland Cocktail Bar & Reggae Kitchen",
    desc: null,
    location_id: 20,
    type: "bar",
    link: "https://jammy.land/",
  });

  await conn("venues").insert({
    title: "Garagiste Wine Room & Merchant",
    desc: null,
    location_id: 21,
    type: "bar",
    link: "http://garagistelv.com/",
  });

  await conn("venues").insert({
    title: "Banger Brewing",
    desc: null,
    location_id: 22,
    type: "bar",
    link: "http://bangerbrewing.com/",
  });

  await conn("venues").insert({
    title: "Bunkhouse Saloon",
    desc: null,
    location_id: 23,
    type: "bar",
    link: "https://bunkhousedowntown.com/",
  });

  await conn("venues").insert({
    title: "The NERD",
    desc: null,
    location_id: 24,
    type: "bar",
    link: "https://thenerd.com/",
  });

  await conn("venues").insert({
    title: "Artifice",
    desc: null,
    location_id: 25,
    type: "bar",
    link: "https://www.artificebarlv.com/",
  });

  await conn("venues").insert({
    title: "Dino's Lounge",
    desc: null,
    location_id: 26,
    type: "bar",
    link: "https://www.facebook.com/DinosLV/",
  });

  // SHOPS AND EXPERIENCES INSERTS

  await conn("venues").insert({
    title: "Downtown Container Park",
    desc: null,
    location_id: 27,
    type: "experience",
    link: "https://downtowncontainerpark.com/",
  });

  await conn("venues").insert({
    title: "Neonopolis",
    desc: null,
    location_id: 28,
    type: "experience",
    link: "https://www.neonopolislv.com/",
  });

  await conn("venues").insert({
    title: "Toy Shack",
    desc: null,
    location_id: 29,
    type: "shop",
    link: "https://www.facebook.com/lasvegastoyshack/",
  });

  await conn("venues").insert({
    title: "Mob Museum",
    desc: null,
    location_id: 30,
    type: "experience",
    link: "https://themobmuseum.org/",
  });

  await conn("venues").insert({
    title: "Neon Museum",
    desc: null,
    location_id: 31,
    type: "experience",
    link: "https://www.neonmuseum.org/",
  });

  await conn("venues").insert({
    title: "Pour in the Alley",
    desc: null,
    location_id: 32,
    type: "experience",
    link: "https://www.fergusonsdowntown.com/pour-in-the-alley",
  });

  await conn("venues").insert({
    title: "Market in the Alley",
    desc: null,
    location_id: 33,
    type: "experience",
    link: "https://www.fergusonsdowntown.com/market-in-the-alley",
  });

  await conn("venues").insert({
    title: "Pawn Plaza",
    desc: null,
    location_id: 34,
    type: "experience",
    link: "https://pawnplaza.com/",
  });

  await conn("venues").insert({
    title: "Gold & Silver Pawn Shop",
    desc: null,
    location_id: 35,
    type: "shop",
    link: "https://gspawn.com/",
  });

  await conn("venues").insert({
    title: "Zak Bagan's The Haunted Museum",
    desc: null,
    location_id: 36,
    type: "experience",
    link: "https://thehauntedmuseum.com/",
  });

  await conn("venues").insert({
    title: "11th St Records",
    desc: null,
    location_id: 37,
    type: "shop",
    link: "http://www.11thstreetrecords.com/",
  });

  await conn("venues").insert({
    title: "Fremont Street Experience",
    desc: null,
    location_id: 38,
    type: "experience",
    link: "https://vegasexperience.com/",
  });

  await conn("venues").insert({
    title: "Slotzilla Zipline",
    desc: null,
    location_id: 39,
    type: "experience",
    link:
      "https://vegasexperience.com/slotzilla-zip-line/?utm_source=google&utm_medium=organic",
  });

  await conn("venues").insert({
    title: "Viva Vision Lightshow",
    desc: null,
    location_id: 40,
    type: "experience",
    link: "https://vegasexperience.com/viva-vision-light-show/",
  });

  await conn("venues").insert({
    title: "Metropolitan Gallery/Art Museum",
    desc: null,
    location_id: 41,
    type: "experience",
    link: "https://www.mglv.org/",
  });

  await conn("venues").insert({
    title: "Axehole",
    desc: null,
    location_id: 42,
    type: "experience",
    link: "https://axeholevegas.com/",
  });

  await conn("venues").insert({
    title: "Cannabition Cannabis Museum",
    desc: null,
    location_id: 43,
    type: "experience",
    link: "https://cannabition.com/visit/",
  });

  await conn("venues").insert({
    title: "Big Rig Jig",
    desc: null,
    location_id: 44,
    type: "experience",
    link: null,
  });

  await conn("venues").insert({
    title: "Southern Nevada Museum of Fine Art",
    desc: null,
    location_id: 45,
    type: "experience",
    link: "http://snmfa.com/",
  });

  await conn("venues").insert({
    title: "Vintage Vegas Antiques and Collectibles",
    desc: null,
    location_id: 46,
    type: "shop",
    link: "https://vintagevegas.com/",
  });

  await conn("venues").insert({
    title: "Retro Vegas LLC",
    desc: null,
    location_id: 47,
    type: "shop",
    link: "http://www.retro-vegas.com/",
  });

  await conn("venues").insert({
    title: "Art District",
    desc: null,
    location_id: 48,
    type: "experience",
    link: "https://www.18b.org/",
  });

  await conn("venues").insert({
    title: "Fabrizio Banquet Hall",
    desc: null,
    location_id: 49,
    type: "experience",
    link: "https://www.fabriziovegas.com/",
  });

  await conn("venues").insert({
    title: "Las Vegas Dream Factory",
    desc: null,
    location_id: 50,
    type: "experience",
    link: "https://lasvegasdreamfactory.com/",
  });

  await conn("venues").insert({
    title: "Bender Jamboree",
    desc: null,
    location_id: 51,
    type: "experience",
    link: "http://benderjamboree.com/",
  });

  //DB INSERT HAPPY HOURS

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: "3pm",
    happy_hr_stop: "6pm",
    day: "Mon-Fri",
  });

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: "5pm",
    happy_hr_stop: "7pm",
    // happy_hr_start: "9pm",
    // happy_hr_stop: "11pm",
    day: "Mon-Sun",
  });

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: "3pm",
    happy_hr_stop: "6pm",
    day: "Mon-Fri",
    // happy_hr_start: "9pm",
    // happy_hr_stop: "11pm",
    // day: "Sun-Thur",
    // happy_hr_start: "9pm",
    // happy_hr_stop: "12am",
    // day: "Fri-Sat",
  });

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: "4pm",
    happy_hr_stop: "6pm",
    day: "Mon-Sun",
  });

  await conn("happy_hr").insert({
    venue_id: 5,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 6,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 7,
    happy_hr_start: "3pm",
    happy_hr_stop: "6pm",
    day: "Mon-Fri",
  });

  await conn("happy_hr").insert({
    venue_id: 8,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 9,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 10,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 11,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 12,
    happy_hr_start: "3pm",
    happy_hr_stop: "6pm",
    day: "Mon-Fri",
  });

  await conn("happy_hr").insert({
    venue_id: 13,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: "5pm",
    happy_hr_stop: "7pm",
    day: "Daily",
  });

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: "4pm",
    happy_hr_stop: "7pm",
    day: "Daily",
  });

  await conn("happy_hr").insert({
    venue_id: 16,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 17,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 18,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 19,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 20,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 21,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: "3pm",
    happy_hr_stop: "9pm",
    day: "Mon-Sun ",
    // happy_hr_start: "1pm",
    // happy_hr_stop: "3pm",
    // happy_hr_start: "9pm",
    // happy_hr_stop: "11pm",
    // day: "Wed-Sun",
  });

  await conn("happy_hr").insert({
    venue_id: 23,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 24,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 25,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  await conn("happy_hr").insert({
    venue_id: 26,
    happy_hr_start: null,
    happy_hr_stop: null,
    day: null,
  });

  process.exit();
}

main()
