import "./index.scss";
import React from "react";
import { useEffect } from "react";

const Invitation = ({ page = 1 }) => {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      document.removeEventListener("resize", handleResize);
    };

    async function drawCanvas() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        var canvas = document.getElementById("myCanvas" + page);
        let canvasHeight = window.innerHeight;
        let canvasWidth = (canvasHeight * 1.9) / 3;
        const windowWidth =
          document.querySelector("#invitation" + page).offsetWidth - 20;
        console.log("windowWidth", windowWidth);
        if (windowWidth < canvasWidth) {
          canvasWidth = windowWidth;
          canvasHeight = (canvasWidth * 3) / 1.9;
        }
        canvas.height = canvasHeight;
        canvas.width = canvasWidth;
        var context = canvas.getContext("2d");
        function loadImage(url) {
          return new Promise((r) => {
            let i = new Image();
            i.onload = () => r(i);
            i.src = url;
          });
        }
        const location = urlParams.get("location") || "nha-trai";
        let img = await loadImage(
          `images/invitation/${location}-page-${page}.png`
        );
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.min(hRatio, vRatio);
        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
        if (page === 1) {
          context.font = `${(img.width * ratio) / 20}px Send Flowers`;
          context.fillStyle = "#080852";
          const guest = urlParams.get("guest") || "Quý khách";
          context.textAlign = "center";
          if (location === "nha-trai") {
            context.fillText(
              guest,
              (img.width * ratio) / 2,
              (img.height * ratio) / 3.6
            );
          } else {
            context.fillText(
              guest,
              (img.width * ratio) / 2,
              (img.height * ratio) / 3.9
            );
          }
        }
      } catch (error) {}
    }
    function handleResize(e) {
      setTimeout(() => {
        drawCanvas();
      }, 3000);
    }
  }, [page]);
  return (
    <div>
      <div id={"invitation" + page} className="invitation">
        <canvas id={"myCanvas" + page}></canvas>
      </div>
    </div>
  );
};
export default React.memo(Invitation);
