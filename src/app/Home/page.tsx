"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Card {
    id: number;
    title: string;
    description: string;
    image: string;
}

const HeroSection: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const bgRef = useRef<HTMLDivElement>(null);
    const leftBtnRef = useRef<HTMLButtonElement>(null);
    const rightBtnRef = useRef<HTMLButtonElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    const autoplayPlugin = useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            dragFree: false,
        },
        [autoplayPlugin.current]
    );

    const cards: Card[] = [
        {
            id: 1,
            title: "Everest Base Camp",
            description:
                "Everest Base Camp, the gateway to the world’s highest peak, offers breathtaking Himalayan views, rugged trails, and the spirit of adventure that touches the clouds.",
            image: "/everestbc.jpg",
        },
        {
            id: 2,
            title: "Boudha Stupa",
            description:
                "Boudha Stupa, a sacred Buddhist landmark, radiates peace with its watchful eyes and serene prayer flags fluttering in the Kathmandu breeze.",
            image: "/boudha.jpg",
        },
        {
            id: 3,
            title: "Lumbini",
            description:
                "Lumbini, the birthplace of Lord Buddha, is a sanctuary of calm where ancient monasteries and sacred ponds whisper tales of enlightenment.",
            image: "/lumbini.webp",
        },
        {
            id: 4,
            title: "Pokhara",
            description:
                "Pokhara enchants with its tranquil lakes, snow-capped peaks, and vibrant lakeside charm—a perfect harmony between nature and serenity.",
            image: "/pokhara.jpg",
        },
        {
            id: 5,
            title: "Thamel",
            description:
                "Thamel, the heartbeat of Kathmandu, bursts with color, music, and life—a maze of culture, cuisine, and endless exploration.",
            image: "/thamel.jpg",
        },
    ];

    // Embla callbacks
    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const index = emblaApi.selectedScrollSnap();
        setSelectedIndex(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    // 🔹 Background update animation
    useEffect(() => {
        if (bgRef.current) {
            gsap.to(bgRef.current, {
                backgroundImage: `url(${cards[selectedIndex].image})`,
                duration: 1,
                ease: "power2.out",
            });
        }
    }, [selectedIndex, cards]);

    // 🔹 Text change animation
    useEffect(() => {
        const titleEl = titleRef.current;
        const descEl = descRef.current;
        if (!titleEl || !descEl) return;

        titleEl.textContent = cards[selectedIndex].title;
        descEl.textContent = cards[selectedIndex].description;

        gsap.fromTo(
            [titleEl, descEl],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power1.out" }
        );
    }, [selectedIndex, cards]);

    // 🔹 Button click animation
    const animateButton = (btn: HTMLButtonElement | null) => {
        if (!btn) return;
        gsap.fromTo(btn, { scale: 1 }, { scale: 0.85, duration: 0.15, yoyo: true, repeat: 1 });
    };

    // 🔹 Manual controls
    const handleNext = useCallback(() => {
        if (!emblaApi) return;
        animateButton(rightBtnRef.current);
        emblaApi.scrollNext();
    }, [emblaApi]);

    const handlePrev = useCallback(() => {
        if (!emblaApi) return;
        animateButton(leftBtnRef.current);
        emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollTo = useCallback((index: number) => {
        if (!emblaApi) return;
        emblaApi.scrollTo(index);
    }, [emblaApi]);

    const currentCount = (selectedIndex + 1).toString().padStart(2, "0");
    const totalCount = cards.length.toString().padStart(2, "0");

    return (
        <div
            ref={bgRef}
            className="relative h-[100vh] w-[100vw] overflow-hidden bg-cover bg-center transition-all duration-700"
            style={{ backgroundImage: `url(${cards[selectedIndex].image})` }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="parent flex h-full w-full justify-center items-center">
                {/* Left dots */}
                <div className="left w-[7%] h-full flex flex-col justify-center items-center relative">
                    <div
                        className="absolute w-[0.5px] bg-white/40 left-1/2 -translate-x-1/2 transition-all duration-500"
                        style={{ height: "75%", top: "13%" }}
                    ></div>
                    <div className="flex flex-col items-center space-y-10 z-10">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className="relative flex flex-col items-center"
                                onClick={() => scrollTo(index)}
                            >
                                <div
                                    className={`z-50 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${selectedIndex === index ? "bg-white/40 scale-200" : "bg-white/40"
                                        }`}
                                >
                                    <span
                                        className={`text-[10px] font-bold ${selectedIndex === index ? "text-white" : "text-white/70"
                                            }`}
                                    >
                                        {card.id}
                                    </span>
                                </div>
                                {index !== cards.length - 1 && <div className="w-[2px] h-10"></div>}
                            </div>
                        ))}
                    </div>
                    <div className="rotate-270 text-white/70 text-sm font-semibold absolute bottom-10 tracking-wider">
                        {currentCount}/{totalCount}
                    </div>
                </div>

                {/* Main content */}
                <div className="flex justify-center flex-col w-[92%] h-[80%]">
                    <div className="flex justify-between items-center w-full h-full">
                        {/* Text */}
                        <div className="center w-[40%] h-[80%] mt-20">
                            <div className="flex h-full flex-col justify-center text-white overflow-hidden">
                                <h1 ref={titleRef} className="text-7xl font-bold mb-4">
                                    {cards[selectedIndex].title}
                                </h1>
                                <p ref={descRef} className="max-w-xl mb-6 text-md text-white/70 leading-6">
                                    {cards[selectedIndex].description}
                                </p>
                                <button className="z-40 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition w-32 flex justify-between items-center text-lg">
                                    <div>Explore</div>
                                    <div>→</div>
                                </button>
                            </div>
                        </div>

                        {/* Cards - Embla Carousel */}
                        <div className="right w-[60%] h-[80%] mt-20 flex justify-center items-center z-40">
                            <div className=" embla relative ml-8 max-w-[100%] h-[95%] overflow-hidden">
                                <div className=" embla__viewport h-full" ref={emblaRef}>
                                    <div className="  embla__container flex items-center h-full ">
                                        {cards.map((card, index) => {
                                            const isActive = selectedIndex === index;
                                            return (
                                                <div
                                                    key={card.id}
                                                    className=" embla__slide flex-[0_0_214px] mr-3"
                                                    onClick={() => scrollTo(index)}
                                                >
                                                    <div
                                                        className={`flex flex-col justify-between items-start rounded-md overflow-hidden transition-all duration-600 cursor-pointer ${isActive ? "h-[330px] z-10" : "h-[270px]"
                                                            }`}
                                                    >
                                                        <div className="info flex flex-col justify-center items-start p-2">
                                                            <div className="name text-white font-semibold">{card.title}</div>
                                                            <div className="flex space-x-1 text-yellow-400 text-md">
                                                                <span>★</span>
                                                                <span>★</span>
                                                                <span>★</span>
                                                                <span>★</span>
                                                                <span className="text-gray-300">★</span>
                                                            </div>
                                                        </div>

                                                        <div className="relative card w-full h-[90%] rounded-md overflow-hidden">
                                                            <div className="absolute top-3 right-3 bookmark p-2 rounded-full bg-white w-fit">
                                                                <img src="/bookmark.svg" alt="bookmark" />
                                                            </div>
                                                            <img
                                                                src={card.image}
                                                                alt={card.title}
                                                                className="w-full h-full object-cover object-center"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="w-[100%] h-[10%] flex justify-center items-center gap-5">
                        <button
                            ref={leftBtnRef}
                            onClick={handlePrev}
                            className="z-50 focus:outline-none bg-white/20 hover:bg-white/40 text-white p-1 rounded-full text-lg transition"
                        >
                            <img className="w-7" src="/left.svg" alt="left" />
                        </button>
                        <button
                            ref={rightBtnRef}
                            onClick={handleNext}
                            className="z-50 focus:outline-none bg-white/20 hover:bg-white/40 text-white p-1 rounded-full text-lg transition"
                        >
                            <img className="w-7" src="/right.svg" alt="right" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
