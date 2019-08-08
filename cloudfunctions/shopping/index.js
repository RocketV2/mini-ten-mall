// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request-promise')
const { createSign, } = require('./md5Sign')
cloud.init()

const pinduoduoUrl = "https://gw-api.pinduoduo.com/api/router";

// 云函数入口函数
exports.main = async (event, context) => {
	const wxContext = cloud.getWXContext()
	const defaultObj = {
		event,
		openid: wxContext.OPENID,
		appid: wxContext.APPID,
		unionid: wxContext.UNIONID,
	}

	switch(event.action){
		case "pdd.goods.opt.get": // 商品opt分类
			return getOptList()
		case "pdd.ddk.goods.search": // 商品列表 根据opt_id
			return getGoodsList(event)
		case "pdd.ddk.goods.detail": // 商品详情
			return getGoodsDetail(event)

		case "pdd.ddk.theme.list.get": // 主题列表查询
			return getThemeList();
		case "pdd.ddk.theme.goods.search": // 主题下的商品
			return getThemeGoods(event.theme_id)

		case "pdd.ddk.goods.promotion.url.generate": // 商品推广连接生成
			return createGoodsGenerate(event.goods_id)
		case "pdd.ddk.rp.prom.url.generate": // 红包
			return getLuckyMoney()

		default:
			return defaultObj;
	}
}

// 拼多多 opt分类
async function getOptList(){
	let params = {
		type: "pdd.goods.opt.get",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",
		parent_opt_id: 0, // 顶级节点下的opt树
	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}

// 拼多多 商品分类 根据opt_id
async function getGoodsList(event){
	let params = {
		type: "pdd.ddk.goods.search",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",
		opt_id: event.opt_id, // 商品标签类目id
		page: event.page,
		page_size: event.page_size,
		range_list: JSON.stringify([{range_id: 1, range_from: "", range_to: 1000}]),// 筛选范围 券后价1-10元

	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}

// 获取商品详情
async function getGoodsDetail(event){
	let params = {
		type: "pdd.ddk.goods.detail",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",
		goods_id_list: JSON.stringify([event.goods_id]), // 商品id
	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}

// 拼多多 主题列表查询 
async function getThemeList(){
	let params = {
		type: "pdd.ddk.theme.list.get",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",
	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}

// 拼多多 某一主题下的商品
async function getThemeGoods(theme_id){
	let params = {
		type: "pdd.ddk.theme.goods.search",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",

		theme_id, // 主题id
	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}

// 商品 生成推广
async function createGoodsGenerate(goods_id){
	let params = {
		type: "pdd.ddk.goods.promotion.url.generate",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",

		p_id: "8752298_100275142", // 推广位id
		goods_id_list: JSON.stringify([goods_id,]), // 商品id
		generate_we_app: true, // 是否生成小程序推广
	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}

// 红包
async function getLuckyMoney(){
	let params = {
		type: "pdd.ddk.rp.prom.url.generate",
		client_id: "4947f05e4f3944b3ac85a5d9e839362f",
		timestamp: (new Date()).getTime(), // 时间戳 s
		data_type: "JSON",

		p_id_list: JSON.stringify(["8752298_100275142",]), // 推广位id
		generate_weapp_webview: false, // 是否唤起微信客户端
		generate_we_app: true, // 是否生成小程序推广
	}
	const sign = createSign(params)
	params.sign = sign;

	return await request({
		method: "POST",
		uri: pinduoduoUrl,
		body: params,
		json: true,	
	})
}