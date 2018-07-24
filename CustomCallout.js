import PropTypes from 'prop-types';
import React from 'react';
import {
    StyleSheet,
    View,Text,Image,
    Dimensions
} from 'react-native';

import colors from "../Style/Colors";
import BaseStyle from '../Style/Style';
import AnimateScaleView from  './AnimateScaleCircleView';
const propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
    needShowAnimated: PropTypes.bool
};

export default class CustomCallout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {},
        }
    }

    render() {

        let {needShowAnimated} = this.props;

        return (
            <View
                style={[styles.container, this.props.style]}>
                {needShowAnimated && this.state.position.x > 0 && <AnimateScaleView location={this.state.position}/>}
                {needShowAnimated && this.state.position.x > 0 && <AnimateScaleView size={0} startTime={1500} location={this.state.position}/>}
                {needShowAnimated && this.state.position.x > 0 && <AnimateScaleView size={0} startTime={3000} location={this.state.position}/>}
                <View style={styles.bubble}>
                    <View style={styles.waitView}>
                        <Text style={[BaseStyle.font11, BaseStyle.fontGrey_99]}>已等待</Text>
                        <Text style={[BaseStyle.font14, {color:'#FD6B5B', marginTop:3}]}>00:50</Text>
                        <View style={styles.splitView}/>
                    </View>
                    <View style={styles.amount}>
                        {this.props.children}
                    </View>
                </View>
                <View style={styles.arrowBorder} />
                {<Image
                    onLayout={(event) => {
                        let {x, y, width, height} = event.nativeEvent.layout;
                        this.setState({
                            position:{x:x + width/2, y:y + height/2 + 14}
                        })
                    }}
                    resizeMode="contain"
                    style={[{height: 34, width: 22, alignSelf: 'center', marginTop:-15}]}
                    source={require('../Images/car_map_start_icon.png')}/>}

            </View>
        );
    }
}

CustomCallout.propTypes = propTypes;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex:1,
        shadowOffset:{ width:2, height:2 }, shadowColor:'black', shadowOpacity:0.14, shadowRadius:1,
    },
    bubble: {
        flex:1,
        alignItems:'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        paddingRight: 20,
        paddingVertical: 12,
        borderRadius: 17,
        borderColor: '#ffffff',
        borderWidth: 0.5,
        overflow: 'hidden',
        height:50,
        elevation:20,
    },
    amount: {
        flexDirection: 'row',
    },
    arrowBorder: {
        marginBottom: 6.5,
        backgroundColor: 'transparent',
        borderWidth: 14,
        borderColor: 'transparent',
        borderTopColor: '#ffffff',
        alignSelf: 'center',
        marginTop: -8,
    },
    waitView: {
        flexDirection: 'column',
        width: 59,
        marginRight: 10,
        marginTop: -12,
        marginBottom: -12,
        backgroundColor: 'transparent',
        alignItems :'center',
        justifyContent:'center'
    },
    splitView: {
        position: 'absolute',
        left:58.5,
        top:3,
        height: 24,
        width: 0.5,
        backgroundColor:'#D8D8D8'
    }
});
