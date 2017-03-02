# underscore

> JavaScript是函数式编程语言，支持高阶函数和闭包。函数式编程非常强大，可以写出非常简洁的代码。例如Array的map()和filter()方法：
> 
> 'use strict';
> var a1 = [1, 4, 9, 16];
> var a2 = a1.map(Math.sqrt); // [1, 2, 3, 4]
> var a3 = a2.filter((x) => { return x % 2 === 0; }); // [2, 4]
> 

***jQuery统一了不同浏览器的DOM操作的差异
underscore提供了一套完善的函数式编程的接口***

--
### collections
underscore为**集合类对象(Array/Object)**提供了一致的接口

- map/filter
	`_.map(obj,function(v,k){return...})`=>返回一个新数组
	`_.mapObject(obj,function(v,k){return...})`=>返回一个新对象(return的值会改变原数组的键值,不会改键名)
	
- every/some
> 	当集合的所有元素都满足条件时，`_.every()`函数返回true，当集合的至少一个元素满足条件时，`_.some()`函数返回true：

	- 当集合是对象时,可以同时获得value和key
	
- max/min(collection一个参数)
> 直接返回集合中的最大最小值

	- 集合是对象,只会比较value,忽略掉key;
	- 集合是[],会返回±Infinity

- groupBy
> 把集合中的元素按照***传入函数返回的key***分类整理成一个新对象,返回的key就是新对象的每个key值,对应的value是数组,存放着这类下的原数组元素

	```javascript
	'use strict';

	var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];
	var groups = _.groupBy(scores, function (x) {
	    if (x < 60) {
	        return 'C';
	    } else if (x < 80) {
	        return 'B';
	    } else {
	        return 'A';
	    }
	});
	// 结果:
	// {
	//   A: [81, 91, 88, 99],
	//   B: [75, 77, 66, 72],
	//   C: [20, 40, 59]
	// }
	```
- shuffle/sample
> shuffle()用洗牌算法随机打乱一个集合
> sample()随机选择一个或多个元素



### Arrays

- first/last(arr)  

	> 取出首尾元素

- flatten
> flatten()接收一个Array，无论这个Array里面嵌套了多少个Array，flatten()最后都把它们变成一个一维数组：
		`_.flatten([1, [2], [3, [[4], [5]]]]); // [1, 2, 3, 4, 5]`
		
- zip / unzip
> zip()把两个或多个数组的所有元素按索引对齐，然后按索引合并成新数组。例如，你有一个Array保存了名字，另一个Array保存了分数，现在，要把名字和分数给对上，用zip()轻松实现:

		var names = ['Adam', 'Lisa', 'Bart'];
		var scores = [85, 92, 59];
		_.zip(names, scores);
		// [['Adam', 85], ['Lisa', 92], ['Bart', 59]]
>	unzip()则是反过来：

		'use strict';
		var namesAndScores = [['Adam', 85], ['Lisa', 92], ['Bart', 59]];
		_.unzip(namesAndScores);
		// [['Adam', 'Lisa', 'Bart'], [85, 92, 59]]

- object
> 有时候你会想，与其用zip()，为啥不把名字和分数直接对应成Object呢？别急，object()函数就是干这个的：

		'use strict';
		
		var names = ['Adam', 'Lisa', 'Bart'];
		var scores = [85, 92, 59];
		_.object(names, scores);
		// {Adam: 85, Lisa: 92, Bart: 59}
	注意`_.object()`是一个函数，不是JavaScript的Object对象。

- range
> range()让你快速生成一个序列，不再需要用for循环实现了：

		'use strict';
		
		// 从0开始小于10:
		_.range(10); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		
		// 从1开始小于11：
		_.range(1, 11); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
		
		// 从0开始小于30，步长5:
		_.range(0, 30, 5); // [0, 5, 10, 15, 20, 25]
		
		// 从0开始大于-10，步长-1:
		_.range(0, -10, -1); // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]


### Function
- bind
> 传入一个原始函数和this的指向,返回一个新函数
bind()有什么用？我们先看一个常见的错误用法：

	```javascript
	'use strict';
	
	console.log('Hello, world!');
	// 输出'Hello, world!'
	
	var log = console.log;
	log('Hello, world!');
	// Uncaught TypeError: Illegal invocation
	```
	如果你想用log()取代console.log()，按照上面的做法是不行的，因为直接调用log()传入的this指针是undefined，必须这么用：
	
	```javascript
	'use strict';
	
	var log = console.log;
	// 调用call并传入console对象作为this:
	log.call(console, 'Hello, world!')
	// 输出Hello, world!
	```
	
	这样搞多麻烦！还不如直接用console.log()。但是，bind()可以帮我们把console对象直接绑定在log()的this指针上，以后调用log()就可以直接正常调用了：
	
	```javascript
	'use strict';
	
	var log = _.bind(console.log, console);
	log('Hello, world!');
	// 输出Hello, world!

	```
	
	
- partial
> 创建偏函数的目的是将原函数的某些参数固定住，可以降低新函数调用的难度。

	假设我们要计算xy，这时只需要调用Math.pow(x, y)就可以了。

	假设我们经常计算2y，每次都写Math.pow(2, y)就比较麻烦，如果创建一个新的函数能直接这样写pow2N(y)就好了，这个新函数pow2N(y)就是根据Math.pow(x, y)创建出来的偏函数，它固定住了原函数的第一个参数（始终为2）：

		'use strict';
		
		var pow2N = _.partial(Math.pow, 2);
		pow2N(3); // 8
		pow2N(5); // 32
		pow2N(10); // 1024
	如果我们不想固定第一个参数，想固定第二个参数怎么办？比如，希望创建一个偏函数cube(x)，计算x3，可以用_作占位符，固定住第二个参数：

		'use strict';
		
		var cube = _.partial(Math.pow, _, 3);
		cube(3); // 27
		cube(5); // 125
		cube(10); // 1000
		
		
- memoize
> 将函数运行的结果缓存下来,下次进行一模一样的调用时就不会走函数体了,而是会把缓存下来的结果直接拿来用,针对耗时长的函数(比如阶乘)的性能优化手段

	```javascript
	可以对factorial()进行改进，让其递归调用：
	
	'use strict';
	
	var factorial = _.memoize(function(n) {
	    console.log('start calculate ' + n + '!...');
	    if (n < 2) {
	        return 1;
	    }
	    return n * factorial(n - 1);
	});
	
	factorial(10); // 3628800
	// 输出结果说明factorial(1)~factorial(10)都已经缓存了:
	// start calculate 10!...
	// start calculate 9!...
	// start calculate 8!...
	// start calculate 7!...
	// start calculate 6!...
	// start calculate 5!...
	// start calculate 4!...
	// start calculate 3!...
	// start calculate 2!...
	// start calculate 1!...
	
	factorial(9); // 362880
	// console无输出
	```
- once
> 顾名思义，once()保证某个函数执行且仅执行一次。如果你有一个方法叫register()，用户在页面上点两个按钮的任何一个都可以执行的话，就可以用once()保证函数仅调用一次，无论用户点击多少次：

	```javascript
	'use strict';
	
	var register = _.once(function () {
	    alert('Register ok!');
	});
	
	// 测试效果:
	register();
	register();
	register();
```

- delay
> delay()可以让一个函数延迟执行，效果和setTimeout()是一样的，但是代码明显简单了：
	
	```javascript
	'use strict';
	
	// 2秒后调用alert():
	_.delay(alert, 2000);
	如果要延迟调用的函数有参数，把参数也传进去：
	
	'use strict';
	
	var log = _.bind(console.log, console);
	_.delay(log, 2000, 'Hello,', 'world!');
	// 2秒后打印'Hello, world!':
	```
	
### Objects
提供了大量针对object的函数

- keys/values(obj)/allKeys(obj)----前者只能取出自身的属性/值,后者会沿原型链去找,最后返回一个**数组**
- mapObject  
	`_.mapObject(obj,function(v,k){return...})`=>返回一个新对象(return的值会改变原数组的键值,不会改键名)
- invert  
invert()把object的每个key-value来个交换，key变成value，value变成key：

- extend / extendOwn

	extend()把多个object的key-value合并到第一个object并返回：

		'use strict';

		var a = {name: 'Bob', age: 20};
		_.extend(a, {age: 15}, {age: 88, city: 'Beijing'}); // {name: 'Bob', age: 88, city: 'Beijing'}
		// 变量a的内容也改变了：
		a; // {name: 'Bob', age: 88, city: 'Beijing'}
	注意：如果有相同的key，后面的object的value将覆盖前面的object的value。

	(***extendOwn()和extend()类似，但获取属性时忽略从原型链继承下来的属性。***)

- clone(是浅复制)
> 如果我们要复制一个object对象，就可以用clone()方法，它会把原有对象的所有属性都复制到新的对象中：

- isEqual
> isEqual()对两个object进行深度比较，如果内容完全相同，则返回true：两个对象直接用===比较永远是false是因为他们指向内存的不同空间,但两个对象只要长得一样,isEqual(a,b)就是true

### Chaining(链式调用)
- chain

	如果我们有一组操作，用underscore提供的函数，写出来像这样：
	
	`_.filter(_.map([1, 4, 9, 16, 25], Math.sqrt), x => x % 2 === 1);`
	`// [1, 3, 5]`
	能不能写成链式调用？能！
	
	underscore提供了把对象包装成能进行链式调用的方法，就是chain()函数：
	
	`_.chain([1, 4, 9, 16, 25])
	 .map(Math.sqrt)
	 .filter(x => x % 2 === 1)
	 .value();
	// [1, 3, 5]`
	因为每一步返回的都是包装对象，所以最后一步的结果需要调用value()获得最终结果。