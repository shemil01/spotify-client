import { useMediaQuery } from 'react-responsive';
import MobileHome from './MobileHome';
import DeskTopHome from './DeskTopHome';

const Home = () => {

    const mobileView = useMediaQuery({ query: "(max-width: 1000px)" })


  return mobileView ? <MobileHome/> : <DeskTopHome/>
}
  
export default Home