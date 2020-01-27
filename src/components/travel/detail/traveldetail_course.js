import React from 'react';

// Components
import TravelDestination from './traveldetail_des';

class TravelCourse extends React.Component {
  render() {
    const { course } = this.props
    return(
      <div className='travel-course-wrapper'>
        <div className='sub-title-text'><i className="fas fa-bus"></i> Tour Course</div>
        {course.map( (des, i) => <TravelDestination key={i} destination={des} />)}
      </div>
    )
  }
}

export default TravelCourse;