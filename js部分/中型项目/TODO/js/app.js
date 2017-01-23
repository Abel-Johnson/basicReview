//-----------------------------
//localStorage
let storage = {
	save(key,value) {
		localStorage.setItem(key,JSON.stringify(value))
	},
	fetch(key) {
		return JSON.parse(localStorage.getItem(key)) || []
	}
}

let listData = storage.fetch('localData')
////---------------伪造数据---------------
//listData = [
//	{
//		title: '吃饭',
//		id: 1,
//		isSelected: false
//	},
//	{
//		title: '睡觉',
//		id: 2,
//		isSelected: false
//	},
//	{
//		title: '打豆豆',
//		id: 3,
//		isSelected: false
//	}
//];

//-----------------------------

let vm = new Vue({
	el: '.todoapp',
	data: {
		list: listData,
		inpText: "",
		editingIndex: '',
		editingPlain: "",
		hash: ""
	},
	watch: {
		list: {
			handler: function() {
				storage.save('localData',this.list)
			},
			deep: true
		}
	},
	computed: {
		selectAll: {
			get: function() {
				return this.list.every((item)=>item.isSelected);
			},
			set: function(newValue) {
				this.list.forEach(item=>{
					item.isSelected = newValue;
				})
			}
		},
		unSeletedLen: function() {
			return this.list.filter(item=>!item.isSelected).length
		},
		seletedLen: function() {
			return this.list.length - this.unSeletedLen;
		},
		filterLis: function() {
			var listShow = [];
			switch (this.hash){
				case "active":
					listShow= this.list.filter(item=>!item.isSelected)
					break;
				case 'completed':
					listShow= this.list.filter(item=>item.isSelected)
					break;
				default:
					listShow = this.list
			}
			return listShow
		}
	},
	methods:{
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
			this.list = this.list.filter((item) => item.id!==id)
		},
		editTodo: function(value,index) {
			this.editingPlain = value.title;
			this.editingIndex = index;
			/*
			//这里想获取到渲染后的DOM结构的编辑框,
			 步骤如下: 
			 1. 给要获取的元素加一个自定义属性ref  :ref="xxx";
			 2. 然后要获取到修改数据同步渲染完结构后的那一刻触发事件的事件处理函数this.$nextTick(function(){//这里写这一刻要做的事})
			 3. 然后在函数体里,获取到vue对象上的一个自带属性vm(或者this也可以).$refs,对应的值是一个对象,里边放着所有有ref属性的html元素的DOM对象,然后通过ref对应的属性值['ref属性值xxx'],找到这些特定元素的小集合,然后通过[0(下标)]就可以取出来进行操作
			 * */
			this.$nextTick(function() {
				vm.$refs["editOf"+index][0].focus();
			})
			
		},
		editDone: function(item) {
			if(!item.title.trim()) {
				this.deleteFn(item.id);
			}
			
			this.editingIndex = ''
		},
		editEsc: function(item) {
			item.title = this.editingPlain;
//			console.log(item,this.editingPlain);
			this.editingIndex = ''
		},
		removeTodos: function() {
			this.list = this.list.filter(item=>!item.isSelected)
		}
	}
})

window.onhashchange = function() {
	vm.hash = window.location.hash.slice(2);
	console.log(vm.hash);
}
window.onhashchange();
