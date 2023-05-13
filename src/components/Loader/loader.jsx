import { RotatingLines } from "react-loader-spinner"


const Loader = () => {
    return <div style={{display:'block', textAlign:'center'}}><RotatingLines
  strokeColor="grey"
  strokeWidth="5"
  animationDuration="0.75"
  width="360"
  visible={true}
/></div>
}
export default Loader 