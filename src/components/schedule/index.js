import "./index.scss";
import React from "react";
const Schedule = () => {
  return (
    <div>
      <div className="timeline">
        <div className="container right">
          <div className="content">
            <h2 className="dark:text-black">8h20 9/4/2022</h2>
            <p className="dark:text-black">Xuất phát dẫn lễ</p>
          </div>
        </div>
        <div className="container left">
          <div className="content">
            <h2 className="dark:text-black">16h 9/4/2022</h2>
            <p className="dark:text-black">Mời khách ăn bữa cơm thân mật</p>
          </div>
        </div>
        <div className="container right">
          <div className="content">
            <h2 className="dark:text-black">11h20 10/4/2022</h2>
            <p className="dark:text-black">Tổ chức đón dâu</p>
          </div>
        </div>
        <div className="container left">
          <div className="content">
            <h2 className="dark:text-black">12h20 10/4/2022</h2>
            <p className="dark:text-black">Tổ chức lễ xin dâu/ vu quy</p>
          </div>
        </div>
        <div className="container right">
          <div className="content">
            <h2 className="dark:text-black">13h50 10/4/2022</h2>
            <p className="dark:text-black">Tổ chức lễ thành hôn</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(Schedule);
