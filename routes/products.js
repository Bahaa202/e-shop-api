const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
      cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  
const uploadOptions = multer({ storage: storage })

// Get all products
router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Get one product
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
  });

  // Middleware to get product by ID
async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
};

// POST route to create a new product
router.post('/', uploadOptions.single('image'), async (req, res) => {
    try {
      const { name, description, price, inStock, brand, rate} = req.body;
      const image = req.file.path; // The path to the uploaded image
  
      const product = new Product({ name, description, price, image, inStock, brand, rate});
      await product.save();
  
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Update one product
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.name != null) {
      res.product.name = req.body.name;
    }
    if (req.body.brand != null) {
        res.product.brand = req.body.brand;
    }
    if (req.body.description != null) {
      res.product.description = req.body.description;
    }
    if (req.body.price != null) {
      res.product.price = req.body.price;
    }
    if (req.body.image != null) {
        res.product.image = req.body.image;
    }
    if (req.body.inStock != null) {
      res.product.inStock = req.body.inStock;
    }
    if (req.body.rate != null) {
      res.product.rate = req.body.rate;
    }
    
    try {
      const updatedProduct = await res.product.save();
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// Delete one product
router.delete('/:id', getProduct, async (req, res) => {
    try {
    await res.product.remove();
    res.json({ message: 'Deleted Product' });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    });

module.exports = router;
