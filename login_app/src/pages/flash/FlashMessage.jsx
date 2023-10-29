import React from 'react';

const FlashMessage = (props)=>{
  // console.log(props.item);
    let type;
    switch (props.item) {
      case "success": type = "alert alert-success";
        break;
      case "failed": type = "alert alert-danger";
        break;
      default: type = "alert";
        break;
    }
    return (
      <div className={type}>
        {props.msg}
      </div>
    );
  }

export default FlashMessage;
