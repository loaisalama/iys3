const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // لو وضعت الملفات الثابتة في مجلد public

app.post("/check", async (req, res) => {
  const { cc, dd, yy, vv } = req.body;
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    // مثال على فحص رمزي: محاولة إنشاء customer
    const customer = await stripe.customers.create({
      name: "Test User",
      description: `بطاقة: ${cc}|${dd}|${yy}|${vv}`,
    });

    res.send("صحيح - تم الاتصال بنجاح");
  } catch (err) {
    res.status(400).send("خاطئ - فشل الاتصال");
  }
});

app.listen(port, () => {
  console.log(`السيرفر يعمل على http://localhost:${port}`);
});