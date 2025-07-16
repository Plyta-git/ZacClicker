import React, { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { SLOT_MACHINE_CONFIG } from "@/const/config";

interface SlotReelProps {
  isSpinning: boolean;
  onSpinComplete: (result: number) => void;
  spinTrigger: number;
  slides: number[];
}

const SlotsEmote: React.FC<{ index: number }> = ({ index }) => {
  switch (index) {
    case 0:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/autobus.gif" />
      );
    case 1:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/balon.gif" />
      );
    case 2:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/cmonBrug.png" />
      );
    case 3:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/Delmitooo.png" />
      );
    case 4:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/flotti.png" />
      );
    case 5:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/gucci.png" />
      );
    case 6:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/gucioCo.png" />
      );
    case 7:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/JasperWTF.png" />
      );
    case 8:
      return <img className=" fitobject-none size-14" src="/Emotes/kac.png" />;
    case 9:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/Kacci.png" />
      );
    case 10:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/mamonni.png" />
      );
    case 11:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/POWAGA.png" />
      );
    case 12:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/smalcci.png" />
      );
    case 13:
      return <img className=" fitobject-none size-14" src="/Emotes/xD.png" />;
    case 14:
      return <img className=" fitobject-none size-14" src="/Emotes/zozo.png" />;
    default:
      return (
        <img className=" fitobject-none size-14" src="/Emotes/balon.gif" />
      );
  }
};

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
        }, SLOT_MACHINE_CONFIG.REEL_STOP_DELAY);
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
              <div
                className="embla__slide w-full h-full justify-center flex align-middle items-center"
                key={index}
              >
                <SlotsEmote index={number} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SlotReel;
