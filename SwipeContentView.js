import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,Text,
    PanResponder,
    Animated
} from 'react-native';

const propTypes = {
    style: PropTypes.any
};

export default class SwipeContentView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            bg: 'red',
            bg1: 'pink',
            width: 30,
            distant: 0,
            animation : new Animated.Value(100)
        }
    }
    componentWillMount(){
        this.gestureHandlers = PanResponder.create({
            onStartShouldSetPanResponderStartShould: this._handleStartShouldSetPanResponder.bind(this),
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
            onPanResponderGrant: this._handlePanResponderGrant.bind(this),
            onPanResponderMove: this._handlePanResponderMove.bind(this),
            onPanResponderRelease: this._handlePanResponderEnd.bind(this),
            onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
        })
    }

    _handleStartShouldSetPanResponder(e, gestureState){
        console.log("start" + " " + gestureState.numberActiveTouches);
        return false;
    }

    _handleMoveShouldSetPanResponder(e, gestureState){
        console.log("move start" + " " + JSON.stringify(gestureState));
        return true;
    }
    _handlePanResponderGrant(e, gestureState){
        console.log("grant" + " " + gestureState.numberActiveTouches);
        if (gestureState.numberActiveTouches === 2) {
            this.setState({bg: 'orange'});
        }
    }
    _handlePanResponderEnd(e, gestureState){
        console.log("move end" + " " + JSON.stringify(gestureState));
        let dy = gestureState.dy;
        Animated.spring(
            this.state.animation,
            {
                toValue: dy < 0 ? 200 : 100
            }
        ).start();


        console.log(gestureState);
    }

    _handlePanResponderMove(e, gestureState){
        console.log(gestureState.numberActiveTouches + " " + e.nativeEvent.touches.length);
    }

    render() {
        return (<Animated.View
                {...this.gestureHandlers.panHandlers} style={[styles.container, this.props.style, {height: this.state.animation}]}>
                <View>
                </View>
            </Animated.View>
        );
    }
}

SwipeContentView.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

