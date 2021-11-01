
import "./index.scss";
import React from 'react';
import Countdown from 'react-countdown';
import IMAGES from '../../consts/data';

const Info = ({ page }) => {
    const selectedImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    const renderInfo = () => {

        switch (page) {
            case 0:
                return (
                    <div className="block summary  animate__animated animate__fadeInRight">
                        <div className="title-info">
                            <div>
                                Nguyễn
                                <span className="and">&</span>
                            </div>
                            <div>
                                Hường
                            </div>
                        </div>
                        <div className="sub-info">
                            Tham dự ngày vui của chúng tôi
                        </div>
                    </div>
                )
            case 1:
                return (
                    <div className="block summary  animate__animated animate__fadeInUp">
                        <div className="title-info">

                            <div>
                                Nhà trại
                            </div>

                        </div>
                        <div className="sub-info">
                            Yên Tập - Nhân Hòa - Mỹ Hào - Hưng Yên
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="block summary  animate__animated animate__fadeInDown">
                        <div className="title-info">

                            <div>
                                Nhà gái
                            </div>

                        </div>
                        <div className="sub-info">
                            Chi Đoan - Cộng Hòa - Nam Sách - Hải Dương
                        </div>
                    </div>
                )
            case 3:
                const Completionist = () => <span>Đã kết hôn!</span>;
                const renderCountDown = (e) => {
                    console.log(e);
                    return (
                        <div className="block countdown  animate__animated animate__fadeInLeft">
                            <div className="item days">
                                <div className="val">{e.days}</div>
                                <div className="sub">Ngày</div>
                            </div>
                            <div className="item hours">
                                <div className="val">{e.hours}</div>
                                <div className="sub">Giờ</div>
                            </div>
                            <div className="item minutes">
                                <div className="val">{e.minutes}</div>
                                <div className="sub">Phút</div>
                            </div>
                            <div className="item seconds">
                                <div className="val">{e.seconds}</div>
                                <div className="sub">Giây</div>
                            </div>
                        </div>

                    )

                }
                return (
                    < >
                        <Countdown date={new Date("2021-12-19")} renderer={renderCountDown}>
                            <Completionist />
                        </Countdown>
                    </>
                )
            default:
                break;
        }
    }
    return (
        <div className="info" style={{ backgroundImage: `url(${selectedImage?.src})` }}>
            {renderInfo()}
        </div>
    );
}
export default React.memo(Info);
