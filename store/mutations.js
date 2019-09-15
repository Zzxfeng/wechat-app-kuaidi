 import {setStorageSync} from '@/assets/js/common'
export const mutations={
	//临时登录凭证
	LOGIN_SESSIONKEY(state,sessionKey){
		state.token=sessionKey
		setStorageSync('state',state)
	},
	SCHOOLMSG(state,schoolMsg){
		// console.log(schoolMsg)
		state.schoolMsg=schoolMsg
		setStorageSync('state',state)
	},
	SET_HOMEFLAG(state,homeFlag){
		state.homeFlag=homeFlag
		setStorageSync('state',state)
	},
	IS_NEW(state,isNew){
		state.isNew=isNew
		setStorageSync('state',state)
	},
	// USER_INFO(state,userInfo){
	// 	state.userInfo=userInfo
	// 	console.log(state)
	// 	setStorageSync('state',state)
	// }
}