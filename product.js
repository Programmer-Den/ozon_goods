const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weight: Number, // в кг
  price: { // ₽
    type: Number,
    required: true
  },
  vat: { // НДС
    type: Number,
    default: 0.2 // 20%
  },
  uploadDate: {
    type: Date,
    default: () => Date.now()
  },
  updateDate: Date,
});

productSchema.pre('save', function(next) {
  this.updateDate = Date.now();
  
  next();
});

module.exports = mongoose.model('Product', productSchema);
