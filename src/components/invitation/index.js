
import "./index.scss";
import React from 'react';
const Invitation = () => {

  return (
    <div >
      <div className="invitation">
        <img alt="" src="images/invitation/sakura-right.webp" className="top-right-decoration animate__animated animate__fadeInDown" />
        <img alt="" src="images/invitation/sakura-left.webp" className="bottom-left-decoration animate__animated animate__fadeInUp" />
         
        <div className="heading">Thiệp mời </div>
        <div className="send-to">Kính mời<br/>........................</div>
      </div>

    </div>
  );
}
export default React.memo(Invitation);
