// // const express = require("express");
// // const Property = require("../models/Property");
// // const authMiddleware = require("../middleware/authMiddleware");

// // const router = express.Router();

// // /* ================= ADD PROPERTY (PROTECTED) ================= */
// // router.post("/add", authMiddleware, async (req, res) => {
// //   try {
// //     const { title, description, price, location, image } = req.body;

// //     const property = new Property({
// //       title,
// //       description,
// //       price,
// //       location,
// //       image,
// //       owner: req.user.id, // ✅ From Token
// //     });

// //     await property.save();

// //     res.status(201).json(property);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // /* ================= GET ALL PROPERTIES ================= */
// // router.get("/", async (req, res) => {
// //   try {
// //     const properties = await Property.find().populate("owner", "name email");

// //     res.json(properties);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // /* ================= GET OWNER PROPERTIES ================= */
// // router.get("/my-properties", authMiddleware, async (req, res) => {
// //   try {
// //     const properties = await Property.find({ owner: req.user.id });

// //     res.json(properties);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // module.exports = router;





// const express = require("express");
// const Property = require("../models/Property");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// /* ================= ADD PROPERTY (IMAGE LINK) ================= */
// router.post("/add", authMiddleware, async (req, res) => {
//   try {
//     const { title, description, price, location, image } = req.body;

//     const property = new Property({
//       title,
//       description,
//       price,
//       location,
//       image, // ✅ image link stored directly
//       owner: req.user.id,
//     });

//     await property.save();

//     res.status(201).json(property);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /* ================= GET ALL PROPERTIES ================= */
// router.get("/", async (req, res) => {
//   const properties = await Property.find().populate("owner", "name email");
//   res.json(properties);
// });

// /* ================= GET MY PROPERTIES ================= */
// router.get("/my-properties", authMiddleware, async (req, res) => {
//   const properties = await Property.find({ owner: req.user.id });
//   res.json(properties);
// });

// module.exports = router;




// /* ================= DELETE PROPERTY ================= */
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     // ✅ Only owner can delete
//     if (property.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     await Property.findByIdAndDelete(req.params.id);

//     res.json({ message: "Property deleted successfully ✅" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// /* ================= UPDATE PROPERTY ================= */
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     if (property.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     const updatedProperty = await Property.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updatedProperty);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// router.get("/", async (req, res) => {
//   const { search, location, minPrice, maxPrice } = req.query;

//   let filter = {};

//   if (search) {
//     filter.title = { $regex: search, $options: "i" };
//   }

//   if (location) {
//     filter.location = location;
//   }

//   if (minPrice || maxPrice) {
//     filter.price = {};
//     if (minPrice) filter.price.$gte = minPrice;
//     if (maxPrice) filter.price.$lte = maxPrice;
//   }

//   const properties = await Property.find(filter).populate(
//     "owner",
//     "name email"
//   );

//   res.json(properties);
// });





// const express = require("express");
// const router = express.Router();
// const Property = require("../models/Property");
// const authMiddleware = require("../middleware/authMiddleware");


// /* ================= ADD PROPERTY ================= */
// // router.post("/add", authMiddleware, async (req, res) => {
// //   try {
// //     const { title, description, price, location, image } = req.body;

// //     const property = new Property({
// //       title,
// //       description,
// //       price,
// //       location,
// //       image,
// //       owner: req.user.id,
// //     });

// //     await property.save();

// //     res.status(201).json(property);

// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });
// router.post("/add", authMiddleware, async (req, res) => {
//   try {
//     const { title, description, price, location, image } = req.body;

//     console.log("User ID from token:", req.user.id); // 🔥 Debug

//     const property = new Property({
//       title,
//       description,
//       price,
//       location,
//       image,
//       owner: req.user.id, // ✅ MUST BE THIS
//     });

//     await property.save();

//     res.status(201).json(property);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// /* ================= DELETE PROPERTY ================= */
// router.delete("/:id", authMiddleware, async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     if (property.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     await Property.findByIdAndDelete(req.params.id);

//     res.json({ message: "Property deleted successfully ✅" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// /* ================= UPDATE PROPERTY ================= */
// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     if (property.owner.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     const updatedProperty = await Property.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updatedProperty);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// /* ================= GET ALL PROPERTIES (SEARCH + FILTER) ================= */
// router.get("/", async (req, res) => {
//   try {
//     const { search, location, minPrice, maxPrice } = req.query;

//     let filter = {};

//     if (search) {
//       filter.title = { $regex: search, $options: "i" };
//     }

//     if (location) {
//       filter.location = location;
//     }

//     if (minPrice || maxPrice) {
//       filter.price = {};
//       if (minPrice) filter.price.$gte = Number(minPrice);
//       if (maxPrice) filter.price.$lte = Number(maxPrice);
//     }

//     const properties = await Property.find(filter).populate(
//       "owner",
//       "name email"
//     );

//     res.json(properties);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// /* ================= GET PROPERTY BY ID ================= */
// router.get("/:id", async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id).populate(
//       "owner",
//       "name email"
//     );

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     res.json(property);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// /* ================= GET MY PROPERTIES ================= */
// router.get("/my-properties", authMiddleware, async (req, res) => {
//   try {
//     const properties = await Property.find({ owner: req.user.id });

//     res.json(properties);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// module.exports = router;







const express = require("express");
const router = express.Router();
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");


/* =====================================================
   ADD PROPERTY
===================================================== */
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, price, location, image } = req.body;

    console.log("User ID from token:", req.user.id);

    const property = new Property({
      title,
      description,
      price,
      location,
      image,
      owner: req.user.id, // ✅ Correct owner saving
    });

    await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =====================================================
   GET MY PROPERTIES (⚡ MUST COME BEFORE "/:id")
===================================================== */
router.get("/my-properties", authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });

    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =====================================================
   SEARCH + FILTER + GET ALL PROPERTIES
===================================================== */
router.get("/", async (req, res) => {
  try {
    const { search, location, minPrice, maxPrice } = req.query;

    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (location) {
      filter.location = location;
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).populate(
      "owner",
      "name email"
    );

    res.json(properties);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =====================================================
   GET PROPERTY BY ID
===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json(property);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =====================================================
   UPDATE PROPERTY
===================================================== */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProperty);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/* =====================================================
   DELETE PROPERTY
===================================================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({ message: "Property deleted successfully ✅" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;