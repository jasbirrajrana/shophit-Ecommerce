import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin jasbir",
    email: "Admin@gmail.com",
    password: bcrypt.hashSync("9818$$", 10),
    isAdmin: true,
  },
  {
    name: "Jatin",
    email: "jatin@gmail.com",
    password: bcrypt.hashSync("9818$$", 10),
  },
  {
    name: "Shubham",
    email: "shubham@gmail.com",
    password: bcrypt.hashSync("9818$$", 10),
  },
];

export default users;
