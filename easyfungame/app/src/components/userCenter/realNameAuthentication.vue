<template>
	<div class="context">
		<div class="title">
			<a href="javascript:history.go(-1)"><img src="../../common/img/userCenter/arrowsb.png" alt="" class="back" /></a> 身份验证
		</div>
		<div class="userCenter">
			<li>
				<span class="lable">姓名</span>
				<input type="text" maxlength="18" class=" fr nickNameInput" id="nickNameInput" placeholder="真实姓名" :value="userDef.username" />
			</li>
			<li>
				<span class="lable">身份证</span>
				<input type="text" maxlength="18" class=" fr nickNameInput" id="codeInput" placeholder="身份证号码" :value="userDef.identityCard" />
			</li>
		</div>
		<div class="rnaBox">
			<div class="rnaPicUp">
				<img class="fl" src="../../common/img/userCenter/rnafront.png" id="hit1" data-state="0" />
			</div>
			<div class="rnaPicDown">
				<img class="fr" src="../../common/img/userCenter/rnaback.png" id="hit2" data-state="1" />
			</div>
		</div>

		<button class="rnasubmit" @click="setImg" v-if="state==0">提交审核</button>
		<button class="rnasubmit" v-if="state==1">已认证</button>
		<p class="state" v-if="state==2">信息有误 已被系统驳回</p>
		<button class="rnasubmit" @click="setImg" v-if="state==2">重新提交</button>
		<button class="rnasubmit"  v-if="state==4">审核中</button>

		<div class="pic_edit pic_edit1">
			<div id="clipArea1" class="clipArea"></div>
			<input type="file" id="file1" class="file">
			<button id="choose1" class="choose">选择图片</button>
			<button id="clipBtn1" class="clipBtn">上传</button>
			<button id="cannel1" class="cannel">取消</button>
		</div>
		<div class="pic_edit pic_edit2">
			<div id="clipArea2" class="clipArea"></div>
			<input type="file" id="file2" class="file">
			<button id="choose2" class="choose">选择图片</button>
			<button id="clipBtn2" class="clipBtn">上传</button>
			<button id="cannel2" class="cannel">取消</button>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				isAuthentication: 0,
				userData: JSON.parse(localStorage.userData),
				userDef: "",
				state:0
			}
		},
		methods: {
			imgLoad: function(index) {
				let vm = this;
				new PhotoClip("#clipArea" + index, {
					size: [413, 260],
					outputSize: [640, 640],
					file: "#file" + index,
					view: "#hit" + index,
					ok: "#clipBtn" + index,
					loadStart: function() {
						$('.lazy_tip span').text('');
						$('.lazy_cover,.lazy_tip').show();
					},
					loadComplete: function() {
						$('.lazy_cover,.lazy_tip').hide();
					},
					clipFinish: function(dataURL) {
						$("#hit" + index).attr('src', dataURL);
						$("#hit" + index).attr('data-state', 1);
						$(".pic_edit" + index).css({
							"top": "-100rem"
						});
					}
				});

				$("#hit" + index).bind('touchstart', function() {
					$('.pic_edit' + index).css({
						"top": "0"
					});
				});
				$('#cannel' + index).bind('touchstart', function() {
					$(".pic_edit" + index).css({
						"top": "-100rem"
					});
				});
			},
			save: function() {
				let vm = this;
			},
			getDefaultData: function() {
				let vm = this;
				$.ajax({
					type: "post",
					url: contextPath + "/liyu_game/api/googleauthenticator/getAntiAddiction",
					async: true,
					dataType: "json",
					data: {
						token: localStorage.token
					},
					success: function(data) {
						vm.userDef = data.data;
						vm.state=data.data.state;
						if(data.data.backUrl != "") {
							$("#hit1").attr("src", data.data.backUrl);
						}
						if(data.data.frontUrl != "") {
							$("#hit2").attr("src", data.data.frontUrl);
						}
					}
				});
			},
			setImg: function() {

				let vm = this;

				if(vm.checkCode($("#codeInput").val()) == 1) {
					$.ajax({
						type: "post",
						url: contextPath + "/liyu_game/api/googleauthenticator/uploadAntiAddiction",
						async: true,
						dataType: "json",
						data: {
							token: localStorage.token,
							userName: $("#nickNameInput").val(),
							identityCard: $("#codeInput").val(),
							frontUrl: $("#hit1").attr("src"),
							backUrl: $("#hit2").attr("src")
						},
						success: function(data) {
							mui.toast("上传成功!");
							vm.$router.push({"path":"/advancedSetting"});
						}

					})
				} else {
					mui.toast("请输入正确的身份证号");
				}

			},
			checkCode: function(num) {
				var numArr = num.split("");
				var role = "7－9－10－5－8－4－2－1－6－3－7－9－10－5－8－4－2".split("－");
				var sum = 0;
				for(var i = 0; i < numArr.length - 1; i++) {
					sum += numArr[i] * role[i];
				}
				var lastNum = sum % 11;

				var role2 = "1－0－X－9－8－7－6－5－4－3－2".split("－");

				if(role2[lastNum] == numArr[numArr.length - 1]) {
					return 1;
				} else {
					return 0;
				}
			}
		},
		mounted: function() {
			let vm = this;
			vm.imgLoad(1);
			vm.imgLoad(2);
			vm.getDefaultData();
		}

	}
</script>

<style lang="less" scoped>
.state{
	width: 6.4rem;
	padding: 0 0.2rem;
	text-align: center;
	color: red;
}
	.rnasubmit {
		width: 6rem;
		height: 0.6rem;
		margin: 0 0.2rem;
		background-color: #008d42;
		color: #FFFFFF;
		line-height: 0.6rem;
		font-size: 0.26rem;
		padding: 0;
	}
	
	.pic_edit {
		margin-top: 0.1rem;
	}
	
	.rnaBox {
		height: 2.95rem;
		padding: 0.35rem 0.1rem;
		.rnaPicUp {
			width: 2.9rem;
			margin: 0 0.1rem;
			border-radius: 0.15rem;
			overflow: hidden;
			float: left;
			img {
				width: 2.9rem;
				height: 1.83rem;
			}
		}
		.rnaPicDown {
			width: 2.9rem;
			margin: 0 0.1rem;
			border-radius: 0.15rem;
			overflow: hidden;
			float: right;
			img {
				width: 2.9rem;
				height: 1.83rem;
			}
		}
	}
	
	.point {
		float: right;
		width: 0.2rem;
		height: 0.2rem;
		margin-right: 0.2rem;
		margin-top: 0.32rem;
		border-right: 2px solid #999999;
		border-bottom: 2px solid #999999;
		-webkit-transform: rotateZ(-45deg);
		-moz-transform: rotateZ(-45deg);
		-ms-transform: rotateZ(-45deg);
		-o-transform: rotateZ(-45deg);
		transform: rotateZ(-45deg);
	}
	
	input::-webkit-input-placeholder {
		color: #999999;
	}
	
	.title {
		color: #989898;
		background-color: #006b8d;
		color: #fff;
	}
	
	body {
		background-color: #f5f5f5;
	}
	/*.userCenter  li:nth-of-type(1){
		height: 1.8rem;
		line-height: 1.8rem;
	}
	.userCenter  li:nth-of-type(1) img{
		height: 0.9rem;
		width: 0.9rem;
		margin-top: 0.45rem;
		border-radius: 100%;
	}*/
	
	.userCenter li:nth-of-type(2) {
		color: #3fa8ff
	}
	
	.userCenter {
		background-color: #FFFFFF;
		li {
			width: 100%;
			border-bottom: #dfdfdf 1px solid;
			label {
				line-height: 0.9rem;
				color: #999999;
				font-size: 0.26rem;
				padding-right: 0.2rem;
			}
			img {
				height: 0.6rem;
				width: 0.6rem;
				margin: 0.15rem 0.2rem;
				border-radius: 100%;
			}
			input {
				border: none;
				width: 3.2rem;
				font-size: 0.22rem;
				float: right;
				height: 0.85rem;
				text-align: right;
				margin: 0;
				padding: 0;
				color: #494949;
				background-color: #FFFFFF;
				margin-right: 0.2rem;
			}
		}
	}
	
	.lable {
		line-height: 0.9rem;
		color: #000000;
		font-size: 0.24rem;
		padding: 0.2rem;
	}
	
	.title {
		position: fixed;
		top: 0;
		z-index: 9;
		width: 6.4rem;
		height: 0.88rem;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.88rem;
		img {
			position: absolute;
			left: 0.2rem;
			height: 0.4rem;
			margin: 0.24rem 0;
		}
	}
	
	.context {
		height: 11rem;
	}
	
	.submit {
		display: inline-block;
		height: 0.32rem;
		padding: 0 0.1rem;
		border: 1px solid #FFFFFF;
		line-height: 0.32rem;
		margin-top: 0.28rem;
		position: absolute;
		right: 0.2rem;
		border-radius: 0.15rem;
		font-size: 0.24rem;
	}
	
	html,
	body {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 100%;
		background: #FFFFFF;
		/* font: 13px/1.5em 'Open Sans', Helvetica, Arial, sans-serif; */
		text-align: center;
	}
	
	.hide {
		display: none;
	}
	
	.show {
		display: block;
	}
	
	.pic_edit {
		position: fixed;
		top: -100rem;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999999;
		background: #e9e9e9;
		opacity: 1
	}
	
	.clipArea {
		margin: 0 auto;
		height: 300px;
		background: #f2f2f2;
	}
	
	.clipBtn,
	.cannel,
	.choose {
		border: none;
		margin-bottom: 0.5rem;
		background-color: #3fa8ff;
		color: #fff;
		border-radius: 5px;
		width: 30%;
		font-size: 0.3rem;
		height: 0.6rem;
		bottom: 0;
		position: absolute;
	}
	
	.choose {
		left: 2.5%;
	}
	
	.clipBtn {
		left: 35%;
	}
	
	.cannel {
		left: 67.5%;
	}
	
	.file {
		border: none;
		margin-bottom: 0.5rem;
		padding: 0px;
		width: 33%;
		position: absolute;
		left: 0;
		bottom: 0;
		height: 0.6rem;
		opacity: 0;
		z-index: 99;
	}
	
	.loading {
		display: none;
		position: absolute;
		top: 0;
		background-color: #E1E1E1;
		width: 6.4rem;
		height: 100%;
		-webkit-opacity: 0.7;
		color: #F0F0F0;
	}
	
	.con {
		width: 4rem;
		height: 1rem;
		background-color: #515352;
		margin-left: 50%;
		margin-top: 50%;
		border-radius: 0.1rem;
		-webkit-transform: translateX(-50%) translateY(100%);
	}
	
	.con_left {
		float: left;
		height: 100%;
		width: 1rem;
		margin-left: 0.2rem;
	}
	
	.con_right {
		text-align: center;
		line-height: 1rem;
		font-size: 0.3rem;
	}
	
	.clipTip {
		width: 100%;
		height: 2rem;
		line-height: 1rem;
		font-size: 0.4rem;
		color: #8f8585;
	}
	
	.title {
		position: relative;
		top: 0;
		z-index: 9;
		width: 6.4rem;
		height: 0.88rem;
		font-size: 0.3rem;
		text-align: center;
		line-height: 0.88rem;
		img {
			position: absolute;
			left: 0.2rem;
			height: 0.4rem;
			margin: 0.24rem 0;
		}
	}
	
	textarea {
		width: 100%;
		margin: 0;
		padding: 0.2rem;
		height: 2.84rem;
		border: none;
		resize: none;
		color: #999999;
		font-size: 0.2rem;
		margin-bottom: 0.1rem;
		-webkit-box-shadow: 0px 0.1rem 0.1rem #E8E8E8;
		box-shadow: 0px 0.1rem 0.1rem #E8E8E8;
	}
</style>