import { Link } from 'react-router-dom';
import FeaturedSportEvent from '../ModalComponents/FeaturedSportEvent';
import StandardBtnLarge from '../../../components/StandardBtnLarge';

export default function Sport({ sportEvent }) {
  console.log({ sportEvent });
  return (
    <>
      {!sportEvent && (
        <>
          <p>Check the italian football league's current season results. </p>
        </>
      )}

      {sportEvent && <FeaturedSportEvent sportEvent={sportEvent} />}

      <StandardBtnLarge text={'View Results'} to={'/sports'} />
    </>
  );
}