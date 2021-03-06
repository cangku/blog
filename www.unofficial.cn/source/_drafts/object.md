---
title: Object 对象学习 
date: 2016-11-24 20:53:10
categories:
- 学习
tags:
- Object
---

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

<!-- more -->
### Object.defineProperty
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个已经存在的属性， 并返回这个对象。

#### 概念解释
语法：
> Object.defineProperty(obj, prop, descriptor)

obj：需要定义属性的对象，最后 `Object.defineProperty` 的返回值就是该对象
prop：需要为obj定义的属性名
descriptor：属性的描述符对象，其中包含几个参数

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。描述符必须是两种形式之一；不能同时是两者。

+ 数据描述符与存取描述符都可以拥有的可选属性
	- configurable：配置。只有当该属性的值为 true 的时候，该属性的值才能被修改，或者被删除（默认false）
	- enumerable：枚举。只有当该属性的值为 true 的时候，该属性的值才能被遍历（默认为false）

+ 只有数据描述符才能同时拥有的可选属性  
	- value：属性值，可以是 javascript 任意类型的值（默认undefined）
	- writable：可写。只有当该属性的值为 true 的时候，该属性才能通过赋值运算符赋值（默认false）

+ 只有存取描述符才能同时拥有的可选属性  
	- get：一个给属性提供 getter 的方法，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined。
	- set：一个给属性提供 setter 的方法，如果没有 setter 则为 undefined。方法将接受唯一参数，并将该参数的新值分配给该属性。。默认为 undefined。

#### 代码解释
- configurable, enumerable, value, writable的默认值分别为false, false, undefined, false。获取descriptor描述符对象的值可以使用[Object.getOwnPropertyDescriptor(object, prop)](#Object-getOwnPropertyDescriptor)方法。
```
var obj = {},
	descriptor = {};
var someObj = Object.defineProperty(obj, 'a', descriptor);
console.log(Object.getOwnPropertyDescriptor(someObj, 'a'));
// 得到的结论是以下这个Object
// Object {value: undefined, writable: false, enumerable: false, configurable: false}
```

- configurable
```
/*
 * 情形一
 * configurable: false
 */
var obj = {},
	descriptor = {
		value: 1
	};
Object.defineProperty(obj, 'a', descriptor);
console.log(obj); // Object {a: 1}
// modify（修改）
Object.defineProperty(obj, 'a', {value: 2}); // Uncaught TypeError:Cannot redefine property: a
obj.a = 2;
// delete
delete obj.a; // 返回false；严格模式（'use strict';）下抛出错误  

// 情形二 configurable 为true
var obj = {},
	descriptor = {
		value: 1,
		configurable: true
	};
Object.defineProperty(obj, 'a', descriptor);
console.log(obj); // Object {a: 1}
Object.defineProperty(obj, 'a', {value: 2});
console.log(obj); // Object {a: 2}
delete obj.a; // true
```

- enumerable
```
/*
 * 情形一
 * enumerable: false
 */
var obj = {},
	descriptor = {
		value: 1
	};
Object.defineProperty(obj, 'a', descriptor);

for(var i in obj) {
	console.log(i);
}
// 不会获得任何输出  

/*
 * 情形二
 * configurable: true
 */
var obj = {},
	descriptor = {
		value: 1,
		enumerable: true
	};
Object.defineProperty(obj, 'a', descriptor);

for(var i in obj) {
	console.log(i);
}
// a
```

- writable
```
/**
 * 情形一
 * writable: false
 */
var obj = {},
	descriptor = {
		value: 1
	};
Object.defineProperty(obj, 'a', descriptor);
obj.a = 2;
console.log(obj); // Object {a: 1}

/**
 * 情形二
 * writable: true
 */
var obj = {},
	descriptor = {
		value: 1,
		writable: true
	};
Object.defineProperty(obj, 'a', descriptor);
Object.defineProperty(obj, 'a', {value: 2});
console.log(obj); // Object {a: 2}
obj.a = 3;
console.log(obj); // Object {a: 3}
```

- configurable vs writable
```
/**
 * configurable 为true的时候可以修改并且删除值
 * writable 为true的时候可以修改但是不能删除值
 */

var obj = {},
	descriptor = {
		value: 1,
		configurable: true
	};
Object.defineProperty(obj, 'a', descriptor); // Object {a: 1}
Object.defineProperty(obj, 'a', {value: 2}); // Object {a: 2}
Object.getOwnPropertyDescriptor(obj, 'a');  // Object {value: 2, writable: false, enumerable: false, configurable: true}
delete obj.a; // true
console.log(obj); // Object {}

var obj = {},
	descriptor = {
		value: 1,
		writable: true
	};
Object.defineProperty(obj, 'a', descriptor); // Object {a: 1}
Object.defineProperty(obj, 'a', {value: 2}); // Object {a: 2}
Object.getOwnPropertyDescriptor(obj, 'a');  // Object {value: 2, writable: true, enumerable: false, configurable: false}
delete obj.a; // false
console.log(obj); // Object {a: 1}
```

- get and set
```
/**
 * 存储描述符，get:对象的属性被访问的时候，就会默认调用get方法，如果没有设置值，默认值为undefined，set:对象的属性被赋值的时候，就会默认调用set方法，如果没有设置值，默认值也为undefined
 */
var value,
	obj = {},
	descriptor = {
		get: function() {
			return value;
		},
		set: function(val) {
			value = val;
		}
	};
Object.defineProperty(obj, 'a', descriptor);
console.log(obj); // Object {a: undefined, get a: function, set a: function}
obj.a = 1; // obj对象的属性a就行赋值操作，调用set方法，对value进行赋值。
console.log(obj); // Object {a: 1, get a: function, set a: function}
```

### Object.defineProperties
Object.defineProperties 的作用和Object.defineProperty 的作用一样定义给对象上添加或者更改多个自有属性，并返回当前对象。

#### 概念解释
> Object.defineProperties(obj, properties)

properties 是由对个属性与属性描述符的键值对构成

#### 代码解释
```
var o = {};
var value = 123;
Object.defineProperties(o, {
	a: {
		value: 1,
		writable: true
	},
	b: {
		get: function() {
			return value;
		},
		set: function(val) {
			value = val;
		}
	}
})
```

### Object.getOwnPropertyDescriptor
Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）

#### 概念解释
> Object.getOwnPropertyDescriptor(obj, prop)

obj: 指定对象  
prop: 指定对象的自由属性名  

如果指定的属性存在于对象上，则返回其属性描述符（property descriptor），否则返回 undefined。  

#### 代码解释
```
var o = {};
console.log(Object.getOwnPropertyDescriptor(o, 'a'));
// undefined

o = {get a() {return 123;}}
console.log(Object.getOwnPropertyDescriptor(o, 'a'));
// Object {configurable: true, enumerable: true, get: function, set: undefined}

o.a = 123456;
console.log(o.a);
// 123
// 因为 set 方法未定义，所以值获取的时候，get 方法的返回值始终是 123

o.b = 123;
console.log(o.getOwnPropertyDescriptor(o, b));
// Object {value: 123, writable: true, enumerable: true, configurable: true}

var value = 123;
Object.defineProperty(o, 'c', {
	configurable: true,
	enumerable: true,
	get: function() {
		return value;
	},
	set: function(val) {
		value = val;
	}
})
console.log(Object.getOwnPropertyDescriptor(o, 'c'));
// Object {configurable: true, enumerable: true, get: function, set: function}
```

### Object.getOwnPropertyDescriptors
同 Object.getOwnPropertyDescriptor ，只是这个是直接获取对象的所有描述符。

> Object.getOwnPropertyDescriptors(obj)

#### 代码解释
```
var o = {a: 1, b: 2};
Object.getOwnPropertyDescriptors(o);
// Object {
	a: Object 数据描述符
	b: Object 数据描述符
}
```

### Object.create

### Object.assign
Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。

#### 概念解释
> Object.assign(target, ...sources)

+ target: 目标对象，存入多个源对象中的可枚举对象
+ sources：多个对象

#### 代码解释
```
var obj = {};
var objA = {
	a: 1,
	c: 3,
	d: 'd',
	e: 'a'
};
Object.defineProperty(objA, 'b', {
	configurable: true,
	enumerable: false,
	value: 1
});
var objB = {
	d: 4
};
Object.assign(obj, objA, objB);
```
可以复制源对象的可枚举数据到新的目标对象中，但是不能用于深复制，因为

```
var obj = {};
var objA = {
	a: 1,
	c: 3,
	d: 'd',
	e: 'a'
};
Object.defineProperty(objA, 'b', {
	configurable: true,
	enumerable: false,
	value: 1
});
var objB = {
	d: 4,
	e: {
		f: 123
	}
};
Object.assign(obj, objA, objB);

// 如果我修改了源对象objB.e.f的值，obj中的值也会变化
// 对象中可枚举属性是一个对象，对象中的属性只是拷贝source的引用

objB.e.f = 123456;
console.log(obj); // obj.e.f === 6
```

原始类型会被包装为Object
```
var a = 'abc';
var b = 1;
var c = false;
var d = Symbol("foo");
var obj = Object.assign({}, a, b, c, d, null, undefined);
console.log(obj); // Object {0: "a", 1: "b", 2: "c"} 只有字符串是可枚举的，会直接忽略null和undefined
```

出错会中断拷贝
```
var a = 'abc';
var b = {};
Object.defineProperty(b, 'a', {
	value: 123,
	writable: false
})
var c = {
	a: 456
}
var d = {
	b: 123
}
var obj = Object.assign(b, d, c, a);
console.log(obj); // undefined 由于b的a不可写，拷贝c的时候报错中断了拷贝，但是目标对象b中还是多了属性b。 Object { a: 123, b: 123 }
```

### Object.freeze
Object.freeze()是冻结一个对象，冻结后的不能不能被添加、修改、删除对象的属性，也不能修改对象属性描述符的属性内容（可配置性、可枚举性、可写性），该方法返回值的对象就是这个固定不变的对象。  

数据属性的值不可更改，访问器属性（有getter和setter）也同样（但由于是函数调用，给人的错觉是还是可以修改这个属性）。如果一个属性的值是个对象，则这个对象中的属性是可以修改的，除非它也是个冻结对象。  

#### 语法
> Object.freeze(obj)

#### 代码解释
```
var obj = {
	a: 1,
	b: 2,
	c: {
		a: 1,
		b: 2
	}
}
var newObj = Object.freeze(obj);
newObj.b = 3; // 非严格模式下静默失败，严格模式下报错 Uncaught TypeError: Cannot assign to read only property 'b' of object '#<Object>'
console.log(newObj);

// 需要注意的是newObj只是对源对象的引用，例如修改obj队形中对象c的属性a的值
obj.c.a = 1234;
console.log(newObj);


// 存值属性描述符的例子
var obj = {};
Object.defineProperties(obj, {
	a: {
		get: function() {
			return 1;
		},
		configurable: true,
		enumerable: true
	}
})
Object.freeze(obj);
obj.a = 123;
console.log(obj);
```

### prototype 和 property
英语不是很好的我总是容易弄不清楚这两个单词的意思，总是写错，特意拿出来区分一下
protorype：原型
property：属性

其它：  
assign: 分配
freeze: 冻结
