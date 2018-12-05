let conf = {
  database: "pillarjs-example",
  uri: "mongodb://localhost:27017",
  options: {
    useNewUrlParser: true
  },
  collections: {
    cats: "cats"
  }
};

if (process.env.NODE_ENV === "production") {
  conf = Object.assign(conf, {});
} else if (process.env.NODE_ENV === "test") {
  conf = Object.assign(conf, {
    uri: "mongodb://localhost:27017",
    database: "pillarjs-example-test",
    options: {
      useNewUrlParser: true
    }
  });
} else if (process.env.NODE_ENV === "development") {
  conf = Object.assign(conf, {});
}

module.exports = conf;
