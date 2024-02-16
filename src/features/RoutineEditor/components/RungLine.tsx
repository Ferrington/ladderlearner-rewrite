import { selectRunSimulation } from '@/store/base/selectors';
import { deleteBranch } from '@/store/routine/slice';
import { Branch } from '@/store/routine/types';
import clsx from 'clsx';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/RungLine.module.css';

export default function RungLine({ branch }: { branch: Branch }) {
  const dispatch = useDispatch();

  const runSimulation = useSelector(selectRunSimulation);
  const [isDeletable, setIsDeletable] = useState(false);
  const [showInteractOutline, setShowInteractOutline] = useState(false);

  function lookClickable() {
    if (runSimulation) return;

    setShowInteractOutline(true);
  }

  function dontLookClickable() {
    setShowInteractOutline(false);
    setIsDeletable(false);
  }

  function handleMouseOver() {
    if (runSimulation) return;

    setIsDeletable(true);
  }

  function handleDelete() {
    dispatch(deleteBranch(branch));
  }

  return (
    <div>
      {showInteractOutline && (
        <div className={styles['interact-outline']} onMouseLeave={dontLookClickable}></div>
      )}
      <div
        className={clsx(styles.line, {
          [styles['clickable']]: showInteractOutline,
        })}
        onMouseOver={handleMouseOver}
        onMouseLeave={dontLookClickable}
      >
        <div
          className={clsx(styles.delete, {
            [styles.deletable]: isDeletable,
          })}
        >
          <RiDeleteBinLine
            className={styles['delete-icon']}
            onMouseOver={lookClickable}
            onMouseLeave={dontLookClickable}
            onClick={handleDelete}
            size="1.25em"
            title="Delete Branch"
          />
        </div>
      </div>
    </div>
  );
}
