// seed.js
import sequelize from "../src/config/database.js";
import Artist from "../src/models/artist.js";
import EventInfo from "../src/models/event.js";

sequelize.sync({ force: true }).then(async () => {
  await EventInfo.create({
    title: "La Grande Soirée Gnawa",
    description: "Soirée culturelle à Agadir",
    date: "2025-08-20",
    location: "Agadir"
  });

  await Artist.bulkCreate([
    { name: "Maâlem Hamid El Kasri", style: "Gnawa", photo: "https://beyondthesinglestory.wordpress.com/wp-content/uploads/2022/03/hamid-el-kasri-detail.png?w=390", schedule: "20:00 - 21:00" },
    { name: "Maâlem Mustapha Baqbou", style: "Gnawa", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe45-XLGvl_0aA1az50WaYhe6EwmiUn3EGwA&s", schedule: "21:00 - 22:00" },
    { name: "Maâlem Omar Hayat", style: "Gnawa", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVJWTommEpDvUFzWhaVwnPoPBrMU9Ccqy8-Q&s", schedule: "21:00 - 22:00" }
  ]);

  console.log("Seed done");
  process.exit();
});
