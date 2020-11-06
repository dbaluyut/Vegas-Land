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
    table.foreign("venue_id").references("venues.id")
    table.integer("label_id").unsigned()
    table.foreign("label_id").references("labels.id")
  })

  await conn.schema.createTable(`happy_hr`, (table) => {
    table.increments("id")
    table.integer("venue_id").unsigned()
    table.foreign("venue_id").references("venues.id")
    table.integer("happy_hr_start", 255)
    table.integer("happy_hr_stop", 255)
    table.integer("day")
  })

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
    desc: " The original Goodwich was created in an 8’ x 12’ kiosk in the parking lot of Dino’s, one of Las Vegas’ oldest dive bars. It was founded by two friends in 2014 that shared an undeniable passion for the restaurant industry. With the realization and combined years of experience, much of it in fine dining, they created a sandwich concept based on the foundation of great restaurant food; flavor, texture and balance. All of this between two slices of bread wasn’t good enough for them. It had to be Stacked-rite so every bite of their sandwiches had the same tasty qualities. It was and still is their dream to show each and every guest their passion for great food that brought them together to create the Goodwich.",
    location_id: 1,
    type: "restaurant",
    link: "https://thegoodwich.com/",
  })

  await conn("venues").insert({
    title: "Esther's Kitchen",
    desc: "Esther's Kitchen is a seasonal Farm to Table Italian Restaurant located in the Las Vegas Arts District. They serve fresh Pasta, Pizzas, Vegetables, Proteins, Wine, Beer, Cocktails. Lunch, Dinner and Brunch.",
    location_id: 2,
    type: "restaurant",
    link: "https://www.estherslv.com/",
  })

  await conn("venues").insert({
    title: "Cornish Pasty Co.",
    desc: "The Cornish pasty (pronounced “pastee”) is a nourishing, and cleverly devised, handheld meal, its heritage is closely associated with the miners from the Cornwall, the rugged peninsula in the south west of England. The Cornish Pasty Company serves a quality meal, made from scratch and prepared with the freshest of ingredients in a unpretentious unique warehouse in the Arts District. Our restaurant is a welcoming place to drop in with friends, grab a pint of local beer, shoot some pool and, maybe if they are really good friends, share a bite of your Cornish pasty!",
    location_id: 3,
    type: "restaurant",
    link: "https://www.cornishpastyco.com/",
  })

  await conn("venues").insert({
    title: "Makers & Finders Coffee",
    desc: "Makers & Finders is a vibrant, upbeat restaurant-coffee-bar where specialty coffee, inspired Latin food, & hospitality are the program pillars. The setting is brightly lit with unique murals & positive affirmations throughout the lively space that attracts a large fan base. The full service experience transforms a coffee shop into a bustling café. Coffee can be handcrafted during dine-in or to-go, depending on the visit. All syrups are handmade by trained baristas making it the most unique specialty latte menu in Las Vegas. Communal connections, co-working & networking are strongly encouraged.",
    location_id: 4,
    type: "restaurant",
    link: "https://www.makerslv.com/",
  })

  await conn("venues").insert({
    title: "Carson Kitchen",
    desc: "Specializing in creative American cuisine and thoughtfully crafted cocktails, Carson Kitchen is a cornerstone of the Downtown Las Vegas dining scene. Carson Kitchen is built on a philosophy of reimagined comfort food prepared with approachable fine-dining ingredients. The restaurant opened in 2014, a partnership between chef and restaurateur Cory Harwell and his dear friend, the late Chef Kerry Simon. Designed to bring a carefully curated experience to our unique neighborhood, Carson Kitchen features a contemporary bar, open kitchen expo counter, community tables, and an outdoor rooftop and bar. Guests can also take in a cocktail and relax in the courtyard of our home in the repurposed mid-century John E. Carson Hotel.",
    location_id: 5,
    type: "restaurant",
    link: "https://www.carsonkitchen.com/las/index.html",
  })

  await conn("venues").insert({
    title: "eat.",
    desc: "The most hotly-anticipated new eatery in downtown Las Vegas, eat is the culinary brainchild of professional chef, Natalie Young. With 20+ years experience under her toque, Chef Natalie is delighted to bring the skills she honed pleasing the palates of top chefs, critics and other discerning foodies home to her friends and neighbors.Located at the corner of Carson and 7th Streets, eat is perfectly poised to serve downtown’s business and residential communities, as well as adventurous suburbanites, tourists and any and all hungry people. What will “Downtown’s New Comfort-Cuisine Queen” be cookin’ up? Check the menu.",
    location_id: 6,
    type: "restaurant",
    link: "https://eatdtlv.chefnatalieyoung.com/",
  })

  await conn("venues").insert({
    title: "Le Thai",
    desc: "Established in late 2011, Le That offers a full-service restaurant with a causal and fun atmosphere in the heart of downtown Las Vegas. Enjoy a classic Thai dish, or a fusion of a Chef Dan’s own creation, before or after bar hopping on the famous Fremont Street. Le Thai showcases Chef Dan Coughlin’s famous 3 color curry (a blend of red, yellow and green curry’s), homemade Thai noodle soup and our always fresh signature Waterfall Sauce. Le Thai also offers a daily-weekly special board along with a traditional Thai menu inspired by Dan’s Thailand-born mom and grandma.",
    location_id: 7,
    type: "restaurant",
    link: "https://lethaivegas.com/",
  })

  await conn("venues").insert({
    title: "PublicUs",
    desc: "PublicUs (pūb-li-cus) is a canteen-style, neighborhood restaurant and coffee bar located in the Fremont East District of Downtown Las Vegas. Featuring an award winning coffee program as well as a seasonal food program utilizing local and / or organic produce where possible. They also have homemade bread, pastries and desserts.",
    location_id: 8,
    type: "restaurant",
    link: "http://www.publicuslv.com/",
  })

  await conn("venues").insert({
    title: "D E Thai Kitchen",
    desc: " A  new Thai restaurant inspired by traditional flavors of Thailand’s best food from around the country. Our chef and owner was born in Bangkok, but his father was from Trang ( southern Thailand close by Phuket ).",
    location_id: 9,
    type: "restaurant",
    link: "https://www.dethaikitchen.com/",
  })

  await conn("venues").insert({
    title: "Vesta Coffee Roasters",
    desc: "Vesta Coffee Roasters started out of necessity.  A love... nay, passion for coffee, and the drive to share something great with the local community.  They strive to provide the finest quality, not because it's something that will make them successful, but because it's the right thing to do. At Vesta Coffee Roasters, they strive to source beautiful specialty coffees from around the world.  Highlighting exceptional producers, while working with trusted exporters, importers, and sometimes, the farmers directly.  All of their traceable, fresh-crop coffees are roasted to their individual \"sweet spot\" aiming to highlight the rewards of hard work, terroir, and processing that make each coffee unique.  They can't wait to share these coffees with you!",
    location_id: 10,
    type: "restaurant",
    link: "https://vestacoffee.com/",
  })

  await conn("venues").insert({
    title: "7th & Carson",
    desc: "7th and Carson's menu consists of simple, approachable ingredients combined to create fun flavors in an assortment of shareable plates. Guests are invited to come in for a few pints or a cocktail, have a few great plates and enjoy the neighborhood vibe. Open now and located at its namesake crossroads, 7th and Carson Downtown Kitchen and Bar brings new life to DTLV!",
    location_id: 11,
    type: "restaurant",
    link: "https://www.7thandcarson.com/",
  })

  await conn("venues").insert({
    title: "Pizza Rock",
    desc: "Taking pizza to the next level, Pizza Rock was born from the creative minds of three best friends: George Karpaty, Tony Gemignani, and Trevor Hewitt. Additionally, a selection of pastas, calzones, Stromboli, antipasti and salads are offered, all with a focus on authentic Italian ingredients and organically-grown produce. All fresh pasta is made on-premises, as is the Sicilian and Calabrese link and bulk sausages. Pizza Rock also offers an array of New York slices, calzones, strombolis, meatball subs, perfect for a quick, convenient bite on the way to work, from a bar, or just enjoyed while strolling the streets of downtown Las Vegas. Pizza Rock’s full bar focuses on hand-crafted artisan cocktails, an extensive draft and bottled beer list and a collection of wines with a focus on California and Italy. An Acoustic Sunday Brunch will feature specialty breakfast pizzas but also a twist on classics like meatball hash and eggs, eggs Benedict with pancetta and French toast made with focaccia bread.",
    location_id: 12,
    type: "restaurant",
    link: "https://pizzarocklasvegas.com/",
  })

  await conn("venues").insert({
    title: "MTO Café",
    desc: "Think classic breakfast, lunch, brunch and dinner favorites - but better. MTO Café is serving up comfort food made from fresh, quality ingredients in the heart of downtown Las Vegas and the newly opened Downtown Summerlin. Focusing on high-quality, local and seasonal ingredients, MTO is always fresh and made to order.",
    location_id: 13,
    type: "restaurant",
    link: "https://mtocafe.com/",
  })

  //BARS

  await conn("venues").insert({
    title: "Velveteen Rabbit",
    desc: "Velveteen Rabbit is a craft cocktail and beer bar situated in the heart of the Arts District. Each seasonal cocktail menu is the product of innovation, creativity, and care, boasting of fresh produce and house-made ingredients. They offer a range of specialty beers with a rotating selection of twelve taps, as well as 18-20 bottled beers. Their eclectic space features local art, boutique spirits, vintage furniture, and a magical pink outdoor patio.  The intimacy of the space allows for celebrations of all kinds, including wedding receptions! Contact them to reserve a date.",
    location_id: 14,
    type: "bar",
    link: "https://velveteenrabbitlv.com/",
  })

  await conn("venues").insert({
    title: "Hop Nuts Brewing",
    desc: "Established in 2013, Hop Nuts Brewing provides a craft beer experience in a relaxed atmosphere. Hop Nuts Brewing is a brewery with a full bar located in the Arts District in Downtown Las Vegas. They have 20 beers on tap! 15 of them are brewed in house with 5 guest taps. They specialize in brewing unique craft beers especially IPA's",
    location_id: 15,
    type: "bar",
    link: "http://www.hopnutsbrewing.com/",
  })

  await conn("venues").insert({
    title: "Atomic Liquors",
    desc: "Atomic Liquors is the oldest free standing bar in Las Vegas, obtaining the #7 liquor license in the city (the six prior being all casinos). Originally founded by Joe & Stella Sobchik in 1952, it was named for a time when customers watched atomic blasts from the roof. Like much of old-time Vegas, Atomic has showbiz in its veins - The Rat Pack and the Smothers Brothers drank here after their nightly shows, and Barbra Streisand even had her own seat, which has been restored and is on display. History, atmosphere, free parking and great drinks.",
    location_id: 16,
    type: "bar",
    link: "http://atomic.vegas/",
  })

  await conn("venues").insert({
    title: "Nevada Brew Works",
    desc: "At Nevada Brew Works, we believe everything starts with great beer. Our brewers have years of experience and are expertly trained at the World Famous Siebel Institute of Technology. The result is creative, great tasting beers to enjoy with friends.",
    location_id: 17,
    type: "bar",
    link: "https://nevadabrewworks.com/",
  })

  await conn("venues").insert({
    title: "ReBAR",
    desc: "ReBAR was named 10 Best Bars in Las Vegas by USA Today, voted Best Downtown Hangout by Las Vegas Weekly and recognized as Cheap Eats 2017 by Vegas Seven Magazine for it's gourmet sausages and vegan kielbasas. ReBAR has a full bar which doubles as an Antique Store and is the only bar of it's kind - where everything's for sale! - Literally everything, the glass you're drinking out of, the stool you're sitting on, or the tchotchkes you're looking at on the wall can all go home with you for a thrift store price. Enjoy ReBAR's Award Winning Vegan Kielbasas, Gourmet Hot Dogs and Sausage Pretzel Dogs which were featured on Diners, Drive-Ins and Dives with Guy Fieri - or simply imbibe with one of ReBAR's Charitable Cocktails which raise money for local non-profits with every purchase. Enjoy a Downtown deal with $3 Draft Beers, $4 Well Drinks or $4 White Wines all night long, as you shop all the way up until last call.",
    location_id: 18,
    type: "bar",
    link: "https://rebarlv.com/",
  })

  await conn("venues").insert({
    title: "CraftHaus Brewery",
    desc: "They specialize in brewing craft beer that is of the highest quality for our community. Welcoming tourists and residents is our pleasure. We feature 24 taps of our beers, guest beers, cold brew, cider and wine. Established in 2014. CraftHaus Brewery is passionate about building a community around quality driven beers. Owners, Wyndee and Dave Forrest successfully changed licensing for the city of Henderson and Las Vegas to a more craft friendly license. Named Favorite Local Brewery, Reader's Choice, Las Vegas Weekly 2018 and Best of Winner 2015, 2016 and 2017. Winner, Top 100 Businesses Coast to Coast, Yelp! Nevada's Greenest Brewery 2018 and Best Family Owned Business, Nevada Entrepreneur Magazine 2016.",
    location_id: 19,
    type: "bar",
    link: "https://www.crafthausbrewery.com/home",
  })

  await conn("venues").insert({
    title: "Jammyland Cocktail Bar & Reggae Kitchen",
    desc: "Jammyland Cocktail Bar & Reggae Kitchen is proud to join the LV cocktail scene, offering refined drinks in a shanty chic converted garage with dual patios in the heart of Antique Alley. Established in 2018. Jammyland Cocktail Bar & Reggae Kitchen opened in Spring of 2018 in the downtown Las Vegas Arts District. We've got over 1500 cuts of ska, rocksteady, dancehall and more in multiple languages. We serve food all night, cocktails with fresh ingredients, good vibes and genuine hospitality.",
    location_id: 20,
    type: "bar",
    link: "https://jammy.land/",
  })

  await conn("venues").insert({
    title: "Garagiste Wine Room & Merchant",
    desc: "Garagiste Wine Room | Merchant began as an idea born of the mutual passion for wine of its two founders, Mario Enriquez and Eric Prato.  The goal of Garagiste Wine Room | Merchant is to be a leader in the evolution and growth of wine culture in Las Vegas.  Garagiste Wine Room | Merchant strives to provide world-wine experiences from grower-producers to the classics alike.  Guests are invited to enjoy, discuss and immerse themselves in the world of wine as seen through the eyes of professional Sommeliers.",
    location_id: 21,
    type: "bar",
    link: "http://garagistelv.com/",
  })

  await conn("venues").insert({
    title: "Banger Brewing",
    desc: "They are a Las Vegas microbrewery with a tasting room. We feature a 3.5 BBL brewhouse with 5 fermenters using the freshest ingredients to craft the finest beers while featuring other local breweries on tap.",
    location_id: 22,
    type: "bar",
    link: "http://bangerbrewing.com/",
  })

  await conn("venues").insert({
    title: "Bunkhouse Saloon",
    desc: "The Bunkhouse Saloon is a live music venue, bar, and restaurant in Downtown Las Vegas. Established in 1953, The Bunkhouse Saloon has earned a reputation as one of Vegas’ best places to see both established and emerging bands. Recently-renovated while maintaining the charm and personality of the original, Bunkhouse now features a state-of-the-art sound & lighting system as well as a brand-new stage.",
    location_id: 23,
    type: "bar",
    link: "https://bunkhousedowntown.com/",
  })

  await conn("venues").insert({
    title: "The NERD",
    desc: "Comic-con meets bar & nightclub. Modern bar with comic book–centric decor, plus free bowling lanes, billiard tables & video games.",
    location_id: 24,
    type: "bar",
    link: "https://thenerd.com/",
  })

  await conn("venues").insert({
    title: "Artifice",
    desc: "The longest standing bar & lounge in the las vegas arts district, Artifice is home to First Friday, Scarlet Deepest Red Goth Night, Soul State, Darker, and many other diverse and inclusive community events.",
    location_id: 25,
    type: "bar",
    link: "https://www.artificebarlv.com/",
  })

  await conn("venues").insert({
    title: "Dino's Lounge",
    desc: "Dino'\s is one of Vegas' oldest dive bars. It is smoky, it's not fancy, but it's a whole lot of fun. This is a place where the bartenders vote on a \"Drunk of the Month\" from amongst their regulars. The bar is a Vegas institution and has always been a family business. Purchased in 1960 by Dean \"Dino\" Bartolo, the neighborhood bar and liquor store was originally called Ringside Liquors (named for the boxing murals on the ceiling), but after becoming a popular local hangout, the bar was renamed \"Dino's Lounge\" after its owner.The clientele and staff became a sort-of extended family, starting traditions like the weekly \"99\" card game on Friday nights. Dino's son Chuck took over the business when he advanced in age, and after Chuck died a few years ago, his daughter Kristin took over the reins. After more than 40 years, Dino's still considers its regulars family, and keeps drawing new generations of visitors to the downtown bar. The monthly First Friday block party held in the nearby Arts District brings the valley's hipsters into the bar to check out hot bands and Dino's packs 'em in for its legendary karaoke nights with Danny G. Some things never change. And downtown Las Vegas is far better for it.",
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
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 2,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 3,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 4,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 5,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 6,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 7,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 8,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 9,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 10,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 11,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 12,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 13,
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80",
  })

  await conn("galleries").insert({
    venue_id: 14,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 15,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 16,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 17,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 18,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 19,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 20,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 21,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 22,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 23,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 24,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 25,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 26,
    image:
      "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80",
  })

  await conn("galleries").insert({
    venue_id: 27,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 28,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 29,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2304&q=80",
  })

  await conn("galleries").insert({
    venue_id: 30,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 31,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 32,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 33,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 34,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 35,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2304&q=80",
  })

  await conn("galleries").insert({
    venue_id: 36,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 37,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2304&q=80",
  })

  await conn("galleries").insert({
    venue_id: 38,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 39,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 40,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 41,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 42,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 43,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 44,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 45,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 46,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2304&q=80",
  })

  await conn("galleries").insert({
    venue_id: 47,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2304&q=80",
  })

  await conn("galleries").insert({
    venue_id: 48,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })
  await conn("galleries").insert({
    venue_id: 49,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 50,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
  })

  await conn("galleries").insert({
    venue_id: 51,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
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
