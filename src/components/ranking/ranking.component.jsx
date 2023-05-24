import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selector';
import './ranking.styles.scss';

const Ranking = () => {
  const user = useSelector(selectUser);
  const {name, ranking} = user;

  const userName = name.charAt(0).toUpperCase() + name.slice(1);

  return(
    <div className='ranking'>
      <span>{`${userName}, Your current rank is`}</span> <br/>
      <span className='number'>{'#'+ ranking}</span>
    </div>
  )
};

export default Ranking;