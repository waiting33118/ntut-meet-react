import classes from './ControlBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

const ControlBar = () => {
  return (
    <div
      className={`${classes['control-bar']} flex justify-center items-center`}
    >
      <button
        type="button"
        className={'bg-red-500 rounded-full py-2.5 px-6 text-white'}
      >
        <FontAwesomeIcon icon={faPhoneSlash} />
      </button>
    </div>
  );
};

export default ControlBar;
