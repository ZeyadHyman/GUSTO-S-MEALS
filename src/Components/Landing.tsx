function Landing() {
  return (
    <div className="min-h-[calc(100vh-66px)] bg-text-black flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-12 gap-12">
      {/* Text Content */}
      <div className="z-10 lg:min-w-3xl text-center lg:text-left lg:ml-50">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white ">
          Discover Tasty Recipes
          <br /> From Around the World
        </h1>
        <p className="text-cream text-lg sm:text-xl mt-6">
          Explore delicious meals, cooking inspiration, and recipe details.
          Start your next culinary adventure today!
        </p>
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
          <a
            href="#explore"
            className="bg-primary text-white px-6 py-3 rounded-full text-lg hover:bg-accent-vibrant transition-colors duration-300"
          >
            Explore Recipes
          </a>
          <a
            href="#categories"
            className="bg-white text-text-black px-6 py-3 rounded-full text-lg hover:bg-cream transition-colors duration-300"
          >
            Browse Categories
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="z-10 w-full max-w-xl lg:max-w-2xl transform lg:rotate-6 lg:mr-50">
        <img
          src="Images/pan.png"
          alt="Cooking Pan with Food"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default Landing;
