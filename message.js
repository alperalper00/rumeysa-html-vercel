import Mesaj from "./messageContent.js";

export default function handler(req, res) {
  const unlockDate = new Date("2025-11-08T00:00:00Z");
  if (new Date() >= unlockDate) {
    res.status(200).json({ message: Mesaj });
  } else {
    res.status(403).json({ error: "Mesaj henüz kilitli." });
  }
}
