import Tick from './Tick';
import Cross from './Cross';

const CellValue = ({ val }) => {
  if (val === true) return <Tick />;
  if (val === false) return <Cross />;
  return <span className='text-xs font-semibold text-[color:var(--text-primary)]'>{val}</span>;
};

export default CellValue;
