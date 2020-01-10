import React from 'react';
import Header from './Header_test';
import Contents from './Contents_test';
import Footer from './Footer_test';

class AppTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      controller: 'main'  // 자바 컨트롤러의 command 같은 개념
    }
  }

  // header에서 선택한 메뉴로 Contents를 변경하기 위함
  handleController = (selected) => {
    this.setState({
      controller: selected
    })
  }

  render() {
    return(
      <div className="app-wrapper">
        <Header handleController={this.handleController}/>
        <Contents controller={this.state.controller} />
        <Footer></Footer>
      </div>
    )
  }
}

export default AppTest;