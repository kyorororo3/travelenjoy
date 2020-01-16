import React from 'react';

class Account extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    this.handleAccount({
      email: e.target.email.value,
      pwd: e.target.pwd.value,
      nickname: e.target.nickname.value,
      name: e.target.name.value
    });
  }

  // 회원가입 정보를 node서버로 전달하는 메소드
  handleAccount = (mem_info) => {
    // console.log(mem_info);
    fetch('http://localhost:3002/api/account', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(mem_info)
    })
      .then(res => res.json())
      .then(obj => {
        if(obj.result === 'succ') {
          alert("회원가입이 완료되었습니다.");
          this.props.history.push('/'); // 홈으로 이동시켜준다!
        }
      });
  }  

  render() {
    return(
      <div className="account-form-wrapper">
        <h3>Join</h3>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>이메일</th>
                <td><input type='text' name='email' /></td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td><input type='password' name='pwd' /></td>
              </tr>
              <tr>
                <th>닉네임</th>
                <td><input type='text' name='nickname' /></td>
              </tr>
              <tr>
                <th>이름</th>
                <td><input type='text' name='name' /></td>
              </tr>
              <tr>
                <td colSpan='2'><input type='submit' value='제출'/></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default Account;