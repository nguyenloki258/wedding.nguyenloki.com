
import "./index.scss";
import React from 'react';
import Countdown from 'react-countdown';

const Info = () => {


    const renderInfo = (info) => {
        switch (info) {
            case "summary":
                return (
                    <div className="block summary">
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
            case "date-countdown":
                const Completionist = () => <span>Đã kết hôn!</span>;
                const renderCountDown = (e) => {
                    console.log(e);
                    return <div className="countdown block">
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
        <div className="info">
            {renderInfo("summary")}
        </div>

    );
}
export default React.memo(Info);
