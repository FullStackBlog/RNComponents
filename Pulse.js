import React from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

export default class Pulse extends React.Component {
	constructor(props) {
		super(props);
	
		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		setTimeout(()=>{
			Animated.timing(this.anim, {
					toValue: 1,
					duration: this.props.interval,
					easing: Easing.in,
				})
				.start();
		}, this.props.startTime)
	}

	render() {
		const { size, pulseMaxSize, borderColor, backgroundColor, getStyle, location } = this.props;
		return (
			<View style={[styles.circleWrapper, {
				width: pulseMaxSize,
				height: pulseMaxSize,
				marginLeft: -pulseMaxSize/2+location.x,
				marginTop: -pulseMaxSize/2+location.y,
			}]}>
				<Animated.View
					style={[styles.circle, {
						borderColor,
						backgroundColor,
						width: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						height: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [size, pulseMaxSize]
						}),
						borderRadius: pulseMaxSize/2,
						opacity: this.anim.interpolate({
							inputRange: [0, 1],
							outputRange: [1, 0]
						})
					}, getStyle && getStyle(this.anim)]}
				/>
			</View>
		);
	}	
}


const styles = StyleSheet.create({
	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		opacity:0.6,
	},
	circle: {
		borderWidth: 2 * StyleSheet.hairlineWidth,
	},
});