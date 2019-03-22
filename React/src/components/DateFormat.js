// @flow

export const DateFormat = (props) => {
  var arr = props.timestamp.match(/(\d{4})-(\d{2})-(\d{2})/);
  return(
    arr[3]+"."+arr[2]+"."+arr[1]
  )
};
