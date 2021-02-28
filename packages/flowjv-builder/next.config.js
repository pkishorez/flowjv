const withVideos = require("next-videos");

const isProd = process.env.NODE_ENV === "production";

module.exports = withVideos({
	distDir: ".next",
	assetPrefix: isProd ? "/flowjv" : "",
});
