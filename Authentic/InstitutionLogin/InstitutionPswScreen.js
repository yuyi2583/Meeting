import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Styles, { backgourndColor } from '../../Style';
import Forward from "../../Component/Forward";
import Back from "../../Component/Back";
import ForwardLoading from "../../Component/ForwardLoading";
import url from "../../url";
import Toast from 'react-native-easy-toast';
import Global, { personType } from "../../Global";

class InstitutionPswScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            institution: this.props.navigation.getParam("institution", ""),
            jobnum: this.props.navigation.getParam("jobnum", ""),
            pswd: '',
            isSubmit: false,
        };
    }
    forgetPsw = () => {
        let { institution, jobnum } = this.state;
        this.props.navigation.push("FaceCognition", {
            institution: institution,
            jobnum: jobnum,
            personType: personType.staff,
            isForgetPwd: true,
        });
    }


    handleSubmit = () => {
        this.setState({ isSubmit: true });
        let { institution, jobnum, pswd } = this.state;
        Global.personInfo= {
            id: 1,
            name: '付初露',
            sex: '女',
            companyId: 1,
            identity: 'staff',
            identified: false,
            personType: 1
        };
        this.props.navigation.navigate("App");
        // let opts = {
        //     method: "GET"
        // }
        // let URL = url.staffLogin(institution,jobnum, pswd);
        // console.log(URL);
        // fetch(URL, opts).then((response) => response.json())
        //     .then((responseJson) => {
        //         if (responseJson.status === 200) {
        //             if (responseJson.result.localeCompare("success")===0) {
        //                 Global.personInfo = { ...responseJson.data, personType: personType.staff }
        //                 Global.personInfo.identified=false;
        //                 Global.storage.save({
        //                     key: 'personInfo',  // 注意:请不要在key中使用_下划线符号!
        //                     data: Global.personInfo,
        //                     // 如果不指定过期时间，则会使用defaultExpires参数
        //                     // 如果设为null，则永不过期
        //                     expires: 1000 * 3600 * 24 * 7
        //                 });
        //                 console.log(Global.personInfo);
        //                 this.setState({ isSubmit: false });
        //                 this.props.navigation.navigate("App");
        //             } else {
        //                 this.setState({ isSubmit: false });
        //                 this.refs.toast.show(responseJson.msg);
        //             }
        //         }
        //     }).catch((error) => {
        //         this.refs.toast.show("网络似乎在躲猫猫欸");
        //         this.setState({ isSubmit: false });
        //     });
    }
    render() {
        return (
            <View style={Styles.default}>
                <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                    <Back onPress={() => this.props.navigation.goBack()} />
                </View>
                <View style={{ flex: 8, alignItems: "stretch", justifyContent: "flex-start" }}>
                    <Text style={Styles.title}>账号密码登录</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={Styles.itemTitle}>密码</Text>
                        <TouchableOpacity onPress={this.forgetPsw}>
                            <Text style={Styles.itemTitle}>忘记密码</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput style={{ ...Styles.input, marginBottom: 20 }} secureTextEntry={true}
                        onChangeText={(pswd) => this.setState({ pswd })} />
                    <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "flex-end" }}>
                        {this.state.isSubmit ? <ForwardLoading /> :
                            <Forward onPress={this.state.pswd.length > 0 ? this.handleSubmit : null}
                                feasible={this.state.pswd.length > 0} />}
                    </View>
                </View>
                <View style={{ flex: 1 }} />
                <Toast
                    ref="toast"
                    style={Styles.toast}
                    opacity={0.8}
                    position="top"
                    fadeOutDuration={1000}
                    textStyle={{ color: backgourndColor, fontSize: 20, fontWeight: "bold" }}
                />
            </View>
        );
    }
}

export default InstitutionPswScreen;