// const razerpay = require("razorpay");
// const crypto = require("crypto");
// const uuid = require("uuid");
// const id = uuid.v4();
// const payment = require("../model/paymentGateway");
// const nodemailer = require("nodemailer");

// //const Wallet = require("../../models/wallet");
// const SubscriptionSchema = require("../model/subscription")
// const userSchema = require("../model/jobService")
// const axios = require('axios');

// // const Razorpay = new razerpay({
// //   key_id: "rzp_live_oe2m9rifPN1OM5",
// //   key_secret: "lVgPoYfEbRchEnFISM6yJAdr",
// // });


// // Function to generate a hash string for PayU API request
// const generateHash = (data, salt) => {
//   const hashString = `${data.salt}|${data.status}||||||||||${data.email}|||||${data.firstName}||||||${data.productinfo}|||||||${data.amount}||||||||${data.txnid}||||${salt}`;
//   return crypto.createHash('sha512').update(hashString).digest('hex');
// };

// // Function to make a payment using PayU API
// exports.makePayment = async (req, res) => {
//   try {
//     const { amount, currency, description, orderId, customerName, customerEmail, customerPhone } = req.body;

//     const data = {
//       key: 'Jq1aG92E',
//       txnid: orderId,
//       amount,
//       productinfo: description,
//       firstname: customerName,
//       email: customerEmail,
//       phone: customerPhone,
//       //surl: 'http://your-website.com/success', // Replace with your success URL
//     //  furl: 'http://your-website.com/failure', // Replace with your failure URL
//       service_provider: 'payu_paisa',
//     };

//     // Generate hash string for the request
//     const hash = generateHash(data, '6r7hpFDE05');

//     // Make a POST request to PayU API endpoint for payment processing
//     const response = await axios.post('https://secure.payu.in/_payment', { ...data, hash });

//     // Handle the response from PayU API
//     const { status, paymentId, redirectUrl } = response.data;
//     if (status === 'success') {
//       // Payment request successful
//       res.status(200).json({ paymentId, redirectUrl });
//     } else {
//       // Payment request failed
//       res.status(500).json({ message: 'Failed to initiate payment' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to make payment', error });
//   }
// };

// // Function to handle the callback from PayU API after payment completion
// exports.paymentCallback = async (req, res) => {
//   try {
//     // Extract the relevant data from the callback request
//     const { paymentId, status, amount } = req.body;

//     // Verify the hash received in the callback
//     const hashString = `${'your_merchant_salt'}|${status}||||||||||${'your_merchant_key'}|${paymentId}|${amount}`;
//     const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

//     if (req.body.hash === calculatedHash) {
//       // Hash verification successful
//       // Perform any necessary actions based on the payment status and amount
//       // For example, update the order status in your database, send a confirmation email, etc.

//       // Respond with a success status to PayU API
//       res.status(200).end();
//     } else {
//       // Hash verification failed
//       res.status(400).json({ message: 'Invalid callback hash' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to process payment callback', error });
//   }
// };






// // Function to make a payment using PayU API
// exports.makePayment = async (req, res) => {
//   try {
//     const { amount, currency, description, orderId, customerName, customerEmail, customerPhone } = req.body;

//     // Make a POST request to PayU API endpoint for payment processing
//     const response = await axios.post('https://api.payu.in/v2/payments', {
//       merchantKey: 'Jq1aG92E',
//       merchantId: 'your_merchant_id',
//       amount,
//       currency,
//       description,
//       orderId,
//       customerName,
//       customerEmail,
//       customerPhone,
//     });

//     // Handle the response from PayU API
//     const { status, paymentId, redirectUrl } = response.data;
//     if (status === 'success') {
//       // Payment request successful
//       res.status(200).json({ paymentId, redirectUrl });
//     } else {
//       // Payment request failed
//       res.status(500).json({ message: 'Failed to initiate payment' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to make payment', error });
//   }
// };

// // Function to handle the callback from PayU API after payment completion
// exports.paymentCallback = async (req, res) => {
//   try {
//     // Extract the relevant data from the callback request
//     const { paymentId, status, amount } = req.body;

//     // Perform any necessary actions based on the payment status and amount
//     // For example, update the order status in your database, send a confirmation email, etc.

//     // Respond with a success status to PayU API
//     res.status(200).end();
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to process payment callback', error });
//   }
// };






// exports.CreatePayment = async (req, res) => {
//   try {


//     const subscriptionId = req.params.subscriptionId
//     const entryDate = new Date()

//       const subscription = await SubscriptionSchema.findById(subscriptionId)
    
//        console.log(subscription)
//       if (!subscription) {
//         return res.status(404).json({ message: 'Subscription not found' })
//       }
  
//       const startDate = new Date(subscription.startDate);
//       const endDate = new Date(subscription.endDate);
  
//       if (entryDate < startDate || entryDate > endDate) {
//         return res.status(400).json({ message: 'Invalid subscription' });
//       }
  
//       const daysLeft = Math.round((endDate - entryDate) / (1000 * 60 * 60 * 24));
  
//       //return res.status(200).json({ message: 'Subscription valid', daysLeft });

//     const userdata = await userSchema.findById({_id:req.params.userId})
     
//     if (!userdata || userdata.length == 0) {
//       return res.status(500).json({
//         message: "No userdata  is their",
//       });
//     }

//     console.log(userdata);

//      const data1 = {
//       amount: subscription.price,
//       currency: "INR",
//       receipt: id,
//       partial_payment: false,
//     };
//       console.log(data1.receipt);
//     //  const result1 = await Razorpay.orders.create(data1);
//     // console.log(result1);

//     const DBData = {
//       // orderId: result1.id,
//       // invoice: "123" + req.body.name,
//       // amount: bookingData.userobject.wallet,
//       amount_paid: /* result1.amount,*/ subscription.price,
//       currency: "INR",
//       // receipt: data1.receipt,
//       partial_payment: false,
//       employerId: userdata._id,
//       subscriptionId: subscription._id.toString(),

//       //  payment_Id: result1.id,
//       //  amount: result1.amount,
//       //  amount_paid: result1.amount_paid,
//       //  receipt: result1.receipt,
//       //  product: req.body.product,
//       //status: req.body.status,
//     };
//     console.log(DBData);
//     const AmountData = await payment.create(DBData);
//     console.log(AmountData);
//     // const AmountData = await payment.create(data1);
//     userdata.status = "success"
//     await userdata.save();




// // // create reusable transporter object using the default SMTP transport
// // let transporter = nodemailer.createTransport({
// //     host: "smtp.gmail.com",
// //     port: 587,
// //     secure: false,
// //     auth: {
// //       user: "node2@flyweis.technology",
// //       pass: "ayesha@9818#",
// //     }
// // });

// // // setup email data with unicode symbols
// // let mailOptions = {
// //     from: 'node2@flyweis.technology', // sender address
// //     to: 'node3@flyweis.technology', // list of receivers
// //     subject: 'payment', // Subject line
// //     text: 'payment done9', // plain text body
// //     html: '<b></b>' // html body
// // };

// // // send mail with defined transport object
// // transporter.sendMail(mailOptions, (error, info) => {
// //     if (error) {
// //         console.log(error);
// //     } else {
// //         console.log('Email sent: ' + info.response);
// //     }
// // });



//     return res.status(200).json(AmountData);
//   } catch (err) {
//     console.log(err);
//  return    res.status(400).send({ message: err.message });
//   }
// }




// exports.GetPaymentsByUserId = async (req, res) => {
//   try {
//     const Data = await payment.find({ employerId: req.params.userId });
//     return res.status(200).json({ details: Data });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };

// exports.GetAllPayments = async (req, res) => {
//   try {
//     const Data = await payment.find();
//     return res.status(200).json({ details: Data });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// };




