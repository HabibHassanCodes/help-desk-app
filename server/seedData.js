const helpRequestFormSeed = [
    {
      name: "habib",
      status: "new",
      email: "habibhassan@gmail.com",
      description: "MY COMPUTER IS BROKEN HELP"
    },
    {
      name: "stanley",
      status: "in progress",
      email: "stanleystan@gmail.com",
      description: "I am lock outside my accout"
    },
  ];
  
  const userSeed = [
    { username: "admin", password: "admin1", role: "admin" },
  ];
  
  module.exports = {
    helpRequestFormSeed,
    userSeed,
  };