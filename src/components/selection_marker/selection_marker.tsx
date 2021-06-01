import React from 'react'
import styles from './selection_maker.module.css'

interface Props  {
  lat?: number,
  lng?: number,
  onClick?: () => void
}

const SelectionMarker = (props: Props) => {
  return (
    <div className={styles.selection}>
      <img src="./assets/img/marker.svg" alt="Current location"/>
    </div>
  )
}

export default SelectionMarker
