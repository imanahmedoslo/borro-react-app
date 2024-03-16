//import logoPng from "./assets/Logo.png";
import borroNobg from "./assets/borro-nobg.png";

type Size = {
  width: number | string;
  height: number;
};

function Logo({ height, width }: Size) {
  return (
    <>
      <img
        alt={"Borro logo"}
        src={borroNobg}
        style={{ height: `${height}px`, width: `${width}px` }}
      />
    </>
  );
}

export default Logo;
