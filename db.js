const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function setUp() {
   const db = await sqlite.open({
      filename: "mydb.sqlite3",
      driver: sqlite3.Database
   });

   await db.migrate({ force: true });

   const faq = await db.all(`select * from FAQ ORDER BY createDate DESC`);
   console.log(`ALL faq TABLE`, JSON.stringify(faq, null, 2));

   const car = await db.all(`select * from Car`);
   console.log(`ALL faq TABLE`, JSON.stringify(car, null, 2));
};

setUp();