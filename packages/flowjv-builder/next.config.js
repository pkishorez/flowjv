const isProd = process.env.NODE_ENV === "production";

module.exports = {
	distDir: ".next",
	assetPrefix: isProd ? "/flowjv" : "",
};
