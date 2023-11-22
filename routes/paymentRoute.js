import stripeJS from "stripe";
import express from "express";
import Subscription from "../models/subscription.js";
import Coupon from "../models/coupon.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
const stripe = stripeJS(process.env.STRIPE_PRIVATE_KEY);
const clientURI = process.env.CLIENT_URI;


router.post("/checkout", async (req, res) => {
    try {
        const price = await stripe.prices.retrieve(req.body.planId);
        const coupon = req.body.coupon || "";
        if (coupon.length > 0) {
            const validCoupon = await Coupon.findOne({ code: coupon });
            if (!validCoupon) {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price: price.id,
                            quantity: 1,
                        },
                    ],
                    mode: 'subscription',
                    success_url: `${clientURI}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${clientURI}/fail`,
                });
                return res.status(200).json({ url: session.url });
            }
            else {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price: price.id,
                            quantity: 1,
                        },
                    ],
                    mode: 'subscription',
                    discounts: [{
                        coupon: coupon
                    }],
                    success_url: `${clientURI}/success?session_id={CHECKOUT_SESSION_ID}`,
                    cancel_url: `${clientURI}/fail`,
                });
                return res.status(200).json({ url: session.url });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error })
    }

});


router.post("/success", async (req, res) => {
    try {
        const { sessionId, userId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        await Subscription.create({
            userId: userId,
            planId: sessionId,
            expireAt: new Date(session.expires_at * 1000),
            amount: session.amount_subtotal
        })

        return res.status(200).json({ message: "Subscription Successful" })
    } catch (error) {
        return res.status(500).json({ error })
    }
});


router.get("/coupons", async (req, res) => {
    const coupons = await Coupon.find({});
    return res.status(200).json({ coupons });
});

router.get("/prices", async (req, res) => {
    try {
        const prices = await stripe.prices.list({
            active:true,
            type:"recurring"
        });
        const priceObject=prices.data.map(price=>{
            return{
                id:price.id,
                currency:price.currency,
                timePeriod:price.recurring.interval,
                price:price.unit_amount
            }
        })
        return res.status(200).json({ priceObject });
    } catch (error) {
        return res.status(500).json({error})
    }
});

// async function createCoupon() {
//     const coupon = await stripe.coupons.create({
//         percent_off: 50.0,
//         duration: 'once'
//     });
//     await Coupon.create({
//         code: coupon.id,
//         discountPercentage: coupon.percent_off,
//     });
// }

//createCoupon();


export default router;