type Size={
    width:number,
    height:number
}
function Logo({height,width}:Size){
    return (<>
    <img src="C:\Users\ImanAhmed\source\repos\borro-react-app\src\assets\Logo.png" style={{height:`${height}px`, width:`${width}px`}}/>
    </>)
} export default Logo;