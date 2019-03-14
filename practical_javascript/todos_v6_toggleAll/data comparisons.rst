**Lesson 6**
*Interlude Data Types & Comparisons*
    Comparisons with objects
          Identical Street                                             Javascript Objects
              house -> 101 Identical Street                         { } -> Memory Address 1
              house -> 102 Identical Street                        { } -> Memory Address 2
              house -> 103 Identical Street          `            { } -> Memory Address 3

Primitive (Values) are equal
    2
    2
    2

Objects (references)
          { } === { } // false (2 different objects)
          HouseA === HouseA // true (same object)

Access Objects & Properties on an object examples::
.. highlight:: javascript

    1. var myHouse = { color: 'blue' };
    2. myHouse.color = 'red';
    +==============+==================+=====+==============+
    |1. obj myHouse| Memory Address 1 | --> | color:'blue' |
    +==============+==================+=====+==============+
    |2. obj myHouse| Memory Address 1 | --> | color:'red'  |
    +==============+==================+=====+==============+

