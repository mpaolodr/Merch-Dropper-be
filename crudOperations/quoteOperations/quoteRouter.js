const router = require("express").Router();
const Quotes = require("../quoteOperations/quoteModel");
const restricted = require("../../globalMiddleware/restrictedMiddleware");

// @desc     Post a Quote
// @route    POST /api/quotes
// @access   Private
router.post("/", restricted, async (req, res) => {
  try {
    const {
      store_name,
      username,
      total,
      subtotal,
      tax,
      fees,
      shipping,
      orderToken,
      warnings,
      mode
    } = req.body;

    const quote = await Quotes.insert({
      store_name,
      username,
      total,
      subtotal,
      tax,
      fees,
      shipping,
      orderToken,
      warnings,
      mode
    });

    if (quote) {
      res
        .status(201)
        .json({ quote, message: "You have successfully added this Quote!" });
    } else {
      res.status(400).json({ message: "please include all required content" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to add this quote, its not you.. its me"
    });
  }
});

// @desc     Get all quotes
// @route    GET /api/quotes
// @access   Private
router.get("/", restricted, async (req, res) => {
  try {
    const quotes = await Quotes.find();
    res.status(200).json(quotes);
  } catch (error) {
    res
      .status(500)
      .json({ error, message: "Unable to get quotes, its not you.. its me" });
  }
});

// @desc     Get an quote by quoteID
// @route    GET /api/quotes/:quoteID
// @access   Private
router.get("/:quoteID", restricted, async (req, res) => {
  try {
    const quote = await Quotes.findById(req.params.quoteID);
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this quote id, its not you.. its me"
    });
  }
});

// @desc     Get a quote by Scalable Press order token
// @route    GET /api/quotes/:orderToken
// @access   Private
router.get("/:orderToken", restricted, async (req, res) => {
  try {
    const quote = await Quotes.findByOrderToken(req.params.orderToken);
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({
      error,
      message: "Unable to find this order id, its not you.. its me"
    });
  }
});

// @desc     Edit a quote by quoteID
// @route    PUT /api/quotes/:quoteID
// @access   Private
router.put("/:quoteID", restricted, async (req, res) => {
  try {
    const quote = await Quotes.updateByQuoteId(req.params.quoteID, req.body);
    if (quote) {
      res.status(200).json({ quote, message: "Quote info has been updated!" });
    } else {
      res.status(404).json({ message: "That quote could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this quote, its not you.. its me"
    });
  }
});

// @desc     Edit an quote by order token
// @route    PUT /api/quotes/:orderToken
// @access   Private
router.put("/:orderToken", restricted, async (req, res) => {
  try {
    const quote = await Quotes.updateByQuoteToken(
      req.params.orderToken,
      req.body
    );
    if (quote) {
      res.status(200).json({ quote, message: "Quote info has been updated!" });
    } else {
      res.status(404).json({ message: "That quote could not be found!" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Could not edit this quote, its not you.. its me"
    });
  }
});

// @desc     Delete a quote by quoteID
// @route    DELETE /api/quotes/:quoteID
// @access   Private
router.delete("/:quoteID", restricted, async (req, res) => {
  try {
    const count = await Quotes.removeByQuoteId(req.params.quoteID);
    if (count > 0) {
      res.status(200).json({ message: "this Quote has been deleted!" });
    } else {
      res.status(404).json({ message: "Could not find that quote ID" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Quote, its not you.. its me"
    });
  }
});

// @desc     Delete a quote by order token
// @route    DELETE /api/quotes/:orderToken
// @access   Private
router.delete("/:orderToken", restricted, async (req, res) => {
  try {
    const count = await Quotes.removeByOrderToken(req.params.orderToken);
    if (count > 0) {
      res.status(200).json({ message: "this Quote has been deleted!" });
    } else {
      res
        .status(404)
        .json({ message: "Could not find that quote by given quote token" });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error while deleting Quote, its not you.. its me"
    });
  }
});

// Export router
module.exports = router;
