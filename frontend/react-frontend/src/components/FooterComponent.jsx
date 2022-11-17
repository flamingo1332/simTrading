import React, { Component } from "react";
import PropTypes from "prop-types";

const FooterComponent = () => {
  return (
    <div>
      <footer className="footer ">
        <span className="text-muted">All Rights Reserevd 2022 @simTrading</span>
      </footer>
    </div>
  );
};

// class FooterComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {};
//   }

//   componentWillMount() {}

//   componentDidMount() {}

//   componentWillReceiveProps(nextProps) {}

//   shouldComponentUpdate(nextProps, nextState) {}

//   componentWillUpdate(nextProps, nextState) {}

//   componentDidUpdate(prevProps, prevState) {}

//   componentWillUnmount() {}

//   render() {
//     return (
//       <div>
//         <footer className="footer">
//           <span className="text-muted">All Rights Reserevd 2022 @javaguides</span>
//         </footer>
//       </div>
//     );
//   }
// }

FooterComponent.propTypes = {};

export default FooterComponent;
