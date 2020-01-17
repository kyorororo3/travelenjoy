import React from 'react';

class TravelDestinationMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { seq, address, des_name } = this.props.destination;
    const restAPI_key = '66ab3611db265217a420cc857f4b76af';

    fetch('https://dapi.kakao.com/v2/local/search/address.json?query=' + address, {
      method: 'get',
      headers: {
        Authorization: `KakaoAK ${restAPI_key}`
      }
    })
      .then(res => res.json())
      .then( result => {
        console.log(result.documents[0]);
        
        const x = result.documents[0].x;
        const y = result.documents[0].y;
        
        window.kakao.maps.load(() => {
          var container = document.getElementById('map' + seq); //지도를 담을 영역의 DOM 레퍼런스
          var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(y, x), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
          };
          var map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
          
          // 마커가 표시될 위치입니다 
          var markerPosition  = new window.kakao.maps.LatLng(y, x); 
      
          // 마커를 생성합니다
          var marker = new window.kakao.maps.Marker({
            position: markerPosition
          });
      
          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          // 맵 드래그 방지
          map.setDraggable(false);

          var iwContent = '<div style="padding:5px;">' + des_name + '<br><a href="https://map.kakao.com/link/map/' + des_name + ',' + y + ',' + x + '" style="color:blue" target="_blank">큰지도보기</a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              iwPosition = new window.kakao.maps.LatLng(y, x); //인포윈도우 표시 위치입니다

          // 인포윈도우를 생성합니다
          var infowindow = new window.kakao.maps.InfoWindow({
              position : iwPosition, 
              content : iwContent 
          });
            
          // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
          infowindow.open(map, marker); 
        });
      } );

  }

  render() {
    const style = {
      width: 500 + 'px',
      height: 300 + 'px'
    }
    const { seq } = this.props.destination;

    return(
      <div id={'map' + seq} style={style}></div>
    )
  }
}

export default TravelDestinationMap;