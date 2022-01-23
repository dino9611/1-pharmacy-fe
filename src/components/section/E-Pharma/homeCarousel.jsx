import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import homeWallpaper1 from '../../../assets/homeWallpaper1.jpeg';
import homeWallpaper2 from '../../../assets/homeWallpaper2.jpeg';
import homeWallpaper3 from '../../../assets/homeWallpaper3.jpeg';
import './style.css';

const styleTitle = { fontSize: 35, marginBottom: 0, textShadow: "2px 2px 7px #202020" };
const styleSubTitle = { fontSize: 18, textShadow: "2px 2px 8px #202020" };

function HomeCarousel() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={homeWallpaper1}
                    alt="First slide"
                    style={{
                        objectFit: 'contain'
                    }}
                />
                <Carousel.Caption>
                    <p style={styleTitle}>#LoveYourself.</p>
                    <p style={styleSubTitle}>Obatin is always around to keep you safe.<br/>We provide your healthcare needs, so you take care of yourself.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={homeWallpaper2}
                    alt="Second slide"
                    style={{
                        objectFit: 'contain'
                    }}
                />
                <Carousel.Caption>
                    <p style={styleTitle}>Let's end this pandemic.</p>
                    <p style={styleSubTitle}>Be mindful. Protect you and your family.<br/>Wear mask. Stay clean. Keep your distance.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={homeWallpaper3}
                    alt="Third slide"
                    style={{
                        objectFit: 'contain'
                    }}
                />
                <Carousel.Caption>
                    <p style={styleTitle}>#FebruaryHeartAwarenessMonth</p>
                    <p style={styleSubTitle}>Wear red as a significance to promote a healthy heart.<br/>Post on your social media to spread awareness within our community.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
  }
  
export default HomeCarousel