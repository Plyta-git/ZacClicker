import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

interface SlotReelProps {
  isSpinning: boolean;
  onSpinComplete: (result: number) => void;
  spinTrigger: number;
  slides: number[];
}

const SlotReel: React.FC<SlotReelProps> = ({
  isSpinning,
  onSpinComplete,
  spinTrigger,
  slides,
}) => {
  const [autoplayPlugin] = useState(() =>
    Autoplay({
      delay: 100,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      watchDrag: false,
      watchSlides: false,
      watchResize: true,
      duration: 15,
      skipSnaps: true,
    },
    [autoplayPlugin]
  );

  const handleSpinComplete = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    console.log(currentIndex);
    onSpinComplete(currentIndex);
  }, [emblaApi, onSpinComplete, slides]);

  useEffect(() => {
    if (spinTrigger > 0 && isSpinning) {
      autoplayPlugin.play();
      setTimeout(() => {
        autoplayPlugin.stop();
        setTimeout(() => {
          handleSpinComplete();
        }, 200);
      }, 2000);
    }
  }, [spinTrigger]);

  useEffect(() => {
    if (emblaApi) {
      autoplayPlugin.stop();
    }
  }, [emblaApi, autoplayPlugin]);

  return (
    <div className=" w-full h-full">
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((number, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">{number}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SlotReel;
