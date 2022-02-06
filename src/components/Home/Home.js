import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../assets/Button";
import styles from "./home.module.css";

function Home() {
  const [reelCount, setReelCount] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [reelAnimation, setReelAnimation] = useState({
    imageCount: 0,
    counterBar: "100px",
    mainPhoto: "0",
    previewReel: "0",
  });

  //Reel Functions
  const reelHandler = (action) => {
    if (action === "next") {
      if (reelCount === 4) return;
      setReelCount(reelCount + 1);
      setIsAnimating(true);
    }
    if (action === "prev") {
      if (reelCount === 1) return;
      setReelCount((prevCount) => prevCount - 1);
      setIsAnimating(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 650);
    if (reelCount === 1) {
      setReelAnimation({
        imageCount: "01",
        counterBar: "100px",
        mainPhoto: "0",
        previewReel: "0",
      });
    } else if (reelCount === 2) {
      setReelAnimation({
        imageCount: "02",
        counterBar: "200px",
        mainPhoto: "-100%",
        previewReel: "-100%",
      });
    } else if (reelCount === 3) {
      setReelAnimation({
        imageCount: "03",
        counterBar: "300px",
        mainPhoto: "-200%",
        previewReel: "-200%",
      });
    } else if (reelCount === 4) {
      setReelAnimation({
        imageCount: "04",
        counterBar: "400px",
        mainPhoto: "-300%",
        previewReel: "-300%",
      });
    }
    return () => {
      clearTimeout(timer);
    };
  }, [reelCount]);

  const photoReel = [
    {
      key: "p1",
      photo: "/images/profpic.jpg",
      alt: "photo1",
    },
    {
      key: "p2",
      photo: "/images/p2.jpg",
      alt: "photo2",
    },
    {
      key: "p3",
      photo: "/images/p3.jpg",
      alt: "photo3",
    },
    {
      key: "p4",
      photo: "/images/p4.jpg",
      alt: "photo4",
    },
  ];

  const previewArray = [...photoReel];
  previewArray.push(previewArray.shift());

  return (
    <div className={styles.home__main}>
      <div className={styles.image__count}>
        <span className={styles.count__number}>{reelAnimation.imageCount}</span>
        <span className={styles.count__loader}>
          <span style={{ height: reelAnimation.counterBar }}></span>
        </span>
        <span className={styles.count__number}>04</span>
      </div>
      <div className={styles.photo__reel}>
        <div className={styles.photos__holder}>
          <div
            className={styles.photos}
            style={{ transform: `translateY(${reelAnimation.mainPhoto})` }}
          >
            {photoReel.map((photo) => (
              <img
                style={{
                  transform: isAnimating ? "scale(.85)" : "scale(1)",
                }}
                key={photo.key}
                src={process.env.PUBLIC_URL + photo.photo}
                alt={photo.alt}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.banner__content}>
        <div className={styles.banner}>
          <p>Sale of the summer collection</p>
        </div>
        <div className={styles.button__holder}>
          <Link to="/shop" style={{color: '#000'}}>
            <Button width="180px" title="shop" title2="styles">
              <div className={styles.button__SVG}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  viewBox="0 0 20.243 13.501"
                >
                  <path
                    id="Icon_ionic-ios-arrow-round-forward"
                    data-name="Icon ionic-ios-arrow-round-forward"
                    d="M20.784,11.51a.919.919,0,0,0-.007,1.294l4.275,4.282H8.782a.914.914,0,0,0,0,1.828H25.045L20.77,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,20.784,11.51Z"
                    transform="translate(-7.875 -11.252)"
                  />
                </svg>
              </div>
            </Button>
          </Link>
        </div>
        <div className={styles.reel__nav}>
          <span data-title="next" onClick={() => reelHandler("next")}>
            <div className={styles.nav__SVG} style={{ right: 0 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 20.243 13.501"
              >
                <path
                  id="Icon_ionic-ios-arrow-round-forward"
                  data-name="Icon ionic-ios-arrow-round-forward"
                  d="M20.784,11.51a.919.919,0,0,0-.007,1.294l4.275,4.282H8.782a.914.914,0,0,0,0,1.828H25.045L20.77,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,20.784,11.51Z"
                  transform="translate(-7.875 -11.252)"
                  fill="#1a1a1a"
                />
              </svg>
            </div>
          </span>
          <span data-title="prev" onClick={() => reelHandler("prev")}>
            <div className={styles.nav__SVG} style={{ left: 0 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 20.243 13.501"
              >
                <path
                  id="Icon_ionic-ios-arrow-round-forward"
                  data-name="Icon ionic-ios-arrow-round-forward"
                  d="M20.784,11.51a.919.919,0,0,0-.007,1.294l4.275,4.282H8.782a.914.914,0,0,0,0,1.828H25.045L20.77,23.2a.925.925,0,0,0,.007,1.294.91.91,0,0,0,1.287-.007l5.794-5.836h0a1.026,1.026,0,0,0,.19-.288.872.872,0,0,0,.07-.352.916.916,0,0,0-.26-.64l-5.794-5.836A.9.9,0,0,0,20.784,11.51Z"
                  transform="translate(28.118 24.753) rotate(180)"
                  fill="#1a1a1a"
                />
              </svg>
            </div>
          </span>
        </div>
      </div>
      <div className={styles.reelPreview__holder}>
        <div
          style={{ transform: `translateX(${reelAnimation.previewReel})` }}
          className={styles.preview__container}
        >
          {previewArray.map((photo) => (
            <img
              key={photo.key}
              src={process.env.PUBLIC_URL + photo.photo}
              alt={photo.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
