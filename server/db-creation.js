require("dotenv").config()
const conn = require("./db")
const sha512 = require("js-sha512")
const { createSalt } = require("./utils/salt")

const tables = [
  "recommendations",
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
    table.decimal("lat", 9, 6)
    table.decimal("lng", 9, 6)
  })

  await conn.schema.createTable(`venues`, (table) => {
    table.increments("id")
    table.string("title", 50)
    table.text("desc")
    table.integer("location_id").unsigned()
    table.foreign("location_id").references("locations.id")
    table.enu("type", ["bar", "restaurant", "shop", "experience"])
    table.string("link", 255)
  })

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
    table.foreign("venue_id").references("venues.id").onDelete("cascade")
    table.integer("label_id").unsigned()
    table.foreign("label_id").references("labels.id")
  })

  await conn.schema.createTable(`happy_hr`, (table) => {
    table.increments("id")
    table.integer("venue_id").unsigned()
    table.foreign("venue_id").references("venues.id").onDelete("cascade")
    table.integer("happy_hr_start", 255)
    table.integer("happy_hr_stop", 255)
    table.integer("day")
  })

  await conn.schema.createTable(`galleries`, (table) => {
    table.increments("id")
    table.integer("venue_id").unsigned()
    table.foreign("venue_id").references("venues.id").onDelete("cascade")
    table.text("image")
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
  await conn("labels").insert({ desc: "Delivery", icon: "" })

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
    lat: 36.15995,
    lng: -115.14746,
  })

  await conn("locations").insert({
    street_1: "1130 S Casino Center Blvd",
    street_2: "#110",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.157650,
    lng: -115.152700,
  })

  await conn("locations").insert({
    street_1: "10 E Charleston Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.158480,
    lng: -115.152910,
  })

  await conn("locations").insert({
    street_1: "1120 S Main St",
    street_2: "Suite 110",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.701120,
    lng: -86.572190,
  })

  await conn("locations").insert({
    street_1: "124 S 6th St",
    street_2: "#100",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 44.016030,
    lng: -107.961530,
  })

  await conn("locations").insert({
    street_1: "707 E Carson Ave",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.166720,
    lng: -115.138940,
  })

  await conn("locations").insert({
    street_1: "523 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.168749,
    lng: -115.139889,
  })

  await conn("locations").insert({
    street_1: "1126 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.1656872,
    lng: -115.1329606,
  })

  await conn("locations").insert({
    street_1: "1108 S 3rd St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15855641,
    lng: -115.15109192,
  })

  await conn("locations").insert({
    street_1: "1114 S Casino Center Blvd",
    street_2: "#1",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.1581397,
    lng: -115.1525377,
  })

  await conn("locations").insert({
    street_1: "616 E Carson Ave",
    street_2: "#110",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    // lat: ,
    // lng: ,
  })

  await conn("locations").insert({
    street_1: "201 N 3rd St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.1715961,
    lng: -115.1422478,
  })

  await conn("locations").insert({
    street_1: "500 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.16633751,
    lng: -115.14996694,
  })

  //BARS

  await conn("locations").insert({
    street_1: "1218 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15712074,
    lng: -115.15377702,
  })

  await conn("locations").insert({
    street_1: "1120 S Main St",
    street_2: "#150",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.1578377,
    lng: -115.1538468,
  })

  await conn("locations").insert({
    street_1: "917 Fremont St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.16678455,
    lng: -115.13552457,
  })

  await conn("locations").insert({
    street_1: "1327 S Main St",
    street_2: "Ste 160",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15569585,
    lng: -115.15367944,
  })

  await conn("locations").insert({
    street_1: "1225 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15704425,
    lng: -115.15357815,
  })

  await conn("locations").insert({
    street_1: "197 E California Ave",
    street_2: "#130",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15745858,
    lng: -115.15252884,
  })

  await conn("locations").insert({
    street_1: "1121 S Main St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15842477,
    lng: -115.153474,
  })

  await conn("locations").insert({
    street_1: "197 E California Ave",
    street_2: "#140",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15745858,
    lng: -115.15252884,
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "#135",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.1695185,
    lng: -115.1409447,
  })

  await conn("locations").insert({
    street_1: "124 S 11th St",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.16599216,
    lng: -115.1341177,
  })

  await conn("locations").insert({
    street_1: "450 Fremont St",
    street_2: "#250",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.1695185,
    lng: -115.1409447,
  })

  await conn("locations").insert({
    street_1: "1025 S 1st St",
    street_2: "#100",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.16033625,
    lng: -115.15218837,
  })

  await conn("locations").insert({
    street_1: "1516 S Las Vegas Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15303935,
    lng: 115.15150266,
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
  })

  await conn("venues").insert({
    title: "Esther's Kitchen",
    desc: null,
    location_id: 2,
    type: "restaurant",
    link: "https://www.estherslv.com/",
  })

  await conn("venues").insert({
    title: "Cornish Pasty Co.",
    desc: null,
    location_id: 3,
    type: "restaurant",
    link: "https://www.cornishpastyco.com/",
  })

  await conn("venues").insert({
    title: "Makers & Finders Coffee",
    desc: null,
    location_id: 4,
    type: "restaurant",
    link: "https://www.makerslv.com/",
  })

  await conn("venues").insert({
    title: "Carson Kitchen",
    desc: null,
    location_id: 5,
    type: "restaurant",
    link: "https://www.carsonkitchen.com/las/index.html",
  })

  await conn("venues").insert({
    title: "eat.",
    desc: null,
    location_id: 6,
    type: "restaurant",
    link: "https://eatdtlv.chefnatalieyoung.com/",
  })

  await conn("venues").insert({
    title: "Le Thai",
    desc: null,
    location_id: 7,
    type: "restaurant",
    link: "https://lethaivegas.com/",
  })

  await conn("venues").insert({
    title: "PublicUs",
    desc: null,
    location_id: 8,
    type: "restaurant",
    link: "http://www.publicuslv.com/",
  })

  await conn("venues").insert({
    title: "D E Thai Kitchen",
    desc: null,
    location_id: 9,
    type: "restaurant",
    link: "https://www.dethaikitchen.com/",
  })

  await conn("venues").insert({
    title: "Vesta Coffee Roasters",
    desc: null,
    location_id: 10,
    type: "restaurant",
    link: "https://vestacoffee.com/",
  })

  await conn("venues").insert({
    title: "7th & Carson",
    desc: null,
    location_id: 11,
    type: "restaurant",
    link: "https://www.7thandcarson.com/",
  })

  await conn("venues").insert({
    title: "Pizza Rock",
    desc: null,
    location_id: 12,
    type: "restaurant",
    link: "https://pizzarocklasvegas.com/",
  })

  await conn("venues").insert({
    title: "MTO Café",
    desc: null,
    location_id: 13,
    type: "restaurant",
    link: "https://mtocafe.com/",
  })

  //BARS

  await conn("venues").insert({
    title: "Velveteen Rabbit",
    desc: null,
    location_id: 14,
    type: "bar",
    link: "https://velveteenrabbitlv.com/",
  })

  await conn("venues").insert({
    title: "Hop Nuts Brewing",
    desc: null,
    location_id: 15,
    type: "bar",
    link: "http://www.hopnutsbrewing.com/",
  })

  await conn("venues").insert({
    title: "Atomic Liquors",
    desc: null,
    location_id: 16,
    type: "bar",
    link: "http://atomic.vegas/",
  })

  await conn("venues").insert({
    title: "Nevada Brew Works",
    desc: null,
    location_id: 17,
    type: "bar",
    link: "https://nevadabrewworks.com/",
  })

  await conn("venues").insert({
    title: "ReBAR",
    desc: null,
    location_id: 18,
    type: "bar",
    link: "https://rebarlv.com/",
  })

  await conn("venues").insert({
    title: "CraftHaus Brewery",
    desc: null,
    location_id: 19,
    type: "bar",
    link: "https://www.crafthausbrewery.com/home",
  })

  await conn("venues").insert({
    title: "Jammyland Cocktail Bar & Reggae Kitchen",
    desc: null,
    location_id: 20,
    type: "bar",
    link: "https://jammy.land/",
  })

  await conn("venues").insert({
    title: "Garagiste Wine Room & Merchant",
    desc: null,
    location_id: 21,
    type: "bar",
    link: "http://garagistelv.com/",
  })

  await conn("venues").insert({
    title: "Banger Brewing",
    desc: null,
    location_id: 22,
    type: "bar",
    link: "http://bangerbrewing.com/",
  })

  await conn("venues").insert({
    title: "Bunkhouse Saloon",
    desc: null,
    location_id: 23,
    type: "bar",
    link: "https://bunkhousedowntown.com/",
  })

  await conn("venues").insert({
    title: "The NERD",
    desc: null,
    location_id: 24,
    type: "bar",
    link: "https://thenerd.com/",
  })

  await conn("venues").insert({
    title: "Artifice",
    desc: null,
    location_id: 25,
    type: "bar",
    link: "https://www.artificebarlv.com/",
  })

  await conn("venues").insert({
    title: "Dino's Lounge",
    desc: null,
    location_id: 26,
    type: "bar",
    link: "https://www.facebook.com/DinosLV/",
  })

  // SHOPS AND EXPERIENCES INSERTS

  await conn("venues").insert({
    title: "Downtown Container Park",
    desc: null,
    location_id: 27,
    type: "experience",
    link: "https://downtowncontainerpark.com/",
  })

  await conn("venues").insert({
    title: "Neonopolis",
    desc: null,
    location_id: 28,
    type: "experience",
    link: "https://www.neonopolislv.com/",
  })

  await conn("venues").insert({
    title: "Toy Shack",
    desc: null,
    location_id: 29,
    type: "shop",
    link: "https://www.facebook.com/lasvegastoyshack/",
  })

  await conn("venues").insert({
    title: "Mob Museum",
    desc: null,
    location_id: 30,
    type: "experience",
    link: "https://themobmuseum.org/",
  })

  await conn("venues").insert({
    title: "Neon Museum",
    desc: null,
    location_id: 31,
    type: "experience",
    link: "https://www.neonmuseum.org/",
  })

  await conn("venues").insert({
    title: "Pour in the Alley",
    desc: null,
    location_id: 32,
    type: "experience",
    link: "https://www.fergusonsdowntown.com/pour-in-the-alley",
  })

  await conn("venues").insert({
    title: "Market in the Alley",
    desc: null,
    location_id: 33,
    type: "experience",
    link: "https://www.fergusonsdowntown.com/market-in-the-alley",
  })

  await conn("venues").insert({
    title: "Pawn Plaza",
    desc: null,
    location_id: 34,
    type: "experience",
    link: "https://pawnplaza.com/",
  })

  await conn("venues").insert({
    title: "Gold & Silver Pawn Shop",
    desc: null,
    location_id: 35,
    type: "shop",
    link: "https://gspawn.com/",
  })

  await conn("venues").insert({
    title: "Zak Bagan's The Haunted Museum",
    desc: null,
    location_id: 36,
    type: "experience",
    link: "https://thehauntedmuseum.com/",
  })

  await conn("venues").insert({
    title: "11th St Records",
    desc: null,
    location_id: 37,
    type: "shop",
    link: "http://www.11thstreetrecords.com/",
  })

  await conn("venues").insert({
    title: "Fremont Street Experience",
    desc: null,
    location_id: 38,
    type: "experience",
    link: "https://vegasexperience.com/",
  })

  await conn("venues").insert({
    title: "Slotzilla Zipline",
    desc: null,
    location_id: 39,
    type: "experience",
    link:
      "https://vegasexperience.com/slotzilla-zip-line/?utm_source=google&utm_medium=organic",
  })

  await conn("venues").insert({
    title: "Viva Vision Lightshow",
    desc: null,
    location_id: 40,
    type: "experience",
    link: "https://vegasexperience.com/viva-vision-light-show/",
  })

  await conn("venues").insert({
    title: "Metropolitan Gallery/Art Museum",
    desc: null,
    location_id: 41,
    type: "experience",
    link: "https://www.mglv.org/",
  })

  await conn("venues").insert({
    title: "Axehole",
    desc: null,
    location_id: 42,
    type: "experience",
    link: "https://axeholevegas.com/",
  })

  await conn("venues").insert({
    title: "Cannabition Cannabis Museum",
    desc: null,
    location_id: 43,
    type: "experience",
    link: "https://cannabition.com/visit/",
  })

  await conn("venues").insert({
    title: "Big Rig Jig",
    desc: null,
    location_id: 44,
    type: "experience",
    link: null,
  })

  await conn("venues").insert({
    title: "Southern Nevada Museum of Fine Art",
    desc: null,
    location_id: 45,
    type: "experience",
    link: "http://snmfa.com/",
  })

  await conn("venues").insert({
    title: "Vintage Vegas Antiques and Collectibles",
    desc: null,
    location_id: 46,
    type: "shop",
    link: "https://vintagevegas.com/",
  })

  await conn("venues").insert({
    title: "Retro Vegas LLC",
    desc: null,
    location_id: 47,
    type: "shop",
    link: "http://www.retro-vegas.com/",
  })

  await conn("venues").insert({
    title: "Art District",
    desc: null,
    location_id: 48,
    type: "experience",
    link: "https://www.18b.org/",
  })

  await conn("venues").insert({
    title: "Fabrizio Banquet Hall",
    desc: null,
    location_id: 49,
    type: "experience",
    link: "https://www.fabriziovegas.com/",
  })

  await conn("venues").insert({
    title: "Las Vegas Dream Factory",
    desc: null,
    location_id: 50,
    type: "experience",
    link: "https://lasvegasdreamfactory.com/",
  })

  await conn("venues").insert({
    title: "Bender Jamboree",
    desc: null,
    location_id: 51,
    type: "experience",
    link: "http://benderjamboree.com/",
  })

  //DB INSERT HAPPY HOURS

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: 900,
    happy_hr_stop: 2300,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 1,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 2,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 0000,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 3,
    happy_hr_start: 2100,
    happy_hr_stop: 0000,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 4,
    happy_hr_start: 1600,
    happy_hr_stop: 1800,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 7,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 7,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 7,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 7,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 7,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 12,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 12,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 12,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 12,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 12,
    happy_hr_start: 1500,
    happy_hr_stop: 1800,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 14,
    happy_hr_start: 1700,
    happy_hr_stop: 1900,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 15,
    happy_hr_start: 1600,
    happy_hr_stop: 1900,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1800,
    happy_hr_stop: 2100,
    day: 1,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1800,
    happy_hr_stop: 2100,
    day: 2,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1300,
    happy_hr_stop: 1500,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1300,
    happy_hr_stop: 1500,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1300,
    happy_hr_stop: 1500,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1300,
    happy_hr_stop: 1500,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 1300,
    happy_hr_stop: 1500,
    day: 7,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 3,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 4,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 5,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 6,
  })

  await conn("happy_hr").insert({
    venue_id: 22,
    happy_hr_start: 2100,
    happy_hr_stop: 2300,
    day: 7,
  })
  // DB INSERT VENUE_LABELS

  // RESTAURANTS INSERT

  await conn("venue_labels").insert({
    venue_id: 1,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 1,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 2,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 2,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 2,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 2,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 2,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 2,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 3,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 4,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 4,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 4,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 4,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 4,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 5,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 6,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 3,
  })
  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 4,
  })
  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 7,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 8,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 8,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 8,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 8,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 9,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 10,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 10,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 10,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 10,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 10,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 7,
  })
  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 11,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 12,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 13,
    label_id: 10,
  })

  await conn("venue_labels").insert({
    venue_id: 14,
    label_id: null,
  })

  await conn("venue_labels").insert({
    venue_id: 15,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 15,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 16,
    label_id: null,
  })

  await conn("venue_labels").insert({
    venue_id: 17,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 17,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 18,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 19,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 2,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 4,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 20,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 21,
    label_id: 8,
  })

  await conn("venue_labels").insert({
    venue_id: 22,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 22,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 22,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 23,
    label_id: null,
  })

  await conn("venue_labels").insert({
    venue_id: 24,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 25,
    label_id: 1,
  })

  await conn("venue_labels").insert({
    venue_id: 25,
    label_id: 3,
  })

  await conn("venue_labels").insert({
    venue_id: 25,
    label_id: 5,
  })

  await conn("venue_labels").insert({
    venue_id: 25,
    label_id: 6,
  })

  await conn("venue_labels").insert({
    venue_id: 25,
    label_id: 7,
  })

  await conn("venue_labels").insert({
    venue_id: 26,
    label_id: null,
  })

  // DB INSERTS FOR GALLERIES

  await conn("galleries").insert({
    venue_id: 1,
    image:
      "https://roadfood.com/wp-content/uploads/2018/06/The-Goodwhich-Reubenish.jpeg",
  })

  await conn("galleries").insert({
    venue_id: 2,
    image:
      "https://bestoflasvegas.com/custom/domain_1/image_files/sitemgr_photo_9883.jpg",
  })

  await conn("galleries").insert({
    venue_id: 3,
    image:
      "https://www.cornishpastyco.com/wp-content/uploads/2018/11/home2.jpg",
  })

  await conn("galleries").insert({
    venue_id: 4,
    image:
      "https://media.lasvegassun.com/media/img/photos/2014/11/24/1124MakersFindersCoffee10.JPG",
  })

  await conn("galleries").insert({
    venue_id: 5,
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/84/77/5d/devil-s-eggs.jpg",
  })

  await conn("galleries").insert({
    venue_id: 6,
    image:
      "https://media.cntraveler.com/photos/5a81c39286e4b63c297d479e/4:5/w_767,c_limit/Eat-Downtown-Las-Vegas__2018_2015_05_28_Eat_Again-143-Killer_Grilled_Cheese_Tomato_Soup_Photo_By_Brad_Swonetz.jpg",
  })

  await conn("galleries").insert({
    venue_id: 7,
    image:
      "https://secureservercdn.net/198.71.233.51/wkd.2a2.myftpupload.com/wp-content/uploads/2020/06/le_thai_awesome_noodles_15_1310x1287-750x750.jpg",
  })

  await conn("galleries").insert({
    venue_id: 8,
    image:
      "https://media.lasvegassun.com/media/img/photos/2015/04/08/IMG_9736_t1000.jpg?c76bf34eada957f64a0b14990027a576ff9bf379",
  })

  await conn("galleries").insert({
    venue_id: 9,
    image:
      "https://s3-media0.fl.yelpcdn.com/bphoto/nuLnbCe6E3chgGPuqJSULg/o.jpg",
  })

  await conn("galleries").insert({
    venue_id: 10,
    image:
      "https://www.reviewjournal.com/wp-content/uploads/2017/01/web1_matcha-latte_7760993.jpg?crop=1",
  })

  await conn("galleries").insert({
    venue_id: 11,
    image:
      "https://media.lasvegasweekly.com/img/photos/2019/10/22/_7thCarson-by-Christopher-DeVargas_t1000.png?c76bf34eada957f64a0b14990027a576ff9bf379",
  })

  await conn("galleries").insert({
    venue_id: 12,
    image:
      "https://pizzarocklasvegas.com/wp-content/uploads/sites/2/2019/10/pr-food-6.jpg",
  })

  await conn("galleries").insert({
    venue_id: 13,
    image:
      "https://img1.10bestmedia.com/Images/Photos/372846/MTO-Cafe-Blueberry-Pancakes_55_660x440.jpg",
  })

  await conn("galleries").insert({
    venue_id: 14,
    image:
      "https://assets.bonappetit.com/photos/578e48fd0150278b02e3920c/2:1/w_880,c_limit/VELVETEEN-RABBIT-vegas-restaurant-communion-wafer-cocktail.jpg?mbid=social_retweet",
  })

  await conn("galleries").insert({
    venue_id: 15,
    image:
      "https://cdn.vox-cdn.com/thumbor/zZLUTnhiNpsFfSAuR546eLq3Nx0=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18971656/Hop_Nuts_open.jpg",
  })

  await conn("galleries").insert({
    venue_id: 16,
    image:
      "https://modtraveler.net/wp-content/uploads/2015/06/Atomic-Liquors-Twilight1.jpg",
  })

  await conn("galleries").insert({
    venue_id: 17,
    image:
      "https://media.lasvegasweekly.com/img/photos/2020/10/28/1029_FoodDrink2_Nevad-Brew-Works_Credit_Christopher-DeVargas_Staff_t1000.jpg?c76bf34eada957f64a0b14990027a576ff9bf379",
  })

  await conn("galleries").insert({
    venue_id: 18,
    image:
      "https://img1.wsimg.com/isteam/ip/50965b5b-baf0-4de5-81f7-1cc9ffa0792f/ReBar%20(32%20of%2051)-0001.jpg/:/rs=w:1300,h:800",
  })

  await conn("galleries").insert({
    venue_id: 19,
    image:
      "https://cdn.vox-cdn.com/thumbor/mOHsi3jh9nZJNjcGw7V-77HtXEA=/0x0:5796x3870/1200x675/filters:focal(2435x1472:3361x2398)/cdn.vox-cdn.com/uploads/chorus_image/image/65287834/Victa_CRAFTHAUS_WIDE_SHOT_Top.0.jpg",
  })

  await conn("galleries").insert({
    venue_id: 20,
    image:
      "https://cdn.usarestaurants.info/assets/uploads/4a634f39a89e9ebc5b5722263a8a8a39_-united-states-nevada-clark-county-las-vegas-jammyland-cocktail-bar-reggae-kitchen-702-800-9098htm.jpg",
  })

  await conn("galleries").insert({
    venue_id: 21,
    image:
      "https://cdn.vox-cdn.com/thumbor/qpdgZ4FprigPdA97zMeKnuhSki4=/0x0:1500x838/1200x800/filters:focal(630x299:870x539)/cdn.vox-cdn.com/uploads/chorus_image/image/65310784/Garagiste.0.jpg",
  })

  await conn("galleries").insert({
    venue_id: 22,
    image:
      "https://cdn.usarestaurants.info/assets/uploads/0e7518c24067a061cd0a5509440eb1fe_-united-states-nevada-clark-county-las-vegas-banger-brewing-702-456-2739htm.jpg",
  })

  await conn("galleries").insert({
    venue_id: 23,
    image:
      "https://bunkhousedowntown.com/wp-content/uploads/2019/05/SocialShare-Bunkhouse1200630.jpg",
  })

  await conn("galleries").insert({
    venue_id: 24,
    image:
      "https://media.lasvegasweekly.com/img/photos/2017/04/05/0406_Intersection_TheNerd.jpg",
  })

  await conn("galleries").insert({
    venue_id: 25,
    image:
      "https://thingstodoinlasvegas.com/wp-content/uploads/2016/10/Artifice_nightlife.jpg",
  })

  await conn("galleries").insert({
    venue_id: 26,
    image:
      "https://media.lasvegasweekly.com/img/photos/2009/09/30/scaled.dinos_by_clay_heximer_01.jpg",
  })

  await conn("galleries").insert({
    venue_id: 27,
    image:
      "https://i.pinimg.com/originals/d9/1b/03/d91b03f8955c140a26eef6667e75fd30.jpg",
  })

  await conn("galleries").insert({
    venue_id: 28,
    image:
      "https://media.lasvegasweekly.com/img/photos/2012/09/12/neonopolis_by_steve_marcus.jpg",
  })

  await conn("galleries").insert({
    venue_id: 29,
    image:
      "https://i.ytimg.com/vi/Lbcvb6sUeE4/maxresdefault.jpg",
  })

  await conn("galleries").insert({
    venue_id: 30,
    image:
      "https://themobmuseum.org/wp-content/themes/newmob/assets/insidethemuseum.jpg",
  })

  await conn("galleries").insert({
    venue_id: 31,
    image:
      "https://asuevents.asu.edu/sites/default/files/styles/asu_event_image/public/neonmus1.jpg?itok=iiezF4In",
  })

  await conn("galleries").insert({
    venue_id: 32,
    image:
      "https://images.squarespace-cdn.com/content/v1/5dcd930ca512176033fed49d/1603141280749-31R3ZYK2MIP0HI6HGGSR/ke17ZwdGBToddI8pDm48kB6N0s8PWtX2k_eW8krg04V7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UUPKOmO-J47BDGPeAjKBgw7xgmaTgorvVRLpehS4Q8s3pC969RuPXvt2ZwyzUXQf7Q/POUR+GIFT+CARD+FINAL.png?format=1000w",
  })

  await conn("galleries").insert({
    venue_id: 33,
    image:
      "https://i.pinimg.com/originals/ea/2c/9b/ea2c9b9f34230dea55b7737e70e358ac.png",
  })

  await conn("galleries").insert({
    venue_id: 34,
    image:
      "https://nevadamagazine.com/wp-content/uploads/PP10.jpg",
  })

  await conn("galleries").insert({
    venue_id: 35,
    image:
      "https://www.reviewjournal.com/wp-content/uploads/2018/06/10743989_web1_PAWN-STAR-MEMORIAL-JUN26-18bt03.jpg?crop=1",
  })

  await conn("galleries").insert({
    venue_id: 36,
    image:
      "https://findgeekspots.com/wp-content/uploads/2018/12/Zak-Bagans%E2%80%99-The-Haunted-Museum.jpg",
  })

  await conn("galleries").insert({
    venue_id: 37,
    image:
      "https://lh3.googleusercontent.com/proxy/Cl2_tjKM2kR-tEaOA-Ac7UC_l--vgjupLKazNey2-2H2nGP0pxZYgdnvjNFCCjghcmnsPKXkYyD0g1iySdVbLiyvj9_APq8yjRnc9c_RD9Hjxtu9Rki-UhYkBrRgLXhiWYzuMbYkrNTx",
  })

  await conn("galleries").insert({
    venue_id: 38,
    image:
      "https://www.casino.org/news/wp-content/uploads/2018/03/rawImage-2.jpg",
  })

  await conn("galleries").insert({
    venue_id: 39,
    image:
      "https://i1.wp.com/wanderlustyle.com/wp-content/uploads/2016/09/48539620221_f2f4f36cdd_k.jpg?fit=2048%2C1365&ssl=1",
  })

  await conn("galleries").insert({
    venue_id: 40,
    image:
      "https://1pg6x1158j2c3wpy0512zgcs-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/viva-vision-flower@2x.jpg",
  })

  await conn("galleries").insert({
    venue_id: 41,
    image:
      "https://miro.medium.com/max/2000/1*Ca88KGqNZUpd1orpL6Xo1g.jpeg",
  })

  await conn("galleries").insert({
    venue_id: 42,
    image:
      "https://pbs.twimg.com/media/DevNRZ1UcAAP1KI.jpg",
  })

  await conn("galleries").insert({
    venue_id: 43,
    image:
      "https://cannabition-staging.firebaseapp.com/images/jpg/harvest-4.jpg",
  })

  await conn("galleries").insert({
    venue_id: 44,
    image:
      "https://images.squarespace-cdn.com/content/v1/56cf54142fe1312f24f8f04d/1458231806566-F5GO4UM3T2XSDL9YVPPS/ke17ZwdGBToddI8pDm48kFmKdAJFcOk5fsAfzma6oat7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0ro8siOxa7KOjEXaZRk24Q56mUDAg7BAm91VGqgkLdX3NOdT9hRlG3rX4NNR3uCrgw/bigrigjig_01.jpg?format=1500w",
  })

  await conn("galleries").insert({
    venue_id: 45,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMvFdsg662-ZqqhteXMYjNXkUoRbIkFssGBcVo-=s1600-w1600",
  })

  await conn("galleries").insert({
    venue_id: 46,
    image:
      "https://travelnevada.com/wp-content/uploads/2020/04/original-vintagevegas9-sm.jpg",
  })

  await conn("galleries").insert({
    venue_id: 47,
    image:
      "https://modtraveler.net/wp-content/uploads/2015/06/IMG_1257.jpg",
  })

  await conn("galleries").insert({
    venue_id: 48,
    image:
      "https://sawebfilesprod001.blob.core.windows.net/images/18b.jpg?sv=2017-04-17&sr=b&si=DNNFileManagerPolicy&sig=VwnDYOp4jLQDrt3QZcEp46hfmoB5QReSw%2B8Yt2ph8kE%3D",
  })
  await conn("galleries").insert({
    venue_id: 49,
    image:
      "https://i.pinimg.com/originals/21/e7/8a/21e78a4059c852713cb16af2b8754595.jpg",
  })

  await conn("galleries").insert({
    venue_id: 50,
    image:
      "https://www.factoryofdreams.com/galeria/big/3.jpg",
  })

  await conn("galleries").insert({
    venue_id: 51,
    image:
      "https://2ab9pu2w8o9xpg6w26xnz04d-wpengine.netdna-ssl.com/wp-content/uploads/2017/09/bender-jamboree-2018-glory-1480x832.jpg",
  })

  await conn.schema.createTable(`recommendations`, (table) => {
    table.increments("id")
    table.string("name", 50)
    table.string("email", 50)
    table.string("desc", 255)
  })

  process.exit()
}



main()
