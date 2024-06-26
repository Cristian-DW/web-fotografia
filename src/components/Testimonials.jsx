import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

/**
 * Testimonials Component
 * 
 * This component renders a section displaying customer testimonials using a carousel.
 * It utilizes the `pure-react-carousel` library to create a slider with multiple slides.
 * Each slide contains a customer testimonial, including an image, title, description, 
 * and customer details.
 * 
 * @component
 * @example
 * return (
 *   <Testimonials />
 * )
 */
export default function Testimonials() {
  return (
    <>
      {/* Section containing the testimonials carousel */}
      <section>
        <div className="flex items-center justify-between h-screen w-full">
          <div className="xl:px-20 px-8 py-20 2xl:mx-auto 2xl:container relative z-40">
            <CarouselProvider
              naturalSlideWidth={100}
              isIntrinsicHeight={true}
              totalSlides={5}
              autoplay='true'
            >
              {/* Header text for the testimonials section */}
              <h1 className="text-5xl font-bold xl:block hidden leading-tight text-white">
                What our customers are
                <br />
                saying
              </h1>
              <h1 className="text-5xl font-bold xl:hidden block leading-tight lg:leading-10 text-white">
                What our customers are saying
              </h1>
              
              {/* Slider containing the slides */}
              <Slider>
                <Slide index={0} tabIndex="null">
                  <div className="flex">
                    <div className="mt-14 md:flex">
                      <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
                        <img
                          src="https://i.ibb.co/4g1D9cv/imgslider1.png"
                          alt="image of profile"
                          className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
                        />
                        <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg"
                            alt="commas"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
                        <div>
                          <h1 className="text-2xl font-semibold xl:leading-loose text-white">
                            Some of the best work that was done!
                          </h1>
                          <p className="text-base font-medium leading-6 mt-4 text-gray-300">
                            Our core values are at the heart of all that we do.
                            They are integrated into our daily work lives and help
                            us to remember our customers always comes first, the
                            last thank you should always comes from us.
                          </p>
                        </div>
                        <div className="md:mt-0 mt-8">
                          <p className="text-base font-medium leading-4 text-gray-500">
                            Anna Smith
                          </p>
                          <p className="text-base leading-4 mt-2 mb-4 text-gray-400">
                            Senior Web Designer
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
                
                {/* Second slide */}
                <Slide index={1}>
                  <div className="flex">
                    <div className="mt-14 md:flex">
                      <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
                        <img
                          src="https://i.ibb.co/4g1D9cv/imgslider1.png"
                          alt="image of profile"
                          className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
                        />
                        <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full">
                          <img
                            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg"
                            alt="commas"
                          />
                        </div>
                      </div>
                      <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
                        <div>
                          <h1 className="text-2xl font-semibold xl:leading-loose text-white">
                            Some of the best work that was done!
                          </h1>
                          <p className="text-base font-medium leading-6 mt-4 text-gray-300">
                            Our core values are at the heart of all that we do.
                            They are integrated into our daily work lives and help
                            us to remember our customers always comes first, the
                            last thank you should always comes from us.
                          </p>
                        </div>
                        <div className="md:mt-0 mt-8">
                          <p className="text-base font-medium leading-4 text-gray-500">
                            Anna Smith
                          </p>
                          <p className="text-base leading-4 mt-2 mb-4 text-gray-400">
                            Senior Web Designer
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slide>
              </Slider>
              
              {/* Navigation buttons for the carousel */}
              <div className="flex items-center mt-8">
                <ButtonBack
                  className="cursor-pointer"
                  role="button"
                  aria-label="previous slide"
                >
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonal-svg2.svg"
                    alt="previous"
                    className="bg-orange-300 rounded"
                  />
                </ButtonBack>
                <ButtonNext
                  role="button"
                  aria-label="next slide"
                  className="cursor-pointer ml-2"
                >
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg3.svg"
                    alt="next"
                    className="bg-orange-400 rounded"
                  />
                </ButtonNext>
              </div>
            </CarouselProvider>
          </div>
        </div>
      </section>
    </>
  );
}

