import ratelimit from '../config/upstash.js' //since were using type module in package.json we have to put the extension at the end for local import

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("my-rate-limit")
        if (!success) {
            return res.status(429).json({ message: "Too many request, please try again later" })
        }
        next()
    } catch (error) {
        console.log("Rate limit eror", error)
    }
}

export default rateLimiter