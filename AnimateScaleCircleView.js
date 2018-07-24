import React from 'react';
import { View, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import Pulse from './Pulse';
import PropTypes from 'prop-types';

class AnimateScaleCircleView extends React.Component {
  constructor(props) {
		super(props);
	
		this.state = {
			circles: []
		};

		this.counter = 1;
		this.setInterval = null;
		this.anim = new Animated.Value(1);
	}

	componentDidMount() {
		this.setCircleInterval();
	}

	setCircleInterval() {
		this.setInterval = setInterval(this.addCircle.bind(this), this.props.interval);
		this.addCircle();
	}

	addCircle() {
		if (this.refs.myRef) {
			if(this.state.circles.length > 3) {
				this.setState({
					circles: []
				})
			}
			this.setState({ circles: [...this.state.circles, this.counter] });
			this.counter++;
		}

	}

	render() {
		return (
			<View
				ref="myRef"
				style={{
				position:'absolute',
				backgroundColor: 'transparent',
			}}>
				{this.state.circles.map((circle) => (
					<Pulse
						key={circle}
						{...this.props}
					/>
				))}
			</View>
		);
	}	
}

AnimateScaleCircleView.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  pressInValue: PropTypes.number,
  pressDuration: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  getStyle: PropTypes.func,
  startTime:PropTypes.number,
  location:PropTypes.object
};

AnimateScaleCircleView.defaultProps = {
  interval: 5000,
  size: 0,
  pulseMaxSize: 250,
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#5495E6',
  backgroundColor: 'rgba(84,149,230,0.40)',//'#ED225B55',
  getStyle: undefined,
  startTime: 0,
  location:{}
};

module.exports = AnimateScaleCircleView;