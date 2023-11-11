import { Hourglass } from 'react-loader-spinner';
import css from './Loader.modue.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <Hourglass
        visible={true}
        height="50"
        width="50"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#black', '#grey']}
      />
    </div>
  );
};

export default Loader;
