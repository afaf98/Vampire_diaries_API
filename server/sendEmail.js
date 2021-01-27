const { send } = require("@sendgrid/mail");
const sgMail = require("@sendgrid/mail");
const { v4 } = require("uuid");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendEmail(email) {
  const apiKey = createApiKey();
  const msg = {
    to: `${email}`,
    from: "vampire.diariesapi@gmail.com",
    subject: "The Vampire Diaries API_KEY",
    text: "HI!",
    html: `<p>Here for you, your The Vampire Diaries API_KEY <br> Have Fun!</p><strong>${apiKey}</strong>`,
  };

  //ES6
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
  //ES8
  (async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  })();
}

function createApiKey() {
  const apiKey = v4();
  console.log("api", apiKey);
  return apiKey;
}

module.exports = sendEmail;
