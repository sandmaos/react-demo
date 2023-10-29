import React from 'react';
import FlashMessage from './FlashMessage';

import { connect } from 'react-redux';

const FlashMessageList = (props) => {
  const flashes=props.flashes;
  return (
    <div >

      {
        flashes.map((ele, index) => {
          console.log(ele);
          return <FlashMessage item={ele} key={index} />
        })
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    flashes: state.flash
  }
}

export default connect(mapStateToProps)(FlashMessageList);
