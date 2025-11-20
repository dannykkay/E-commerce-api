const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Please provide rating'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Please provide product'],
    },
  },
  { timestamps: true }
)
ReviewSchema.index({ product: 1, user: 1 }, { unique: true })
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        noOfReviews: { $sum: 1 },
      },
    },
  ])
  console.log(result)
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        noOfReviews: result[0]?.noOfReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}
ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product)
  console.log('post save hook triggered')
})
ReviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product)
  console.log('post remove hook triggered')
})
module.exports = mongoose.model('Review', ReviewSchema)
