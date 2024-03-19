const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
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

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new brand
router.post('/', uploadOptions.single('image'),async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file.path; // The path to the uploaded image

    const product = new Brand({ name, description, image });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  });

// Middleware to get brand by ID
async function getBrand(req, res, next) {
  let brand;
  try {
    brand = await Brand.findById(req.params.id);
    if (brand == null) {
      return res.status(404).json({ message: 'Cannot find brand' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.brand = brand;
  next();
}

// Get one brand
router.get('/:id', getBrand, (req, res) => {
  res.json(res.brand);
});

// Update one brand
router.patch('/:id', getBrand, async (req, res) => {
  if (req.body.name != null) {
    res.brand.name = req.body.name;
  }
  if (req.body.description != null) {
    res.brand.description = req.body.description;
  }
  try {
    const updatedBrand = await res.brand.save();
    res.json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete one brand
router.delete('/:id', getBrand, async (req, res) => {
  try {
    await res.brand.remove();
    res.json({ message: 'Deleted Brand' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
