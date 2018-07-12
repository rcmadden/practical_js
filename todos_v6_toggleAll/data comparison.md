### Lesson 6 
Interlude Data Types & Comparisons

#####Comparisons with objects
          
          Identical Street
              house -> 101 Identical Street
              house -> 102 Identical Street
              house -> 103 Identical Street

          Javascript Objects
              { } -> Memory Address 1
              { } -> Memory Address 2
              { } -> Memory Address 3

Primitive (Values) are equal

    2
    2
    2

#####Objects (references)

{ } === { } // false (2 different objects)
          
HouseA === HouseA // true (same object)

#####Access Objects & Properties on an object examples

```sh
1.  var myHouse = { color: 'blue' };
2.  myHouse.color = 'red';
```
```sh
1. obj myHouse| Memory Address 1 | --> | color:'blue'
2. obj myHouse| Memory Address 1 | --> | color:'red'
```   