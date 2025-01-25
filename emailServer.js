const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://console.firebase.google.com/project/bidding-deb2b/firestore/data/~2Fauction", // Replace with your database URL
});

const firestore = admin.firestore();

const nodemailer = require("nodemailer");

const smtpConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Set to true if your SMTP server requires a secure connection
  auth: {
    user: "kamalvimal333@gmail.com",
    pass: "KaMaL@001",
  },
};

const transporter = nodemailer.createTransport(smtpConfig);

const schedule = require("node-schedule");

const checkAndSendEmails = async () => {
  const now = admin.firestore.Timestamp.now();

  // Get auctions that have reached their due date
  const auctionsRef = firestore.collection("auctions");
  const querySnapshot = await auctionsRef.where("duration", "<=", now).get();

  querySnapshot.forEach(async (doc) => {
    try {
      const auctionData = doc.data();
      console.log(doc);
    } catch (error) {
      console.error("Error:", error);
    }

    // // Assuming 'winner' field contains the winner's email
    // const winnerEmail = auctionData.winner;

    // // Send an email to the winner using Nodemailer
    // const mailOptions = {
    //   from: "kamalvimal333@gmail.com",
    //   to: winnerEmail,
    //   subject: "Auction Win Notification",
    //   text: `Congratulations! You've won the auction for ${auctionData.itemName}.`,
    // };

    // await transporter.sendMail(mailOptions);

    // // Optional: Update the auction document to mark it as notified
    // await doc.ref.update({ notified: true });
  });
};

// Schedule the task to run every 10 minutes
const job = schedule.scheduleJob("*/10 * * * * *", () => {
  checkAndSendEmails().catch((error) => {
    console.error("Error:", error);
  });
});

checkAndSendEmails();
