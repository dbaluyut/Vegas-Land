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
    lat: 36.15765,
    lng: -115.1527,
  })

  await conn("locations").insert({
    street_1: "10 E Charleston Blvd",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.15848,
    lng: -115.15291,
  })

  await conn("locations").insert({
    street_1: "1120 S Main St",
    street_2: "Suite 110",
    city: "Las Vegas",
    state: "NV",
    zip: "89104",
    lat: 36.70112,
    lng: -86.57219,
  })

  await conn("locations").insert({
    street_1: "124 S 6th St",
    street_2: "#100",
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 44.01603,
    lng: -107.96153,
  })

  await conn("locations").insert({
    street_1: "707 E Carson Ave",
    street_2: null,
    city: "Las Vegas",
    state: "NV",
    zip: "89101",
    lat: 36.16672,
    lng: -115.13894,
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
    desc:
      " The original Goodwich was created in an 8’ x 12’ kiosk in the parking lot of Dino’s, one of Las Vegas’ oldest dive bars. It was founded by two friends in 2014 that shared an undeniable passion for the restaurant industry. With the realization and combined years of experience, much of it in fine dining, they created a sandwich concept based on the foundation of great restaurant food; flavor, texture and balance. All of this between two slices of bread wasn’t good enough for them. It had to be Stacked-rite so every bite of their sandwiches had the same tasty qualities. It was and still is their dream to show each and every guest their passion for great food that brought them together to create the Goodwich.",
    location_id: 1,
    type: "restaurant",
    link: "https://thegoodwich.com/",
  })

  await conn("venues").insert({
    title: "Esther's Kitchen",
    desc:
      "Esther's Kitchen is a seasonal Farm to Table Italian Restaurant located in the Las Vegas Arts District. They serve fresh Pasta, Pizzas, Vegetables, Proteins, Wine, Beer, Cocktails. Lunch, Dinner and Brunch.",
    location_id: 2,
    type: "restaurant",
    link: "https://www.estherslv.com/",
  })

  await conn("venues").insert({
    title: "Cornish Pasty Co.",
    desc:
      "The Cornish pasty (pronounced “pastee”) is a nourishing, and cleverly devised, handheld meal, its heritage is closely associated with the miners from the Cornwall, the rugged peninsula in the south west of England. The Cornish Pasty Company serves a quality meal, made from scratch and prepared with the freshest of ingredients in a unpretentious unique warehouse in the Arts District. Our restaurant is a welcoming place to drop in with friends, grab a pint of local beer, shoot some pool and, maybe if they are really good friends, share a bite of your Cornish pasty!",
    location_id: 3,
    type: "restaurant",
    link: "https://www.cornishpastyco.com/",
  })

  await conn("venues").insert({
    title: "Makers & Finders Coffee",
    desc:
      "Makers & Finders is a vibrant, upbeat restaurant-coffee-bar where specialty coffee, inspired Latin food, & hospitality are the program pillars. The setting is brightly lit with unique murals & positive affirmations throughout the lively space that attracts a large fan base. The full service experience transforms a coffee shop into a bustling café. Coffee can be handcrafted during dine-in or to-go, depending on the visit. All syrups are handmade by trained baristas making it the most unique specialty latte menu in Las Vegas. Communal connections, co-working & networking are strongly encouraged.",
    location_id: 4,
    type: "restaurant",
    link: "https://www.makerslv.com/",
  })

  await conn("venues").insert({
    title: "Carson Kitchen",
    desc:
      "Specializing in creative American cuisine and thoughtfully crafted cocktails, Carson Kitchen is a cornerstone of the Downtown Las Vegas dining scene. Carson Kitchen is built on a philosophy of reimagined comfort food prepared with approachable fine-dining ingredients. The restaurant opened in 2014, a partnership between chef and restaurateur Cory Harwell and his dear friend, the late Chef Kerry Simon. Designed to bring a carefully curated experience to our unique neighborhood, Carson Kitchen features a contemporary bar, open kitchen expo counter, community tables, and an outdoor rooftop and bar. Guests can also take in a cocktail and relax in the courtyard of our home in the repurposed mid-century John E. Carson Hotel.",
    location_id: 5,
    type: "restaurant",
    link: "https://www.carsonkitchen.com/las/index.html",
  })

  await conn("venues").insert({
    title: "eat.",
    desc:
      "The most hotly-anticipated new eatery in downtown Las Vegas, eat is the culinary brainchild of professional chef, Natalie Young. With 20+ years experience under her toque, Chef Natalie is delighted to bring the skills she honed pleasing the palates of top chefs, critics and other discerning foodies home to her friends and neighbors.Located at the corner of Carson and 7th Streets, eat is perfectly poised to serve downtown’s business and residential communities, as well as adventurous suburbanites, tourists and any and all hungry people. What will “Downtown’s New Comfort-Cuisine Queen” be cookin’ up? Check the menu.",
    location_id: 6,
    type: "restaurant",
    link: "https://eatdtlv.chefnatalieyoung.com/",
  })

  await conn("venues").insert({
    title: "Le Thai",
    desc:
      "Established in late 2011, Le That offers a full-service restaurant with a causal and fun atmosphere in the heart of downtown Las Vegas. Enjoy a classic Thai dish, or a fusion of a Chef Dan’s own creation, before or after bar hopping on the famous Fremont Street. Le Thai showcases Chef Dan Coughlin’s famous 3 color curry (a blend of red, yellow and green curry’s), homemade Thai noodle soup and our always fresh signature Waterfall Sauce. Le Thai also offers a daily-weekly special board along with a traditional Thai menu inspired by Dan’s Thailand-born mom and grandma.",
    location_id: 7,
    type: "restaurant",
    link: "https://lethaivegas.com/",
  })

  await conn("venues").insert({
    title: "PublicUs",
    desc:
      "PublicUs (pūb-li-cus) is a canteen-style, neighborhood restaurant and coffee bar located in the Fremont East District of Downtown Las Vegas. Featuring an award winning coffee program as well as a seasonal food program utilizing local and / or organic produce where possible. They also have homemade bread, pastries and desserts.",
    location_id: 8,
    type: "restaurant",
    link: "http://www.publicuslv.com/",
  })

  await conn("venues").insert({
    title: "D E Thai Kitchen",
    desc:
      " A  new Thai restaurant inspired by traditional flavors of Thailand’s best food from around the country. Our chef and owner was born in Bangkok, but his father was from Trang ( southern Thailand close by Phuket ).",
    location_id: 9,
    type: "restaurant",
    link: "https://www.dethaikitchen.com/",
  })

  await conn("venues").insert({
    title: "Vesta Coffee Roasters",
    desc:
      "Vesta Coffee Roasters started out of necessity.  A love... nay, passion for coffee, and the drive to share something great with the local community.  They strive to provide the finest quality, not because it's something that will make them successful, but because it's the right thing to do. At Vesta Coffee Roasters, they strive to source beautiful specialty coffees from around the world.  Highlighting exceptional producers, while working with trusted exporters, importers, and sometimes, the farmers directly.  All of their traceable, fresh-crop coffees are roasted to their individual \"sweet spot\" aiming to highlight the rewards of hard work, terroir, and processing that make each coffee unique.  They can't wait to share these coffees with you!",
    location_id: 10,
    type: "restaurant",
    link: "https://vestacoffee.com/",
  })

  await conn("venues").insert({
    title: "7th & Carson",
    desc:
      "7th and Carson's menu consists of simple, approachable ingredients combined to create fun flavors in an assortment of shareable plates. Guests are invited to come in for a few pints or a cocktail, have a few great plates and enjoy the neighborhood vibe. Open now and located at its namesake crossroads, 7th and Carson Downtown Kitchen and Bar brings new life to DTLV!",
    location_id: 11,
    type: "restaurant",
    link: "https://www.7thandcarson.com/",
  })

  await conn("venues").insert({
    title: "Pizza Rock",
    desc:
      "Taking pizza to the next level, Pizza Rock was born from the creative minds of three best friends: George Karpaty, Tony Gemignani, and Trevor Hewitt. Additionally, a selection of pastas, calzones, Stromboli, antipasti and salads are offered, all with a focus on authentic Italian ingredients and organically-grown produce. All fresh pasta is made on-premises, as is the Sicilian and Calabrese link and bulk sausages. Pizza Rock also offers an array of New York slices, calzones, strombolis, meatball subs, perfect for a quick, convenient bite on the way to work, from a bar, or just enjoyed while strolling the streets of downtown Las Vegas. Pizza Rock’s full bar focuses on hand-crafted artisan cocktails, an extensive draft and bottled beer list and a collection of wines with a focus on California and Italy. An Acoustic Sunday Brunch will feature specialty breakfast pizzas but also a twist on classics like meatball hash and eggs, eggs Benedict with pancetta and French toast made with focaccia bread.",
    location_id: 12,
    type: "restaurant",
    link: "https://pizzarocklasvegas.com/",
  })

  await conn("venues").insert({
    title: "MTO Café",
    desc:
      "Think classic breakfast, lunch, brunch and dinner favorites - but better. MTO Café is serving up comfort food made from fresh, quality ingredients in the heart of downtown Las Vegas and the newly opened Downtown Summerlin. Focusing on high-quality, local and seasonal ingredients, MTO is always fresh and made to order.",
    location_id: 13,
    type: "restaurant",
    link: "https://mtocafe.com/",
  })

  //BARS

  await conn("venues").insert({
    title: "Velveteen Rabbit",
    desc:
      "Velveteen Rabbit is a craft cocktail and beer bar situated in the heart of the Arts District. Each seasonal cocktail menu is the product of innovation, creativity, and care, boasting of fresh produce and house-made ingredients. They offer a range of specialty beers with a rotating selection of twelve taps, as well as 18-20 bottled beers. Their eclectic space features local art, boutique spirits, vintage furniture, and a magical pink outdoor patio.  The intimacy of the space allows for celebrations of all kinds, including wedding receptions! Contact them to reserve a date.",
    location_id: 14,
    type: "bar",
    link: "https://velveteenrabbitlv.com/",
  })

  await conn("venues").insert({
    title: "Hop Nuts Brewing",
    desc:
      "Established in 2013, Hop Nuts Brewing provides a craft beer experience in a relaxed atmosphere. Hop Nuts Brewing is a brewery with a full bar located in the Arts District in Downtown Las Vegas. They have 20 beers on tap! 15 of them are brewed in house with 5 guest taps. They specialize in brewing unique craft beers especially IPA's",
    location_id: 15,
    type: "bar",
    link: "http://www.hopnutsbrewing.com/",
  })

  await conn("venues").insert({
    title: "Atomic Liquors",
    desc:
      "Atomic Liquors is the oldest free standing bar in Las Vegas, obtaining the #7 liquor license in the city (the six prior being all casinos). Originally founded by Joe & Stella Sobchik in 1952, it was named for a time when customers watched atomic blasts from the roof. Like much of old-time Vegas, Atomic has showbiz in its veins - The Rat Pack and the Smothers Brothers drank here after their nightly shows, and Barbra Streisand even had her own seat, which has been restored and is on display. History, atmosphere, free parking and great drinks.",
    location_id: 16,
    type: "bar",
    link: "http://atomic.vegas/",
  })

  await conn("venues").insert({
    title: "Nevada Brew Works",
    desc:
      "At Nevada Brew Works, we believe everything starts with great beer. Our brewers have years of experience and are expertly trained at the World Famous Siebel Institute of Technology. The result is creative, great tasting beers to enjoy with friends.",
    location_id: 17,
    type: "bar",
    link: "https://nevadabrewworks.com/",
  })

  await conn("venues").insert({
    title: "ReBAR",
    desc:
      "ReBAR was named 10 Best Bars in Las Vegas by USA Today, voted Best Downtown Hangout by Las Vegas Weekly and recognized as Cheap Eats 2017 by Vegas Seven Magazine for it's gourmet sausages and vegan kielbasas. ReBAR has a full bar which doubles as an Antique Store and is the only bar of it's kind - where everything's for sale! - Literally everything, the glass you're drinking out of, the stool you're sitting on, or the tchotchkes you're looking at on the wall can all go home with you for a thrift store price. Enjoy ReBAR's Award Winning Vegan Kielbasas, Gourmet Hot Dogs and Sausage Pretzel Dogs which were featured on Diners, Drive-Ins and Dives with Guy Fieri - or simply imbibe with one of ReBAR's Charitable Cocktails which raise money for local non-profits with every purchase. Enjoy a Downtown deal with $3 Draft Beers, $4 Well Drinks or $4 White Wines all night long, as you shop all the way up until last call.",
    location_id: 18,
    type: "bar",
    link: "https://rebarlv.com/",
  })

  await conn("venues").insert({
    title: "CraftHaus Brewery",
    desc:
      "They specialize in brewing craft beer that is of the highest quality for our community. Welcoming tourists and residents is our pleasure. We feature 24 taps of our beers, guest beers, cold brew, cider and wine. Established in 2014. CraftHaus Brewery is passionate about building a community around quality driven beers. Owners, Wyndee and Dave Forrest successfully changed licensing for the city of Henderson and Las Vegas to a more craft friendly license. Named Favorite Local Brewery, Reader's Choice, Las Vegas Weekly 2018 and Best of Winner 2015, 2016 and 2017. Winner, Top 100 Businesses Coast to Coast, Yelp! Nevada's Greenest Brewery 2018 and Best Family Owned Business, Nevada Entrepreneur Magazine 2016.",
    location_id: 19,
    type: "bar",
    link: "https://www.crafthausbrewery.com/home",
  })

  await conn("venues").insert({
    title: "Jammyland Cocktail Bar & Reggae Kitchen",
    desc:
      "Jammyland Cocktail Bar & Reggae Kitchen is proud to join the LV cocktail scene, offering refined drinks in a shanty chic converted garage with dual patios in the heart of Antique Alley. Established in 2018. Jammyland Cocktail Bar & Reggae Kitchen opened in Spring of 2018 in the downtown Las Vegas Arts District. We've got over 1500 cuts of ska, rocksteady, dancehall and more in multiple languages. We serve food all night, cocktails with fresh ingredients, good vibes and genuine hospitality.",
    location_id: 20,
    type: "bar",
    link: "https://jammy.land/",
  })

  await conn("venues").insert({
    title: "Garagiste Wine Room & Merchant",
    desc:
      "Garagiste Wine Room | Merchant began as an idea born of the mutual passion for wine of its two founders, Mario Enriquez and Eric Prato.  The goal of Garagiste Wine Room | Merchant is to be a leader in the evolution and growth of wine culture in Las Vegas.  Garagiste Wine Room | Merchant strives to provide world-wine experiences from grower-producers to the classics alike.  Guests are invited to enjoy, discuss and immerse themselves in the world of wine as seen through the eyes of professional Sommeliers.",
    location_id: 21,
    type: "bar",
    link: "http://garagistelv.com/",
  })

  await conn("venues").insert({
    title: "Banger Brewing",
    desc:
      "They are a Las Vegas microbrewery with a tasting room. We feature a 3.5 BBL brewhouse with 5 fermenters using the freshest ingredients to craft the finest beers while featuring other local breweries on tap.",
    location_id: 22,
    type: "bar",
    link: "http://bangerbrewing.com/",
  })

  await conn("venues").insert({
    title: "Bunkhouse Saloon",
    desc:
      "The Bunkhouse Saloon is a live music venue, bar, and restaurant in Downtown Las Vegas. Established in 1953, The Bunkhouse Saloon has earned a reputation as one of Vegas’ best places to see both established and emerging bands. Recently-renovated while maintaining the charm and personality of the original, Bunkhouse now features a state-of-the-art sound & lighting system as well as a brand-new stage.",
    location_id: 23,
    type: "bar",
    link: "https://bunkhousedowntown.com/",
  })

  await conn("venues").insert({
    title: "The NERD",
    desc:
      "Comic-con meets bar & nightclub. Modern bar with comic book–centric decor, plus free bowling lanes, billiard tables & video games.",
    location_id: 24,
    type: "bar",
    link: "https://thenerd.com/",
  })

  await conn("venues").insert({
    title: "Artifice",
    desc:
      "The longest standing bar & lounge in the las vegas arts district, Artifice is home to First Friday, Scarlet Deepest Red Goth Night, Soul State, Darker, and many other diverse and inclusive community events.",
    location_id: 25,
    type: "bar",
    link: "https://www.artificebarlv.com/",
  })

  await conn("venues").insert({
    title: "Dino's Lounge",
    desc:
      "Dino's is one of Vegas' oldest dive bars. It is smoky, it's not fancy, but it's a whole lot of fun. This is a place where the bartenders vote on a \"Drunk of the Month\" from amongst their regulars. The bar is a Vegas institution and has always been a family business. Purchased in 1960 by Dean \"Dino\" Bartolo, the neighborhood bar and liquor store was originally called Ringside Liquors (named for the boxing murals on the ceiling), but after becoming a popular local hangout, the bar was renamed \"Dino's Lounge\" after its owner.The clientele and staff became a sort-of extended family, starting traditions like the weekly \"99\" card game on Friday nights. Dino's son Chuck took over the business when he advanced in age, and after Chuck died a few years ago, his daughter Kristin took over the reins. After more than 40 years, Dino's still considers its regulars family, and keeps drawing new generations of visitors to the downtown bar. The monthly First Friday block party held in the nearby Arts District brings the valley's hipsters into the bar to check out hot bands and Dino's packs 'em in for its legendary karaoke nights with Danny G. Some things never change. And downtown Las Vegas is far better for it.",
    location_id: 26,
    type: "bar",
    link: "https://www.facebook.com/DinosLV/",
  })

  // SHOPS AND EXPERIENCES INSERTS

  await conn("venues").insert({
    title: "Downtown Container Park",
    desc:
      "Downtown Container Park is an open-air shopping and entertainment venue featuring 38 unique retail shops, restaurants, and bars. Located in Las Vegas’ flourishing Downtown neighborhood, the innovative center is built from 43 repurposed shipping containers and 41 locally manufactured Xtreme cubes. Upon arrival, guests are greeted by a 35-foot-tall praying mantis sculpture that shoots flames from its antennae. After entering the park, guests discover a whimsical world of one-of-a-kind boutiques, restaurants, and bars. The park also includes a stage for presentations and live music performances, as well as The Treehouse, an interactive play area featuring a 33-foot-tall slide, NEOS play system, oversized foam building blocks and much more. Container Park is a 21+ facility after 9 p.m. daily.",
    location_id: 27,
    type: "experience",
    link: "https://downtowncontainerpark.com/",
  })

  await conn("venues").insert({
    title: "Neonopolis",
    desc:
      "The Neonopolis is a one-of-a-kind dining, entertainment, and shopping experience located in the heart of Downtown Las Vegas.  Featuring everything from axe-throwing to vibrant video-game nightlife, everyone can find something at the Neonopolis.",
    location_id: 28,
    type: "experience",
    link: "https://www.neonopolislv.com/",
  })

  await conn("venues").insert({
    title: "Toy Shack",
    desc:
      "Probably the only reason to visit Neonopolis (besides parking), The Toy Shack is where Jimmy Jiminez, a toy expert who makes frequent appearance on the History Channel’s Pawn Stars, actually works. The story carries everything from pristine collectibles to new-fangled toys, dolls, and action figures. Comic book nerds (and the people who love them) use the goods here for superhero cosplay parties; the country’s biggest collection of Hot Wheels is a big draw for those sorts of aficionados. Who says you can’t play with toys when you’re an adult? The Toy Shack is open Mondays through Saturdays from 11am until 10pm.",
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
    day: 5,
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
    happy_hr_start: 900,
    happy_hr_stop: 1900,
    day: 5,
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
    happy_hr_start: 900,
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
      "https://media.lasvegasweekly.com/img/photos/2015/01/27/Hop_Nuts_by_Steve_Marcus_2_t1000.jpg?c76bf34eada957f64a0b14990027a576ff9bf379",
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
      "https://static01.nyt.com/images/2019/02/17/travel/17vegas-arts-district2/merlin_149473734_1c764407-491d-419e-8ef7-dd1341274217-jumbo.jpg",
  })

  await conn("galleries").insert({
    venue_id: 19,
    image:
      "https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,g_center,h_610,q_75,w_814/https://lasvegas.simpleviewcrm.com/images/listings/original_crafthaus-brewery.jpg",
  })

  await conn("galleries").insert({
    venue_id: 20,
    image:
      "https://cdn.usarestaurants.info/assets/uploads/4a634f39a89e9ebc5b5722263a8a8a39_-united-states-nevada-clark-county-las-vegas-jammyland-cocktail-bar-reggae-kitchen-702-800-9098htm.jpg",
  })

  await conn("galleries").insert({
    venue_id: 21,
    image:
      "https://www.reviewjournal.com/wp-content/uploads/2020/08/14017554_web1_RJ-MAG-WINE-BAR_072420cs_010.jpg",
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
    image: "https://i.ytimg.com/vi/Lbcvb6sUeE4/maxresdefault.jpg",
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
    image: "https://nevadamagazine.com/wp-content/uploads/PP10.jpg",
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
    image: "https://miro.medium.com/max/2000/1*Ca88KGqNZUpd1orpL6Xo1g.jpeg",
  })

  await conn("galleries").insert({
    venue_id: 42,
    image: "https://pbs.twimg.com/media/DevNRZ1UcAAP1KI.jpg",
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
    image: "https://modtraveler.net/wp-content/uploads/2015/06/IMG_1257.jpg",
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
    image: "https://www.factoryofdreams.com/galeria/big/3.jpg",
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
