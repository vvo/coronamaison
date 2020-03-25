import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const adapter = new FileSync("data/deletes.json");
const db = low(adapter);

db.defaults({
  deleted: {
    twitter: [],
  },
}).write();

export default function(req, res) {
  if (process.env.NODE_ENV !== "development") {
    res.send("no use in production");
    return;
  }

  const {
    query: { id },
  } = req;

  const deletes = db.get("deleted.twitter");
  console.log(deletes.includes(id).value());
  if (!deletes.includes(id).value()) {
    deletes.push(id).write();
  }

  res.send("ok");
}
