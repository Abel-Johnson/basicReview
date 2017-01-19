//---------------伪造数据---------------
var listData = [
	{
		title: '吃饭',
		id: 1,
		isSelected: false
	},
	{
		title: '睡觉',
		id: 2,
		isSelected: false
	},
	{
		title: '打豆豆',
		id: 3,
		isSelected: false
	}
];
//-----------------------------

new Vue({
	el: '.todoapp',
	data: {
		list: listData,
		inpText: "wasd"
	},
	methods: {
		//new Todo
		confirm: function() {
			if(!this.inpText) return;
			this.list.push({
				title: this.inpText,
				id: Math.random(),
				isSelected: false
			})	
			this.inpText = "";
		},
		
		//delete Todo
		deleteFn: function(id) {
			this.list=this.list.filter((item)=>item.id!==id)
		}
		
		
		
		
		
	}
})
