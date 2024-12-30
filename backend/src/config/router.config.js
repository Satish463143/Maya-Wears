const router  = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const userRouter = require("../modules/user/user.router")
const bannerRouter = require("../modules/banner/banner.router")
const banner_2Router = require("../modules/banner_2/banner_2.router")
const banner_1Router = require("../modules/banner_1/banner-1.router")
const collectionRouter = require("../modules/collections/collection.router")
const productRouter = require("../modules/product/product.router")
const cartRouter = require("../modules/cart/cart.router")
const orderRouter = require("../modules/Order/Order.router")
const promoRouter = require("../modules/promo/promo.router")
const customerDetails = require("../modules/customerDetails/customer.router")
const featuredProduct = require("../modules/featuredProduct/featuredProduct.router")
const gallery = require("../modules/Gallery/Gallery.router")



router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/banner",bannerRouter)
router.use("/banner_1",banner_1Router)
router.use("/banner_2",banner_2Router)
router.use("/collection",collectionRouter)
router.use("/product",productRouter)
router.use('/cart', cartRouter)
router.use('/order',orderRouter)
router.use('/promo', promoRouter)
router.use('/customer', customerDetails)
router.use('/featured_product', featuredProduct)
router.use('/gallery', gallery)


module.exports = router