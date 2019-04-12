import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter
} from "mdbreact";

const FooterPagePro = () => {
  return ( <MDBFooter color = "stylish-color-dark"
    className = "page-footer font-small pt-4 mt-4">
    <MDBContainer fluid className = "text-center text-md-left" >
    <MDBRow >
    <MDBCol md = "6" >
    <h5 className = "text-uppercase mb-4 mt-3 font-weight-bold" >
    Footer Content </h5> <p >
    Here you can use rows and columns here to organize your footer content.Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p> </MDBCol> < hr className = "clearfix w-100 d-md-none" / >
    <MDBCol md-6 text-center >
    < h5 className = "text-uppercase mb-4 mt-3 font-weight-bold" >
    Links </h5> <ul className = "list-unstyled" >
    < li >
    < a href = "/" > Link 1 </a> </li> 
    <li >
    < a href = "/" > Link 2 </a> </li> 
    <li >
    <a href = "/" > Link 3 </a> </li> 
    < li >
    <a href = "/" > Link 4 </a> </li> </ul> </MDBCol> </MDBRow> </MDBContainer>

     </MDBFooter>
  );
}

export default FooterPagePro;