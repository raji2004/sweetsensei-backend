const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Cart, User, Orders } = require('../models');
exports.Payments = async (req, res) => {
  const { _id, refferalCode, total } = req.body;
  try {
    const [user, cart] = await Promise.all([
      User.findOne({ referralCode: refferalCode, }),
      Cart.findOne({ user: _id })
    ]);

    const referralBonus = user.calculateReferralBonus(total);
    user.accountBalance += referralBonus;

    const lineItems = cart.items.map(product => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: Math.round(product.price * 100),

        },
        quantity: product.quantity,
      };
    });

    const charge = await stripe.checkout.sessions.create({
      product_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: '',
      cancel_url: '',
    });

    const order = new Orders({
      user: _id,
      items: cart.items,
    });

    cart.items = [];
    await Promise.all([
      order.save(),
      cart.save(),
      user.save(),
    ]);

    res.status(200).json({ id: charge.id });
  } catch (err) {
    console.error('Error processing payment:', err);
    let message = 'An error occurred while processing your payment.';

    if (err.type === 'StripeCardError') {
      message = err.message;
    }

    res.status(500).send(message);
  }
}