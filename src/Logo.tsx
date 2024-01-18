import logoPng from "./assets/Logo.png";

type Size={
    width:number,
    height:number
}
function Logo({height,width}:Size){
    return (<>
    <img src={logoPng} style={{height:`${height}px`, width:`${width}px`}}/>
    </>)
} export default Logo;

