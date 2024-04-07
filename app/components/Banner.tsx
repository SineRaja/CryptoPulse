import Carousel from "./Carousel";

function Banner() {
    return (
        <div className="relative h-[90vh] bg-[url('https://images2.alphacoders.com/105/thumb-1920-1053880.jpg')] bg-cover bg-no-repeat bg-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative z-10 container mx-auto px-4 py-6 h-96 flex flex-col justify-around">
                <div className="flex flex-col justify-center items-center text-center h-[100vh]">
                    <h2 className="text-4xl font-bold mb-4 font-montserrat text-white mt-16 pt-16">
                    Be Your Own Crypto Analyst
                    </h2>
                    <p className=" text-xl font-semibold text-gray-500 capitalize font-montserrat">
                    Easy-to-use tools and visualizations powered by Next.js and Tailwind CSS And Developed <span className="text-2xl text-orange-400">Raja Sine.</span> 
                    </p>
                </div>
                <div className="h-1/2 flex items-center">
                    <Carousel />
                </div>
            </div>
        </div>

    );
}

export default Banner;
